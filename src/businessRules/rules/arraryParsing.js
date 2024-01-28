/**
 * @file arrayParsing.js
 * @module arrayParsing
 * @description Conatains all system defined business rules for parsing arrays with various operations.
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Zarko
 * @date 2024/01/27
 * @copyright Copyright © 2024 by Zarko. All rights reserved
 */

let path = require('path');
let baseFileName = path.basename(module.filename, path.extname(module.filename));
let namespacePrefix = `controllers.${baseFileName}.`;

/**
 * @function replaceCharacterWithCharacter
 * @description Replaces all of the specified character in the inputDta with another specified character.
 * @param {stirng} inputData A string that may or may not contain the specified
 * character(s) that should be converted to another speified character.
 * @param {array<string, string>} inputMetaData An array of data that contains 2 additional string parameters:
 * inputMetaData[0] = character2Find - The character to be searched and replaced from the input strin.
 * inputMetaData[1] = character2Replace - The character that should be used to replace the character specified for replacement from the input data.
 * @return {stirng} The same as the input string but with specified characters converted to the other pecfied character.
 * @author Zarko
 * @date 2024/01/27
 */
export const replaceCharacterWithCharacter = function (inputData, inputMetaData) {
    let functionName = replaceCharacterWithCharacter.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);

    

    console.log(`END ${namespacePrefix}${functionName} function`);

};