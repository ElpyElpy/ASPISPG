
const axios = require("axios");
const fs = require('fs');
const xml2js = require('xml2js');
const util = require('util');
// const reqw = require('../../../client/public/assets/tokens')

const loadTokens = async () => {

    const API_KEY = "2babd6b1436220809785b6bbb1c11f62ba8c398b26e088f464f8bcf79e926330";
    const baseUrl = "https://min-api.cryptocompare.com/data/all/coinlist";

    try {
        const response = await axios.get(`${baseUrl}`, {
            headers: {
                "Authorization": `Apikey ${API_KEY}`
            }
        });

        const jsonData = JSON.stringify(response.data);

        fs.writeFile("object.json", jsonData, "utf8", (err) => {
            if (err) {
                console.log("An error occured while saving the file");
                return;
            }
            console.log("The file has been saved!");
        });

    } catch (err) {
        throw new Error(err);
    }
}


const formatJson = async () => {
    // load data
    const data = JSON.parse(fs.readFileSync("object.json", 'utf-8'));
    const newData = data.Data;

    // left only tradable assets
    const filteredObj = Object.entries(newData)
        .filter(([key, value]) => value.IsTrading)
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

    // save only required attrubutes
    const keysToSave = ['Id', 'Symbol', 'CoinName']
    var newObject = {};
    Object.keys(filteredObj).forEach(key => {
        newObject[key] = {};
        keysToSave.forEach(k => {
            if (filteredObj[key][k]) {
                newObject[key][k] = filteredObj[key][k];
            }
        });
    });

    return newObject;
}


const parseString = util.promisify(xml2js.parseString);
const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);

const addIcons = async (newObject) => {
    // add icons to tokens
    const folderPath = '../../../client/public/assets/tokens';

    // read all files in the folder
    try {
        const files = await readdir(folderPath);
        for (let file of files) {
            const fileName = file.split('.')[0]; // get the name without the '.svg' extension
            const strForMatch = fileName.toUpperCase();

            // check if the file name matches a key in the object
            if (newObject[strForMatch]) {
                // read the file contents
                const data = await readFile(`${folderPath}/${file}`, 'utf8');

                // parse the SVG file to extract the "path d" attribute
                const result = await parseString(data);

                // add the "path d" attribute as a key-value pair to the object
                if (result.svg.path[0].$.d) {
                    newObject[strForMatch].svg_path = result.svg.path[0].$.d;
                } else {
                    newObject[strForMatch].svg_path = result.svg.g[0].path[0].$.d;
                }
            } else {
                delete newObject[strForMatch];
            }
        }
        return newObject;
    } catch (err) {
        console.error(err);
    }
};



async function execute() {
    const result = await formatJson();
    const finalResult = await addIcons(result);

    const filteredObj = Object.entries(finalResult)
        .filter(([key, value]) => value.svg_path)
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

    var size = Object.keys(filteredObj).length;
    console.log(size);

    const jsonData = JSON.stringify(filteredObj);

    fs.writeFile("tokensWithIcons.json", jsonData, "utf8", (err) => {
        if (err) {
            console.log("An error occured while saving the file");
            return;
        }
        console.log("The file has been saved!");
    });




}

execute();