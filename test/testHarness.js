/**
 * @file testHarness
 * @module testHarness
 * @description This is the main init for the testHarness application.
 * It contains just enough of the main program loop and/or basic argument parsing to effectively test the framework.
 * @requires {@link https://www.npmjs.com/package/prompt-sync|prompt-sync}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Zarko
 * @date 2024/01/24
 * @copyright Copyright © 2024 by Zarko. All rights reserved
 */

import calcFramework from '../src/main.js';
const prompt = require('prompt-sync')();
var path = require('path');
global.appRoot = path.resolve(process.cwd());
var rootPath = '';
var baseFileName = path.basename(module.filename,path.extname(module.filename));
var namespacePrefix = `application.${baseFileName}`;

/**
 * @function bootstrapApplication
 * @description Setup all the testHarness application data and configuration settings.
 * @returns {void}
 * @author Zarko
 * @date 2024/01/24
 */
function bootstrapApplication() {
    let functionName = bootstrapApplication.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    rootPath = path.resolve(process.cwd());
    let appConfig = {
        "applicationName": "testHarness",
        "rootPath": rootPath,
        "appConfigReferencePath": "//test//resources//configuration//"
    };
    calcFramework.initFramework(appConfig);
    console.log(`END ${namespacePrefix}${functionName} function`);
}

/**
 * @function application
 * @description This is the main program loop, the init for the test testHarness application.
 * @returns {void}
 * @author Zarko
 * @date 2024/01/24
 */
function application() {
    let functionName = application.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    let argumentDrivenInterface = false;
    let commandInput;
    let commandResult;

    if (argumentDrivenInterface === false) {
        console.log('BEGIN main program loop');
        console.log('BEGIN command parser');

        while (programRunning === true) {
            commandInput = prompt('>');

            if (commandInput.toUpperCase().trim() === 'EXIT') {
                console.log('END command parser');
                programRunning = false;
                console.log('END main program loop');
                console.log('Exitin TEST HARNESS APPLICATION');
                break;
            }
        }
    }
    console.log(`END ${namespacePrefix}${functionName} function`);
}

var programRunning = false;
bootstrapApplication();
programRunning = true;
application();
