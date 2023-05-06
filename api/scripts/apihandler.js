import loadjson from './loadjson.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// state SCLD
let pillState = [];

/*
[
    {
        "06:00" : false
    }
]
*/

// get drug
const getDrug = (rawData, device) => {
    let sendObj = {};
    try{
        if (rawData.devices[device] !== undefined){
            sendObj.success = true;
            sendObj.deviceName = device;
            sendObj.deviceData = rawData.devices[device];
        } else {
            sendObj.success = true;
            sendObj.message = "No Device Present";
            sendObj.deviceName = "defaultDevice";
            sendObj.deviceData = rawData.devices.defaultDevice;
        }
    } catch (err) {
        console.error(err);
    }
    return sendObj;
}

// arduino api
const getArduino = (rawData, query) => {
    return new Promise((resolve, reject) => {
        let sendObj = {};
        if (query.ask === undefined){
            resolve({success: false});
        }

        // get motor //!


        if (query.ask.indexOf("t") !== -1){
            // time
            let date = new Date();
            date.setHours(date.getHours()+16);
            let time = date.toTimeString().split(' ')[0].substring(0, 5);
            sendObj.time = time;
        }
        if (query.ask.indexOf("g") !== -1){
            // give
            let pillData = rawData.devices["arduino8266"];
            
            // initialize
            if (pillState.length === 0){
                for (let i = 0; i < pillData.length; i++){
                    pillState.push({});
                }
            }
            for (let i = 0; i < pillData.length; i++){
                if (pillData[i].giveDrug.length !== 0){
                    for (let giveTime of pillData[i].giveDrug){
                        if (pillState[i][giveTime.time] === undefined){
                            pillState[i][giveTime.time] = true; // prevent default restart
                        }
                    }
                }
            }
            
            // detect state
            console.log(pillData.map(el => el.num));
            console.log(pillState);
            
            // change state
            sendObj.give = "";
            let lastBit = "0"; // this time no pill
            let lastBitWarning = "0"; // next time no pill
            let timeNow = (new Date()).getHours()*60 + (new Date()).getMinutes();
            for (let i = 0; i < pillState.length; i++){
                let keys = Object.keys(pillState[i]);
                let pillNumber = 0;
                for (let key of keys){
                    let time = parseInt(key.substring(0, 2))*60 + parseInt(key.substring(3, 5));
                    if (timeNow < time){ // reset to false
                        pillState[i][key] = false;
                    } else {
                        if (pillState[i][key] === false){ // have not given drug
                            // set to true
                            pillState[i][key] = true;
                            // tell machine to give drug
                            for (let el of pillData[i].giveDrug){
                                let currNum = parseInt(pillData[i].num);
                                let dose = parseInt(el.dose);
                                if (el.time === key){
                                    if (currNum >= dose){
                                        // has pills left
                                        pillData[i].num = currNum - dose + "";
                                        pillNumber += dose;
                                        if (currNum < dose*2){
                                            lastBitWarning = "2";
                                        }
                                    } else {
                                        // no pills left
                                        pillData[i].num = "0";
                                        lastBit = "1";
                                        pillNumber += currNum;
                                    }
                                } else {
                                    if (currNum < dose){
                                        lastBitWarning = "2";
                                    }
                                }
                                
                            }
                        }
                    }
                }
                sendObj.give += "" + pillNumber;
            }
            sendObj.give += (lastBit === "0")?lastBitWarning:lastBit;

            // write back to db
            rawData.devices["arduino8266"] = pillData;
            loadjson.saveData(rawData).catch(err => console.error(err));
        }
        if (query.ask.indexOf("n") !== -1){
            // number
            let number = "";
            for (let device of rawData.devices["arduino8266"]){
                number += (device.num.length === 1)?("0"+device.num):device.num;
            }
            sendObj.number = number;
        }
        if (query.ask.indexOf("w") !== -1){
            // weather
            fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-061?Authorization=CWB-5FDE2B68-32AF-4591-8BBD-B050A9FE4FFF")
            .then(data => data.json())
            .then((data) => {
                data = data.records.locations[0].location[6];
                let temp = data.weatherElement[3].time[0].elementValue[0].value;
                let percentage = data.weatherElement[0].time[0].elementValue[0].value;
                percentage = percentage
                sendObj.weather = temp + "," + percentage;
                resolve(sendObj);
            }).catch((err) => {
                console.error(err);
                sendObj.success = false;
                resolve(sendObj);
            });
        } else {
            resolve(sendObj);
        }
    });
    
}

// login
const handleLogin = (rawData, username, password) => {
    let sendObj = {};
    try {
        if (rawData.accounts[username] !== undefined){
            if (rawData.accounts[username].password === password){
                let device = rawData.accounts[username].connectedDevice;
                sendObj = getDrug(rawData, device);
            } else {
                sendObj.success = false;
                sendObj.message = "Incorrect Password";
            }
        } else {
            sendObj.success = false;
            sendObj.message = "No Account Present";
        }
    } catch (err) {
        console.error(err);
        sendObj.success = false;
        sendObj.message = "Error";
    }
    return sendObj;
}

// modify
const modifyDrug = async (rawData, deviceName, deviceData) => {
    let sendObj = {};
    rawData.devices[deviceName] = deviceData;
    try{
        //devicconsole.log(JSON.stringify(rawData, null, 4));
        await loadjson.saveData(rawData);
        sendObj = {success: true};
    } catch (err) {
        console.error(err);
        sendObj = {success: false};
    }
    return sendObj;
}

const saveImage = async (image, id) => {
    let suffix = image.name.substring(image.name.length-5, image.name.length);
    suffix = suffix.substring(suffix.indexOf("."), suffix.length);
    await image.mv(path.join(__dirname, '../image/pill' + id + suffix));
    return {success:true, image: "/image/pill" + id + suffix};
}

const getData = async (req, res) => {
    let rawData = await loadjson.getData();
    let action = req.params.action;
    let sendObj = {};

    if (action === "drug"){
        sendObj = getDrug(rawData, req.query.device); //!
    } else if (action === "arduino"){
        sendObj = await getArduino(rawData, req.query);
    } else {

    }
    res.send(sendObj);
}

const postData = async (req, res) => {
    let rawData = await loadjson.getData();
    let action = req.params.action;
    let sendObj = {};

    if (action === "login"){
        sendObj = handleLogin(rawData, req.body.username, req.body.password); //!
    } else if (action === "modify"){
        sendObj = await modifyDrug(rawData, req.body.deviceName, req.body.deviceData);
    } else if (action === "image"){
        // console.log(req.files);
        sendObj = await saveImage(req.files.image, req.query.id);
    } else {

    }
    res.send(sendObj);
}

const getImage = async (req, res) => {
    fs.readFile('./' + req.path, (err, data) => {
        if (err){
            res.sendFile(path.join(__dirname, '../image/default.jpg'));
        } else {
            //res.sendFile(import.meta.url.substring(0, import.meta.url.indexOf("/scripts")) + req.path);
            res.sendFile(path.join(__dirname, '../' , req.path));
        }
    });
}

export default {getData, postData, getImage};
