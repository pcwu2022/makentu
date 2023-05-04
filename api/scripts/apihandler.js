import loadjson from './loadjson.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

        if (query.ask.indexOf("t") !== -1){
            // time
            let time = (new Date()).toTimeString().split(' ')[0].substring(0, 5);
            sendObj.time = time;
        }
        if (query.ask.indexOf("g") !== -1){
            // get
        }
        if (query.ask.indexOf("n") !== -1){
            // number
        }
        if (query.ask.indexOf("w") !== -1){
            // weather
            fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-061?Authorization=CWB-5FDE2B68-32AF-4591-8BBD-B050A9FE4FFF")
            .then(data => data.json())
            .then((data) => {
                data = data.records.locations[0].location[6]
                sendObj.weather = data;
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
    fs.readFile('../api/' + req.path, (err, data) => {
        if (err){
            res.sendFile(path.join(__dirname, '../image/default.jpg'));
        } else {
            //res.sendFile(import.meta.url.substring(0, import.meta.url.indexOf("/scripts")) + req.path);
            res.sendFile(path.join(__dirname, '../' , req.path));
        }
    });
}

export default {getData, postData, getImage};
