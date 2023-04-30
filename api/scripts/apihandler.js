import loadjson from './loadjson.js';

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


const getData = async (req, res) => {
    let rawData = await loadjson.getData();
    let action = req.params.action;
    let sendObj = {};

    if (action === "drug"){
        sendObj = getDrug(rawData, req.query.device); //!
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
    } else {

    }
    res.send(sendObj);
}

export default {getData, postData};
