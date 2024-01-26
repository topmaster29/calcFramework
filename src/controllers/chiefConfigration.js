/**
 * @file chiefConfigration.js
 * @module chiefConfigration
 * @description Contains all the funtions to manage the configuration system.
 * such as adding, setup, parsing & processing.
 * @requires module:chiefData
 * @requires module:configurator
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Zarko
 * @date 2024/01/24
 * @copyright Copyright © 2024 by Zarko. All rights reserved
 */

let chiefData = require('./chiefData');
let configurator = require('../executrix/configurator');
let path = require("path");
let baseFileName = path.basename(module.filename,path.extname(module.filename));
let namespacePrefix = `application.${baseFileName}.`;

/**
 * @function setupConfiguration
 * @description Sets up all of the application and framework configuration data.
 * @param {string} appConfigPath The path of the configuration files for the application layer.
 * @param {string} frameworkConfigPath The path of the configuration files for the framework layer.
 * @returns {void}
 * @author Zarko
 * @date 2024/01/24
 */
function setupConfiguration(appConfigPath, frameworkConfigPath) {
    let functionName = setupConfiguration.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`appConfigPath is : ${JSON.stringify(appConfigPath)}`);
    console.log(`frmeworkConfigPath is : ${JSON.stringify(frameworkConfigPath)}`);
    configurator.setConfigurationSetting('appConfigPath', appConfigPath);
    configurator.setConfigurationSetting('frameworkConfigPath', frameworkConfigPath);
    let allAppConfigData = {};
    let allFrameworkConfigData = {};

    allFrameworkConfigData = chiefData.setupAllJsonConfigData('frameworkConfigPath', 'configuration');
    allAppConfigData = chiefData.setupAllJsonConfigData('appConfigPath', 'configuration');
    // TODO: pareLoadedConfigurationData
    // NOTE: We cannot really propery implement the parseLoadedCOnfigurationData until we have a basic business rules system.
    // TODO: mere App Config Data & Framework Config Data
    console.log(`allAppConfigData is: ${JSON.stringify(allAppConfigData)}`);
    console.log(`allFrameworkConfigData is: ${JSON.stringify(allFrameworkConfigData)}`);
    console.log(`END ${namespacePrefix}${functionName} function`);
}