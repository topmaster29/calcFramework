/**
 * @file dataBroker.js
 * @module dataBroker
 * @description Contins al of the lower level data processing functions,
 * and also acts as an interface for calling fileOperations.
 * @requires module:fileOperations
 * @requires module:configurator
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Zarko
 * @date 2024/01/26
 * @copyright Copyright © 2024 by Zarko. All rights reserved
 */

let fileOperations = require('../executrix/fileOperations');
let configurator = require('../executrix/configurator');
let path = require("path");
let baseFileName = path.basename(module.filename,path.extname(module.filename));
let namespacePrefix = `brokers.${baseFileName}.`;

/**
 * @function scanDataPath
 * @description Scans the specified path and returns a collection of all the files contained recursively within
 * that path and all sub-folders.
 * @param {string} dataPath The path that shold be recursiviely scanned for files in all the folders.
 * @return {array<string>} An array of strings that each have the full path and file name at all levels of the specified path including sub-folders
 * @author Zarko
 * @date 2024/01/26
 */
function scanDataPath(dataPath) {
    let functionName = scanDataPath.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`dataPath is : ${dataPath}`);

    let filesFound = fileOperations.readDirectoryContents(dataPath);

    console.log(`filesFound is: ${JSON.stringify(filesFound)}`);
    console.log(`END ${namespacePrefix}${functionName} function`);
    return filesFound;
};

/**
 * @function loadAllJsonData
 * @description Loads all teh contents of all files and folders and sub-folders at the specfied path and builds
 * then loads them accordingly in the D.contextName.
 * @param {array<string>} filestoLoad The data structure containing all of teh fiels to load data from.
 * @param {string} contextName The context name that should be used when adding data to the D-data structure.
 * @return {object} A JSON object that contains all of teh data that was loaded and parsed from all the input files list.
 * @author Zarko
 * @date 2024/01/26
 */
function loadAllJsonData(filesToLoad, contextName) {
    let functionName = loadAllJsonData.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`filesToLoad is : ${JSON.stringify(dataPath)}`);
    console.log(`contextName is : ${contextName}`);

    let foundSystemData = false;
    let systemConfigFileName = 'framework.system.json';
    let applicationConfigFileName = 'application.system.json';
    let multiMergedData = {};
    let parsedDataFile = {};

    for (let i = 0; i < filesToLoad.length; i++) {
        let fileToLoad = filesToLoad[i];
        if (fileToLoad.includes(systemConfigFileName) || fileToLoad.includes(applicationConfigFileName)) {
            let dataFile = preprocessJsonFile(fileToLoad);


            multiMergedData['system'] = {};
            multiMergedData['system'] = dataFile;
            foundSystemData = true;
        }
        if (foundSystemData === true) {
            break;
        }
    }
    
    if (multiMergedData['system']['system.enableDebugConfigurationSettings']) {
        if (multiMergedData['system']['system.enableDebugConfigurationSettings'] === true ||
        multiMergedData['system']['system.enableDebugConfigurationSettings'].toUpperCase() === 'TRUE') {
            for (let j = 0; j < filesToLoad.length; j++) {
                let fileToLoad = filesToLoad[j];
                if (!fileToLoad.includes(systemConfigFileName) && !fileToLoad.includes(applicationConfigFileName) && 
                fileToLoad.toUpperCase().includes('.JSON')) {
                    let dataFiel = preprocessJsonFile(fileToLoad);

                    if (!multiMergedData['DebugSettings']) {
                        multiMergedData['DebugSettings'] = {};
                        multiMergedData['DebugSettings'] = dataFile;
                    } else {
                        Object.assign(multiMergedData['DebugSettings'], dataFile);
                    }
                }
            }
        }
    }
    parsedDataFile = multiMergedData;
    console.log(`parsedDataFile is: ${JSON.stringify(parsedDataFile)}`);
    console.log(`END ${namespacePrefix}${functionName} function`);
    return parsedDataFile;
};

/**
 * @function preprocessJsonFile
 * @description Load all of the data from a single JSON data file.
 * @param {string} fileToLoad  The fully qualified path to the ile that should be loaded.
 * @return {object} the JSON data object that was loaded from the specfied JSON data fiel.
 * @author Zarko
 * @date 2024/01/26
 */
function preprocessJsonFile(fileToLoad) {
    let functionName = loadAllJsonData.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`filesToLoad is : ${JSON.stringify(dataPath)}`);

    let dataFile = fileOperations.getJsonData(fileToLoad);

    console.log(`dataFile is: ${JSON.stringify(dataFile)}`);
    console.log(`END ${namespacePrefix}${functionName} function`);
    return dataFile;
};

module.exports = {
    ['scanDataPath']: (dataPath) => scanDataPath(dataPath),
    ['loadAllJsonData']: (filesToLoad, contextName) => loadAllJsonData(filestoLoad, contextName)
};