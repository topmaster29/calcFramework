/**
 * @file configurator.js
 * @module configurator
 * @description Contains the functions necessary to set and get configuration settings from the shared data structure
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Zarko
 * @date 2024/01/26
 * @copyright Copyright © 2024 by Zarko. All rights reserved
 */

let D = require('../structures/data');
let path = require("path");
let baseFileName = path.basename(module.filename,path.extname(module.filename));
let namespacePrefix = `executrix.${baseFileName}.`;

/**
 * @function setConfigurationSetting
 * @description Sets a configurtion setting on te configuraton data structure stored on the D-data structure.
 * @param {string} configurationName The key of the configuration setting.
 * @param {string|integer|boolean|double} configurationValue The value of the configuration setting.
 * @author Zarko
 * @date 2024/01/26
 */
function setConfigurationSetting(configurationName, configurationValue) {
    let functionName = setConfigurationSetting.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`configurationName is : ${JSON.stringify(configurationName)}`);
    console.log(`configurationValue is : ${JSON.stringify(configurationValue)}`);

    let configurationDataRoot = D['configuration'];
    if (!configurationDataRoot) {
        D['configuration'] = {};
        configurationDataRoot = D['configuration'];
    }
    configurationDataRoot[configurationName] = configurationValue

    console.log(`END ${namespacePrefix}${functionName} function`);
};

/**
 * @function getConfigurationSetting
 * @description Gets a configuration value based on the configuration name.
 * @param {string} configurationName  The key of the configuration setting.
 * @returns {string|integer|boolean|double} The value of whatever was stored in the D[configuration]
 * @author Zarko
 * @date 2024/01/26
 */
function getConfigurationSetting(configurationName) {
    let functionName = getConfigurationSetting.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`configurationName is : ${JSON.stringify(configurationName)}`);

    let returnConfigurationValue;
    if (D['configuration'] !== undefined) {
        if (D['configuration'][configurationName] !== undefined) {
            returnConfigurationValue = D['configuration'][configurationName];
        } else {
            returnConfigurationValue = undefined;
        }
    } else {
        returnConfigurationValue = undefined;
    }

    console.log(`returnConfigurationValue is : ${returnConfigurationValue}`);
    console.log(`END ${namespacePrefix}${functionName} function`);
    return returnConfigurationValue;
};

module.exports = {
    ['setConfigurationSetting']: (configurationName, configurationValue) => setConfigurationSetting(configurationName, configurationValue),
    ['getConfigurationSetting']: (configurationName) => getConfigurationSetting(configurationName)
};