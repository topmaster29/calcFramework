/**
 * @file fileOperations.js
 * @module fileOperationfa-spin
 * @description Contains all of the functions required to do file operations
 * on a physica/virtual hard drive and/or mounted volume.
 * Including loading fies, saving files, reloading files, resaving files,...
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/fs|fs}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Zarko
 * @date 2024/01/26
 * @copyright Copyright © 2024 by Zarko. All rights reserved
 */
let D = require('../structures/data');
let fs = require('fs');
let path = require('path');
let filesCollection = [];
const directoriesToSkip = ['browser_components', 'node_modules', 'www', 'platforms', 'Release', 'Documentation', 'Recycle', 'Trash'];
let filesListLimit = -1;
let hitFileLimit = false;
let baseFileName = path.basename(module.filename,path.extname(module.filename));
let namespacePrefix = `brokers.${baseFileName}.`;

/**
 * @function getJsonData
 * @description Loads the specified file and parses it into a JSON object(s).
 * @param {string} pathAndFilename The path and file name of the JSON file that 
 * should be loaded and arsed into JSON objects.
 * @return {object} the JSON object as it was loaded from the file with minimal to no additional processing.
 * @author Zarko
 * @date 2024/01/26
 */
function getJsonData(pathAndFilename) {
    let functionName = getJsonData.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`pathAndFilename is : ${pathAndFilename}`);

    pathAndFilename = path.resolve(pathAndFilename);
    let rawData, parsedData;
    try {
        rawData = fs.readFileSync(pathAndFilename, { encoding: 'utf8' });
        parsedData = JSON.parse(rawData);
    } catch (error) {
        console.log('ERROR: ' + error.message);
    }
    console.log(`parsedData is: ${JSON.stringify(parsedData)}`);
    console.log(`END ${namespacePrefix}${functionName} function`);
    return parsedData;
}

/**
 * @function readDirectoryContents
 * @description This function acts as a wrapper for calling readDirectorySynchronously since that functino si recursive.
 * Also that function doesn't techinically return anything, it works with a global variable that
 * needs to be rese fafter the work is done with it. So these are the things tat this wrapper function can do.
 * @param {string} directory The path that needs to be scanned.
 * @return {object} An object containing an  array of all the files in the folder and all sub-folders.
 * @author Zarko
 * @date 2024/01/27
 */
function readDirectoryContents(directory) {

}