/**
 * @file stringParsing.js
 * @module stringParsing
 * @description Contains all system defined business rules for parsing strings,
 * with values of all kinds, and various parsing operations
 * @requires module:configurator
 * @requires module:arrayParsing
 * @requires module:data
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Zarko
 * @date 2024/01/29
 * @copyright Copyright © 2024 by Zarko. All rights reserved
 */

let configurator = require("../../executrix/configurator");
let arrayParsing = require("./arraryParsing");
let D = require("../../structures/data");
let path = require("path");
let baseFileName = path.basename(
	module.filename,
	path.extname(module.filename)
);
let namespacePrefix = `controllers.${baseFileName}.`;

/**
 * @function parseSystemRootPath
 * @description Parses the root path as returned by calling: path.resolve(__dirname);
 * This business rule looks for the "AppName" part of the path,
 * and will parse that out to determine where on the hard drive this "appName" folder is installed at.
 * @NOTE: the "AppName" is derived from the configuration settings called "aplicationName"
 * which should have beenset by the system when it was loaded.
 * @param {stirng} inputData A string that may or may not contain the specified
 * character(s) that should be converted to another speified character.
 * @param {array<string, string>} inputMetaData An array of data that contains 2 additional string parameters:
 * inputMetaData[0] = character2Find - The character to be searched and replaced from the input strin.
 * inputMetaData[1] = character2Replace - The character that should be used to replace the character specified for replacement from the input data.
 * @return {stirng} The same as the input string but with specified characters converted to the other pecfied character.
 * @author Zarko
 * @date 2024/01/29
 */
export const parseSystemRootPath = function (inputData, inputMetaData) {
	let functionName = parseSystemRootPath.name;
	console.log(`BEGIN ${namespacePrefix}${functionName} function`);
	console.log(`inputData is: ${inputData}`);
	console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);

	let returnData;
	if (inputData) {
		let applicationName = inputMetaData;
		let pathElements = inputData.split("\\");
		loop1: for (let i = 0; i < pathElements.length; i++) {
            console.log(`BEGIN iteraton i: ${i}`);
			let pathElement = pathElements[i];
            console.log(`pathElement is: ${pathElement}`);
			if (i === 0) {
                console.log('case: i === 0');
				resolvedPath = pathElement;
			} else if (pathElement === applicationName) {
                console.log(`case: pathElement === ${applicationName}`);
				resolvedPath = resolvedPath + "\\" + pathElement + "\\";
				break loop1;
			} else {
                console.log('case else');
				resolvedPath = resolvedPath + "\\" + pathElement;
			}
		}
	}

	console.log(`returnData is: ${returnData}`);
	console.log(`END ${namespacePrefix}${functionName} function`);

	return returnData;
};

/**
 * @function stringToDataType
 * @description Converts a string to the appropriate data value.
 * So if it's a string vlaue of "3.14156296..." Then it wil be converted to a float of the same value.
 * If it's a string value of false then it will get converted to a boolean of the same value.
 * 
 * @param {*} inputdata 
 * @param {*} inputMetaData 
 * @return {object|string|boolean|integer|float} Returns a value of whatever type the string should be converted to as appropriate
 * @author Zarko
 * @date 2024/01/29
 */
export const stringToDataType = function(inputdata, inputMetaData) {
    let functionName = stringToDataType.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`inputData is: ${inputData}`);
    console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);

    let returnData = '';
    if (inputData) {
        let dataType = determineObjectDataType(inputData, '');
        switch (dataType) {
            case 'Boolean':
                returnData = stringToBoolean(inputData, '');
                break;
            case 'Integer':
                returnData = parseInt(inputData, '');
                break;
            case 'Float':
                returnData = parseFloat(inputData, '');
                break;
            case 'String':
                returnData = inputData;
                break;
            default:
                returnData = inputData;
                break;
        }
    }
    
    console.log(`returnData is: ${returnData}`);
    console.log(`END ${namespacePrefix}${functionName} function`);

    return returnData;
};

/**
 * @function stringToBoolean
 * @description Converts a string to a boolean value.
 * @param {*} inputData A string that contains a truthy or falsy value and shhould be converted to a boolean value.
 * @param {*} inputMetaData Not used for this business rule.
 * @return {boolean} A boolean vlaue of either True or False according to the business rule conversion.
 * @author Zarko
 * @date 2024/01/29
 * @NOTE We cannt pass in a 1 or 0 to this ufnction and expect it to evalueate as a True or False because:
 * We have another function that is passing strings inot the function,
 * and also par of that check to look for data-tpes is a check to see if a string is a number.
 * If we cause thi sfunction to evalueate a 0 or 1 to a Boolean,
 * then the integer function would never get a chance to evaluate.
 */
export const stringToBoolean = function(inputData, inputMetaData) {
    let functionName = stringToBoolean.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`inputData is: ${inputData}`);
    console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);

    let returnData = false;
    if (inputData) {
        if (typeof inputData === 'boolean') {
            returnData = inputData;
        } else {
            switch (inputData.toLowerCase().trim()) {
                case 'true': case 't': case 'y': case 'yes': case "on":
                    returnData = true;
                    break;
                case 'false': case 'f': case 'n': case 'no': case "off":
                    returnData = false;
                    break;
                default:
                    returnData = false;
                    break;
            }
        }
    } 

    console.log(`returnData is: ${returnData}`);
    console.log(`END ${namespacePrefix}${functionName} function`);

    return returnData;
};

/**
 * @function determineObjectDataType
 * @description Determines if the contents of a string are actually a Boolean, Integer, Float, String or something else.
 * @param {*} inputData A string that contains some value that we should figure out
 * what kind of data type that dta is, Boolen, Integer, Float string or something else.
 * @param {*} inputMetaData not used for this business rules.
 * @return {string} A string that indicates if the data type should be Boolean, Integer, Flot, String ro something else.
 * @author Zarko
 * @date 2024/01/29
 */
export const determineObjectDataType = function(inputData, inputMetaData) {
    let functionName = determineObjectDataType.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`inputData is: ${inputData}`);
    console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);

    let returnData = '';
    if (inputData) {
        if (isBoolean(inputData, '') === true) {
            returnData = 'Boolean';
        } else if (isInteger(inputData, '') === true) {
            returnData = 'Integer';
        } else if (isFloat(inputData, '') === true) {
            returnData = 'Float';
        } else if (isString(inputData, '') === true) {
            returnData = 'String';
        } else {
            returnData = 'Object';
        }
    }

    console.log(`returnData is: ${returnData}`);
    console.log(`END ${namespacePrefix}${functionName} function`);

    return returnData;
}

/**
 * @function isBoolean
 * @description Deterins if the iput string is a boolean type of value,
 * "true", "True", "t", "T", "y", "Y", "yes"...
 * @param {*} inputData The string that should be checked if it si a Boolean style value or not,
 * chould be some form of "true" or "false".
 * @param {*} inputMetaData not used for this business rule
 * @return {boolean}  A Boolean value of True or False to indicate if the input strin gis olean or not.
 * @author Zarko
 * @date 2024/01/29
 */
export const isBoolean = function(inputData, inputMetaData) {
    let functionName = isBoolean.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`inputData is: ${inputData}`);
    console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);

    let returnData = false;
    if (inputData) {
        if (typeof inputData === 'boolean') {
            returnData = true;
        } else {
            inputData = inputData.toLowerCase().trim();
            if (inputData === 'true' ||
            inputData === 't' ||
            inputData === 'y' ||
            inputData === 'yes' ||
            inputData === 'on' ||
            inputData === 'false' ||
            inputData === 'f' ||
            inputData === 'n' ||
            inputData === 'no' ||
            inputData === 'off') {
                returnData = true;
            } else {
                returnData = false;
            }
        }
    }

    console.log(`returnData is: ${returnData}`);
    console.log(`END ${namespacePrefix}${functionName} function`);

    return returnData;
};

/**
 * @function isInteger
 * @description Determines if the input string is an integer type of value 
 * @param {*} inputData The sring that should be checked if it is an integer style value or not.
 * @param {*} inputMetaData not used for ..
 * @return {boolean} A boolean value of True or false to indeicate if the input string is an integer or not.
 * @author Zarko
 * @date 2024/01/29
 */
export const isInteger = function(inputData, inputMetaData) {
    let functionName = isInteger.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`inputData is: ${inputData}`);
    console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);

    let returnData = false;
    if (inputData) {
        if (!isNaN(inputData)) {
            if (inputData % 1 === 0) {
                returnData = true;
            } else {
                returnData = false;
            }
        } else {
            returnData = false;
        }
    }

    console.log(`returnData is: ${returnData}`);
    console.log(`END ${namespacePrefix}${functionName} function`);

    return returnData;
};

/**
 * @function isFloat
 * @description Determines if the input string is an float type of value 
 * @param {*} inputData The sring that should be checked if it is an float style value or not.
 * @param {*} inputMetaData not used for ..
 * @return {boolean} A boolean value of True or false to indeicate if the input string is an float or not.
 * @author Zarko
 * @date 2024/01/29
 */
export const isFloat = function(inputData, inputMetaData) {
    let functionName = isInteger.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`inputData is: ${inputData}`);
    console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);

    let returnData = false;
    if (inputData) {
        if (!isNaN(inputData) && inputData.indexOf('.') !== -1) {
            returnData = true;
        } else {
            returnData = false;
        }
    }

    console.log(`returnData is: ${returnData}`);
    console.log(`END ${namespacePrefix}${functionName} function`);

    return returnData;
};

/**
 * @function isString
 * @description Determins ifthe input string is a string or not, by process of elimination, aka if it's not a boolean, and not an integer
 * not a float then it must be a string.
 * @param {*} inputData The sring that should be checked if it is an string style value or not.
 * @param {*} inputMetaData not used for ..
 * @return {boolean} A boolean value of True or false to indeicate if the input string is an string or not.
 * @author Zarko
 * @date 2024/01/29
 */
export const isString = function(inputData, inputMetaData) {
    let functionName = isString.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`inputData is: ${inputData}`);
    console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);

    let returnData = false;
    if (inputData) {
        if (!isBoolean(inputData, '') && !isInteger(inputData, '') && !isFloat(inputData, '') &&
        (typeof inputData === 'string' || inputData instanceof String)) {
            returnData = true;
        } else {
            returnData = false;
        }
    }

    console.log(`returnData is: ${returnData}`);
    console.log(`END ${namespacePrefix}${functionName} function`);

    return returnData;
};

/**
 * @function singleQuoteSwapAfterEquals
 * @description Swaps single quote characters in the midle of the string with double quote characters in the middle of the string
 * input: 'input[name='emailAddress'][class='username']'
 * output: 'input[name='emailAddress'][class='username']'
 * @param {*} inputData A string that contains text with single quotes thhatshould be swapped for doulbe quotes.
 * @param {*} inputMetaData not nused fo this business rule.
 * @return {string} A string that contains text where single quotes have been exchanged for double quotes.
 * @author Zarko
 * @date 2024/01/29
 */
export const singleQuoteSwapAfterEquals = function(inputData, inputMetaData) {
    let functionName = singleQuoteSwapAfterEquals.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`inputData is: ${inputData}`);
    console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);

    let returnData = '';
    if (inputData) {
        if (inputData.includes('\'') === true) {
            returnData = arrayParsing.replaceCharacterWithCharacter(inputData, [/'/g, '"']);
            if (returnData.indexOf('"') === 0) {
                returnData = arrayParsing.replaceCharacterWithCharacter(inputData, ['"', '\'']);
            }
            if (returnData.charAt(returnData.length - 1) === '"') {
                returnData = returnData.slice(0, -1);
            }
        } else {
            returnData = inputData;
        }
    }

    console.log(`returnData is: ${returnData}`);
    console.log(`END ${namespacePrefix}${functionName} function`);

    return returnData;
};

/**
 * @function swapBackSlashToForwardSlash
 * @description Swapes all forward slash characters in a string for back slash characters.
 * @param {*} inputData String that might contains some forward slashes
 * @param {*} inputMetaData not used for this business rule
 * @return {string} The same as the input string, just al forwas slash characters swapped for back slash characters.
 * @author Zarko
 * @date 2024/01/29
 */
export const swapForwardSlashToBackSlash = function (inputData, inputMetaData) {
    let functionName = swapForwardSlashToBackSlash.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`inputData is: ${inputData}`);
    console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);

    let returnData = '';
    if (inputData) {
        returnData = arrayParsing.replaceCharacterWithCharacter(inputData, [/\//g, '\\']);
    }

    console.log(`returnData is: ${returnData}`);
    console.log(`END ${namespacePrefix}${functionName} function`);

    return returnData;
};

/**
 * @function swapBackSlashToForwardSlash
 * @description Swapes all backword slash characters in a string for forward slash characters.
 * @param {*} inputData String that might contains some forward slashes
 * @param {*} inputMetaData not used for this business rule
 * @return {string} The same as the input string, just al forwas slash characters swapped for back slash characters.
 * @author Zarko
 * @date 2024/01/29
 */
export const swapBackSlashToForwardSlash = function (inputData, inputMetaData) {
    let functionName = swapBackSlashToForwardSlash.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`inputData is: ${inputData}`);
    console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);

    let returnData = '';
    if (inputData) {
        returnData = arrayParsing.replaceCharacterWithCharacter(inputData, [/\\/g, '/']);
    }

    console.log(`returnData is: ${returnData}`);
    console.log(`END ${namespacePrefix}${functionName} function`);

    return returnData;
};


/**
 * @function swapDoubleForwardSlashToSingleForwasSlash
 * @description Swps all doulbe forward slash characters for single forwas slash characters.
 * @param {*} inputData String that might contains double forward slashes
 * @param {*} inputMetaData not used for this business rule
 * @return {string} The same as the input string, just all doulbe forward slash characters swapped for single forward slash characters.
 * @author Zarko
 * @date 2024/01/29
 */
export const swapDoubleForwardSlashToSingleForwasSlash = function (inputData, inputMetaData) {
    let functionName = swapDoubleForwardSlashToSingleForwasSlash.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`inputData is: ${inputData}`);
    console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);

    let returnData = '';
    if (inputData) {
        returnData = arrayParsing.replaceCharacterWithCharacter(inputData, [/\/\//g, '/']);
    }

    console.log(`returnData is: ${returnData}`);
    console.log(`END ${namespacePrefix}${functionName} function`);

    return returnData;
};

/**
 * @function swapDoubleBackSlashToSingleBackSlash
 * @description Swps all doulbe backword slash characters for single back slash characters.
 * @param {*} inputData String that might contains double forward slashes
 * @param {*} inputMetaData not used for this business rule
 * @return {string} The same as the input string, just all doulbe forward slash characters swapped for single forward slash characters.
 * @author Zarko
 * @date 2024/01/29
 */
export const swapDoubleBackSlashToSingleBackSlash = function (inputData, inputMetaData) {
    let functionName = swapDoubleBackSlashToSingleBackSlash.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`inputData is: ${inputData}`);
    console.log(`inputMetaData is: ${JSON.stringify(inputMetaData)}`);

    let returnData = '';
    if (inputData) {
        returnData = arrayParsing.replaceCharacterWithCharacter(inputData, [/\\\\/g, '\\']);
    }

    console.log(`returnData is: ${returnData}`);
    console.log(`END ${namespacePrefix}${functionName} function`);

    return returnData;
};


// ********************************************
// Internal functions
// ********************************************

/**
 * @function  replaceCharacterAtIndesOfString
 * @description Replaces the charcter at a specified index with another character.  
 * @param {*} originalString The string where teh replacement should be made.
 * @param {*} index The index of the character where the replacement should be made.
 * @param {*} replacement The character or string that hsould be inserted at the specified index.
 * @author Zarko
 * @date 2024/01/29
 */
const replaceCharacterAtIndesOfString = function(originalString, index, replacement) {
    let functionName = replaceCharacterAtIndesOfString.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`originalString is: ${originalString}`);
    console.log(`index is: ${index}`);
    console.log(`replacement is: ${replacement}`);

    let returnData = '';
    if (originalString !== '' && index >= 0 && replacement !== '') {
        returnData = originalString.substr(0, index) + replacement + originalString.substr(index + replacement.length);
    }
    console.log(`returnData is: ${returnData}`);
    console.log(`END ${namespacePrefix}${functionName} function`);

    return returnData;
};