/**
 * @file warden.js
 * @module warden
 * @description Contains all teh funtions to manage the entire application framework at the highest level.
 * Also provides an interface to easily manage all the framework features & various functionality from a single entry point.
 * @requires module:chiefConfiguration
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Zarko
 * @date 2024/01/24
 * @copyright Copyright © 2024 by Zarko. All rights reserved
 */

let chiefConfiguration = require('./chiefConfiguration');
let path = require('path');
let baseFileName = path.basename(module.filename, path.extname(module.filename));
let namespacePrefix = `controllers.${baseFileName}.`;

/**
 * @function processRootPath
 * @description Processes the root path of the application using business rules.
 * @note: By calling path.resolve(__dirname); This does not return the true root path of the application.
 * It returns the path to the currently executing file, or the file that was executed first.
 * @param {object} configData All of the configuration data that should be parsed as part of the setup process
 * @returns {string} The true root path of the appication.
 * @author Zarko
 * @date 2024/01/24
 */
function processRootPath(configData) {
    let functionName = processRootPath.name;
    // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    // console.log(`configData is : ${JSON.stringify(configData)}`);

    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    let applicationName = configData['applicationName'];
    let pathToProcess = configData['rootPath'];
    let resolvedPath = '';

    let pathElements = pathToProcess.split('\\');
    // console.log(`pathElements is: ${JSON.stringify(pathElements)}`);
    loop1:
        for (let i = 0; i < pathElements.length; i++) {
            let pathElement = pathElements[i];
            if (i === 0) {
                resolvedPath = pathElement;
            } else if (pathElement === applicationName) {
                resolvedPath = resolvedPath + '\\' + pathElement + '\\';
                break loop1;
            } else {
                resolvedPath = resolvedPath + '\\' + pathElement;
            }
        }
    
    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    let rootPath = path.resolve(resolvedPath);
    // console.log(`END ${namespacePrefix}${functionName} function`);
    return rootPath;
}

/**
 * @function initFrameworkSchema
 * @description Setup all of the framework data and configuration settings.
 * @param {object} configData All of the configuration data that should be parsed as part of the setup process
 * @returns {void}
 * @author Zarko
 * @date 2024/01/24
 */
function initFrameworkSchema(configData) {
    let functionName = initFrameworkSchema.name;
    // console.log(`BEGIN ${namespacePrefix}${functionName} function`);

    let appConfigPath = configData['appConfigPath'];
    let frameworkConfigPath = configData['frameworkConfigPath'];
    chiefConfiguration.setupConfiguration(appConfigPath, frameworkConfigPath);

    // console.log(`END ${namespacePrefix}${functionName} function`);
}

module.exports = {
    ['processRootPath']: (configData) => processRootPath(configData),
    ['initFrameworkSchema']: (configData) => initFrameworkSchema(configData),
}