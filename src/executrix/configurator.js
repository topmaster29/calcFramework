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
 * @param {array<string>} configurationNamespace The path in the configuration JSON object.
 * @param {string} configurationName The key of the configuration setting.
 * @param {string|integer|boolean|double} configurationValue The value of the configuration setting.
 * @author Zarko
 * @date 2024/01/26
 */
function setConfigurationSetting(configurationNamespace, configurationName, configurationValue) {
    let functionName = setConfigurationSetting.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`configurationNamespace is : ${JSON.stringify(configurationNamespace)}`);
    console.log(`configurationName is : ${configurationName}`);
    console.log(`configurationValue is : ${JSON.stringify(configurationValue)}`);

    let namespaceConfigObject = getConfigurationNamespaceObject(configurationName.split('.'));
    if (!namespaceConfigObject) {
        namespaceConfigObject[`${configurationName}.${configurationName}`] = configurationValue;
    }
    configurationDataRoot[configurationName] = configurationValue

    console.log(`END ${namespacePrefix}${functionName} function`);
};

/**
 * @function getConfigurationSetting
 * @description Gets a configuration value based on the configuration name.
 * @param {array<string>} configurationNamespace The path in the configuration JSON object.
 * where the configuratoin setting should be found.
 * @param {string} configurationName  The key of the configuration setting.
 * @returns {string|integer|boolean|double} The value of whatever was stored in the D[configuration]
 * @author Zarko
 * @date 2024/01/26
 */
function getConfigurationSetting(configuratoinNamespace, configurationName) {
    let functionName = getConfigurationSetting.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`configuratoinNamespace is : ${JSON.stringify(configuratoinNamespace)}`);
    console.log(`configurationName is : ${configurationName}`);

    let returnConfigurationValue;
    let namespaceConfigObject = undefined;
    namespaceConfigObject = getConfigurationNamespaceObject(configuratoinNamespace.split('.'));
    if (namespaceConfigObject) {
        if (configurationName) {
            if (configurationName.includes('@') && configurationName.indexOf('@') === 0) {
                returnConfigurationValue = getParentConfigurationNamespaceObject(configurationName, configurationName);
            } else {
                returnConfigurationValue = namespaceConfigObject[`${configurationNamespace}.${configurationName}`];
            }
        } else {
            returnConfigurationValue = getParentConfigurationNamespaceObject(configurationNamespace, '');
        }
    }

    console.log(`returnConfigurationValue is : ${returnConfigurationValue}`);
    console.log(`END ${namespacePrefix}${functionName} function`);
    return returnConfigurationValue;
};

/**
 * @function processConfigurationNameRules
 * @description Processes a fully qualified anme and extracts the configuratoin anme without the namesace.
 * @param {string} fullyQualifiedName The fully ualified anme with the anmesapce included.
 * @return {string} The name of the configuration settingwithout the namespaces.
 * @author Zarko
 * @date 2024/01/26
 * @NOTE cannot use the loggers here, because of a circular dependency
 */
function processConfigurationNameRules(fullyQualifiedName) {
    let functionName = processConfigurationNameRules.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`fullyQualifiedName is : ${fullyQualifiedName}`);

    let returnValue;
    let fullyQualifiedNameArray = fullyQualifiedName.split('.');
    returnValue = fullyQualifiedNameArray[fullyQualifiedNameArray.length - 1];

    console.log(`returnValue is : ${returnValue}`);
    console.log(`END ${namespacePrefix}${functionName} function`);
    return returnValue;

};

/**
 * @function processConfigurationNamespaceRules
 * @description Processes a fully qualified anme and extracts the namespace.
 * @param {string} fullyQualifiedName The fully qualified name with the namespace included.
 * @return {string} The namespace of the configuration setting, wihtout the configuration name.
 * @author Zarko
 * @date 2024/01/26
 * @NOTE cannot use the loggers here, because of a circular dependency
 */
function processConfigurationNamespaceRules(fullyQualifiedName) {
    let functionName = processConfigurationNamespaceRules.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`fullyQualifiedName is : ${fullyQualifiedName}`);

    let returnValue;
    returnValue = fullyQualifiedName.substr(0, fullyQualifiedName.lastIndexOf('.'));
    if (returnValue.includes('debugFunctions') || returnValue.includes('debugFiles')) {
        let parsedDebugSettingNamespace = returnValue.split('.');
        returnValue = parsedDebugSettingNamespace[1];
    }

    console.log(`returnValue is : ${returnValue}`);
    console.log(`END ${namespacePrefix}${functionName} function`);
    return returnValue;
};

/**
 * @function processConfigurationValueRules
 * @description Processes a name and vlaue to execute required code and convert string values
 * to actual data objects needed by the configuration system.
 * @param {string} name The name of the configuration variable, without the namespace.
 * @param {string} value The value of the confgiuration variable.
 * @return {string|boolean|integer|float|object} A value that is appropriately processed.
 * @author Zarko
 * @date 2024/01/26
 * @NOTE cannot use the loggers here, because of a circular dependency
 */
function processConfigurationValueRules(name, value) {
    let functionName = processConfigurationValueRules.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`name is : ${name}`);
    console.log(`value is : ${value}`);

    let returnValue;
    switch (name) {
        case 'dateTimeStamp': case 'dateStamp': case 'timeStamp':
            returnValue = timers.getNowMoment(value);
            break;
        default:
            returnValue = value;
            break;
    }

    console.log(`returnValue is : ${JSON.stringify(returnValue)}`);
    console.log(`END ${namespacePrefix}${functionName} function`);
    return returnValue;
};

/**
 * @function getParentConfigurationNamespaceObject
 * @description Navigate the configuraton JSON data object tree to find theanmespae of the configuration setting,
 * and then determines the parent and returns the entire tree of the configuration data
 * including at aprent and all its top level contents.
 * @param {string} configuratoinNamespace The fully qualified path in the configuration JSON object where the configuration setting should be found.
 * @param {*} optionalFunctionNameAppendix An optional function name appendix that could parentially be added to the end of the function name.
 * @return {object|boolean} The parent of the object found at the specified namespace address in the configuration data object, or False if nothing was found.
 * @author Zarko
 * @date 2024/01/26
 */
function getParentConfigurationNamespaceObject(configuratoinNamespace, optionalFunctionNameAppendix) {
    let functionName = getParentConfigurationNamespaceObject.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`configuratoinNamespace is : ${configuratoinNamespace}`);
    console.log(`optionalFunctionNameAppendix is : ${optionalFunctionNameAppendix}`);

    let returnValue;
    let parentConfigurationNamespaceArray = configuratoinNamespace.split('.');
    let newParentConfigurationName = parentConfigurationNamespaceArray.pop();
    let newParentConfigurationNamespace = parentConfigurationNamespaceArray.join('.');
    let parentNamespaceConfigObject = getConfigurationNamespaceObject(parentConfigurationNamespaceArray);
    if (optionalFunctionNameAppendix !== '') {
        returnValue = parentNamespaceConfigObject[`${newParentConfigurationNamespace}.${newParentConfigurationName}${optionalFunctionNameAppendix}`];
    } else {
        returnValue = parentNamespaceConfigObject[`${newParentConfigurationNamespace}.${newParentConfigurationName}`];
    }

    console.log(`returnValue is : ${JSON.stringify(returnValue)}`);
    console.log(`END ${namespacePrefix}${functionName} function`);
    return returnValue;
};

/**
 * @function getConfigurationNamespaceObject
 * @description Navigate the configuration JSON data object tree to find thenamespace of configuration settings.
 * @param {array<string>} configurationNamespace The path in the configuration JSON object where the configuration setting should be set, or returned.
 * @return {object|boolean} The object found at the specified namespace address in the configuration data object, or false if nothing was found.
 * @author Zarko
 * @date 2024/01/26
 * @NOTE cannot use the loggers here, because of a circular dependency
 */
function getConfigurationNamespaceObject(configurationNamespace) {
    let functionName = getConfigurationNamespaceObject.name;
    console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    console.log(`configurationNamespace is : ${configurationNamespace}`);

    let returnValue = true;
    let configurationDataRoot = D['configuration'];
    let configurationPathObject = configurationDataRoot;
    if (!configurationPathObject) {
        D['configuration'] = {};
        configurationDataRoot = D['configuration'];
        configurationPathObject = configurationDataRoot;
    }
    for (let i = 0; i < configurationNamespace.length; i++) {
        if (!configurationPathObject[configurationNamespace[i]]) {
            configurationPathObject[configurationNamespace[i]] = {};
        }
        configurationPathObject = configurationPathObject[configurationNamespace[i]];
    }
    returnValue = configurationPathObject;
    
    console.log(`returnValue is : ${JSON.stringify(returnValue)}`);
    console.log(`END ${namespacePrefix}${functionName} function`);
    return returnValue;
};

module.exports = {
    ['setConfigurationSetting']: (configurationNamespace, configurationName, configurationValue) => setConfigurationSetting(configurationNamespace, configurationName, configurationValue),
    ['getConfigurationSetting']: (configurationNamespace, configurationName) => getConfigurationSetting(configurationNamespace, configurationName),
    ['processConfigurationNameRules']: (fullyQualifiedName) => processConfigurationNameRules(fullyQualifiedName),
    ['processConfigurationNamespaceRules']: (fullyQualifiedName) => processConfigurationNamespaceRules(fullyQualifiedName),
    ['processConfigurationVlaueRules']: (name, value) => processConfigurationValueRules(name, value)
};