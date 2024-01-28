/**
 * @file rulesLibrary.js
 * @module rulesLibrary
 * @description Contains ll of the system defined business rules as
 * a map betweenf unction anmes and function calls.
 * @requires module:arrayParsing
 * @requires module:stringParsing
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Zarko
 * @date 2024/01/27
 * @copyright Copyright © 2024 by Zarko. All rights reserved
 */
let arrayParsing = require('./rules/arrayParsing');
let stringParsing = require('./rules/stringParsing');
let D = require('../structures/data');
let path = require('path');
let baseFileName = path.basename(module.filename, path.extname(module.filename));
let namespacePrefix = `controllers.${baseFileName}.`;

/**
 * @function initRulesLibrary
 * @description Initializes the business rules function data structure on D.
 * @return {void}
 * @author Zarko
 * @date 2024/01/27
 * @NOTE Please be aware that the Commands an BusinessRules data fields in the 
 * D=data structure are going to display as empty when printing out the
 * D-daa structure even when using JSON.sringify().
 * This is because the functions cannot really be serialized in any way.
 * It actually kind of makes sense, bu could be really confusing if you are struggling,
 * trying todebug commands or business rules tat do not appear to exist.
 */
export const initRulesLibrary = function() {
    let functionName = initRulesLibrary.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);

    D['businessRules'] = {};
    D['businessRules'] = {
        ['echo']: (inputData, inputMetaData) => console.log(JSON.stringify(inputData)),

        // Business Rules
        // *******************************************************
        // arrayParsing rules in order
        // *******************************************************
        ['replaceCharacterWithCharacter']: (inputData, inputMetaData) => arrayParsing.replaceCharacterWithCharacter(inputData, inputMetaData),

        // *******************************************************
        // stringParsing rules in order
        // *******************************************************
        ['parseSystemRootPath']: (inputData, inputMetaData) => stringParsing.parseSystemRootPath(inputData, inputMetaData),
        ['stringToDataType']: (inputData, inputMetaData) => stringParsing.stringToDataType(inputData, inputMetaData),
        ['stringToBoolean']: (inputData, inputMetaData) => stringParsing.stringToBoolean(inputData, inputMetaData),
        ['determineObjectDataType']: (inputData, inputMetaData) => stringParsing.determineObjectDataType(inputData, inputMetaData),
        ['isBoolean']: (inputData, inputMetaData) => stringParsing.isBoolean(inputData, inputMetaData),
        ['isInteger']: (inputData, inputMetaData) => stringParsing.isInteger(inputData, inputMetaData),
        ['isFloat']: (inputData, inputMetaData) => stringParsing.isFloat(inputData, inputMetaData),
        ['isString']: (inputData, inputMetaData) => stringParsing.isString(inputData, inputMetaData),
        ['singleQuoteSwapAfterEquals']: (inputData, inputMetaData) => stringParsing.singleQuoteSwapAfterEquals(inputData, inputMetaData),
        ['swapForwardSlashToBackSlash']: (inputData, inputMetaData) => stringParsing.swapForwardSlashToBackSlash(inputData, inputMetaData),
        ['swapBackSlashToForwardSlash']: (inputData, inputMetaData) => stringParsing.swapBackSlashToForwardSlash(inputData, inputMetaData),
        ['swapDoulbeBackSlashToSingleBackSlash']: (inputData, inputMetaData) => stringParsing.swapDoulbeBackSlashToSingleBackSlash(inputData, inputMetaData),

    };

    console.log(`END ${namespacePrefix}${functionName} function`);
}