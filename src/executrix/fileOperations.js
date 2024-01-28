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
let enableFilesListLimit = false;
let hitFileLimit = false;
let baseFileName = path.basename(module.filename,path.extname(module.filename));
let namespacePrefix = `executrix.${baseFileName}.`;

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
    // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    // console.log(`pathAndFilename is : ${pathAndFilename}`);

    pathAndFilename = path.resolve(pathAndFilename);
    let rawData, parsedData;
    try {
        rawData = fs.readFileSync(pathAndFilename, { encoding: 'utf8' });
        parsedData = JSON.parse(rawData);
    } catch (error) {
        console.log('ERROR: ' + error.message);
    }
    // console.log(`parsedData is: ${JSON.stringify(parsedData)}`);
    // console.log(`END ${namespacePrefix}${functionName} function`);
    return parsedData;
}

/**
 * @function readDirectoryContents
 * @description This function acts as a wrapper for calling readDirectorySynchronously since that functino si recursive.
 * Also that function doesn't techinically return anything, it works with a global variable that
 * needs to be reset after the work is done with it. So these are the things tat this wrapper function can do.
 * @param {string} directory The path that needs to be scanned.
 * @return {array<string>} An aray of strings containing a list of all 
 * @author Zarko
 * @date 2024/01/27
 */
function readDirectoryContents(directory) {
    let functionName = readDirectoryContents.name;
    // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    // console.log(`directory is : ${directory}`);

    let filesFound = [];
    directory = path.resolve(directory);
    readDirectorySynchronously(directory);
    filesFound = filesCollection;
    filesCollection = undefined;
    filesCollection = [];

    // console.log(`filesFound is: ${JSON.stringify(filesFound)}`);
    // console.log(`END ${namespacePrefix}${functionName} function`);
    return filesFound;
}

/**
 * @function readDirectorySynchronously
 * @description Recursivey parses through all the sub-folders in a given path and
 * loads all of the files contained in ech sub-folder into an array.
 * @param {string} directory The path that needs to be scanned.
 * @return {array<string>} An JSON object containing an  array of all the files in the folder and all sub-folders.
 * @NOTE The function oesn't actually return anythingm all the file data is stored in an exteranl data collection.
 * @author Zarko
 * @date 2024/01/27
 */
function readDirectorySynchronously(directory) {
    let functionName = readDirectorySynchronously.name;
    // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    // console.log(`directory is : ${directory}`);

    if (hitFileLimit === false) {
        directory = path.resolve(directory);
        let currentDirectoryPath = directory;
        let currentDirectory = '';
        try {
            currentDirectory = fs.readdirSync(currentDirectoryPath, 'utf8');
        } catch (error) {
            fs.mkdirSync(currentDirectoryPath);
            currentDirectory = fs.readdirSync(currentDirectoryPath, 'utf8');
        }
        currentDirectory.forEach(file => {
            let filesShouldBeSkipped = directoriesToSkip.indexOf(file) > -1;
            let pathOfCurrentItem = directory + '/' + file;
            try {
                if (!filesShouldBeSkipped) {
                    if (enableFilesListLimit = true && filesListLimit > 0) {
                        if (filesCollection.length <= filesListLimit) {
                            filesCollection.push(pathOfCurrentItem);
                            // console.log(`filesCollection is: ${JSON.stringify(filesCollection)}`);
                        } else {
                            hitFileLimit = true;
                            return;
                        }
                    } else {
                        filesCollection.push(pathOfCurrentItem);
                    }
                } else if (!filesShouldBeSkipped) {
                    let directoryPath = '';
                    directoryPath = path.resolve(directory + '//' + file);
                    // console.log(`directoryPath is: ${directoryPath}`);
                    readDirectorySynchronously(directoryPath);
                }
            } catch (error) {
                // console.log(`ERROR: Invalid access to: ${pathOfCurrentItem}`);
            }
        })
    }
    
    // console.log(`END ${namespacePrefix}${functionName} function`);
};

/**
 * @function cleanRootPath
 * @description Takes the application root path and cleans it to give a real root path,
 * or top-level folder path for the application.
 * @return {string} The real root path or top-level path for the application.
 * @NOTE Thi shas been problematic because often many of the init fucntions are cotained in ovwer level folders,
 * not at the top-level. This gives much greater level or organization to the over all project and helps with scalability & resuability.
 * @author Zarko
 * @date 2024/01/27
 */
function cleanRootPath() {
    let functionName = cleanRootPath.name;
    // console.log(`BEGIN ${namespacePrefix}${functionName} function`);

    let rootPath;

    // console.log(`rootPath is: ${rootPath}`);
    // console.log(`END ${namespacePrefix}${functionName} function`);
    return rootPath;
};

module.exports = {
    ['getJsonData']: (pathAndFilename) => getJsonData(pathAndFilename),
    ['readDirectoryContents']: (directory) => readDirectoryContents(directory),
    ['readDirectorySynchronously']: (directory) => readDirectorySynchronously(directory)
};