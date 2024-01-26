/**
 * @file main.js
 * @module main
 * @description Contains all customer facing funtions that are used to interface with the rest of the application framework
 * @requires module:warden
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Zarko
 * @date 2024/01/24
 * @copyright Copyright © 2024 by Zarko. All rights reserved
 */

let warden = require('./controllers/warden');
let path = require("path");
let baseFileName = path.basename(module.filename,path.extname(module.filename));
let namespacePrefix = `application.${baseFileName}.`;

/**
 * @function initFramework
 * @description Initializes the framework systems.
 * @param {object} clientConfiguration A configuration data object that contains
 * all the data neededto bootstrap the framework for a client application.
 * @returns {void}
 * @author Zarko
 * @date 2024/01/24
 */
function initFramework(clientConfiguration) {
    let functionName = initFramework.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`clientConfiguration is : ${JSON.stringify(clientConfiguration)}`);

    let appRootPath = warden.processRootPath(clientConfiguration);
    clientConfiguration['appRootPath'] = appRootPath;
    clientConfiguration['appConfigPath'] = appRootPath + clientConfiguration['appConfigreferencePath'];
    clientConfiguration['frameworkConfigPath'] = __dirname + '//resources//configurations//';
    warden.initFrameworkSchema(clientConfiguration);

    console.log(`END ${namespacePrefix}${functionName} function`);
}

module.exports = {
    ['initFramework']: (clientConfiguration) => initFramework(clientConfiguration)
}