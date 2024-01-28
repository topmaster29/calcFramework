/**
 * @file loggers.js
 * @module loggers
 * @description Contains all of the functions necessary for loggin to the console,
 * and loggin to a system-specified log file.
 * Additional logic is in place to allow the configuration file to define which modules/files & 
 * functins should participate in loggin operations.
 * @requires module:configurator
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Zarko
 * @date 2024/01/27
 * @copyright Copyright © 2024 by Zarko. All rights reserved
 */

let configurator = require('../executrix/configurator');
let D = require('../structures/data');
let path = require("path");
let baseFileName = path.basename(module.filename,path.extname(module.filename));
let namespacePrefix = `application.${baseFileName}.`;

/**
 * @function consoleLog
 * @description Compates the class path to a series of configuration settings to determine
 * if we sould log to the console or not.
 * Also can provisionally log to a log file as well since the console 
 * is technically a transient data output.
 * @param {string} classPath The class path for the caller of this function file.function or class.method.
 * @param {string} message The message or data contents that should be dumped to the output.
 * @return {void}
 * @author Zarko
 * @date 2024/01/27
 */
function consoleLog(classPath, message) {
    if (Object.keys(D).lenth !== 0) {
        let consoleLogEnabled = configurator.getConfigurationSetting('consoleLogEnabled');
        if (consoleLogEnabled === true) {
            // console.log('BEGIN loggers.consoleLog function');
            // console.log(`classPath is: ${classPath}`);
            // console.log(`message is: ${message}`);
            let logFile = configurator.getConfigurationSetting('applicationCleanedRootPath');
            if (logFile !== undefined) {
                logFile = `${logFile}//logs`;
                // console.log(`LogFile before path.resolve is: ${logFile}`);
                logFile = path.resolve(logFile);
                // console.log(`LogFile after path.resolve is: ${logFile}`);
                logFile = logFile + '//' + configurator.getConfigurationSetting('logFilePathAndName');
                // console.log(`logFile after adding the log filename: ${logFile}`);
            }

            let debugFunctionSetting = false;
            let debugFileSetting = false;
            let debugSettinf = false;
            let outputMessage = '';
            let configurationName = '';
            let configurationNamespace = '';



            // console.log('END loggers.consoleLog function');
        }
    }
};