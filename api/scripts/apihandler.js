import loadjson from './loadjson.js';

// get drug
const getDrug = (rawData, device) =>{
    let sendObj = {};
    if (rawData.devices[device] !== undefined){
        sendObj = rawData.devices[device];
    }
    return sendObj;
}


const getData = async (req, res) => {
    let rawData = await loadjson.getData();
    let action = req.params.action;
    let sendObj = {};

    if (action === "drug"){
        sendObj = getDrug(rawData, req.query.device);
    }
    res.send(sendObj);
}

const postData = async (req, res) => {

}

export default {getData, postData}
