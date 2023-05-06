import fs from 'fs';

const filePath = "./db/db.json";
const filePath2 = "./db/restore_db.json"

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

const restore = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath2, (err, data) => {
            console.log("restore database");
            if (err){
                console.error(err);
                reject(err);
            } else {
                fs.writeFile(filePath, data, 'utf-8', (err) => {
                    if (err){
                        console.error(err);
                    } else {
                        console.log("Restored Database");
                        try{
                            resolve(JSON.parse(data));
                        } catch(err) {
                            reject(err);
                        }
                    }
                });
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
                    console.log(data);
                } catch (err) {
                    restore().then((data) => {
                        resolve(data);
                    }).catch((err) => {
                        reject(err)
                    });
                }
            }
        });
    });
}

export default {getData, saveData};