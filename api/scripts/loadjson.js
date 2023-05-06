import fs from 'fs';

const filePath = "./db/db.json";

const saveData = (dataJson) => {
    return new Promise((resolve, reject) => {
        let dataText = "";
        try {
            dataText = JSON.stringify(dataJson, null, 4);
        } catch (err) {
            console.error(err);
            reject(err);
            return;
        }
        fs.writeFile(filePath, dataText, 'utf-8', (err) => {
            if (err){
                console.error(err);
            } else {
                resolve(true);
            }
        });
    });
}

const getData = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err){
                console.error(err);
                reject(err);
            } else {
                try {
                    let jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (err) {
                    console.log(data);
                    console.error(err);
                    reject(err);
                }
            }
        });
    });
}

export default {getData, saveData};