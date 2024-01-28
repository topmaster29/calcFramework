/**
 * @file timers.js
 * @module timers
 * @description Contains of the functions needed for generating time stamps,
 * reformatting time stamps and tracking time durations.
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @requires {@link https://www.npmjs.com/package/moment|moment}
 * @author Zarko
 * @date 2024/01/27
 * @copyright Copyright © 2024 by Zarko. All rights reserved
 */

let path = require("path");
let moment = require('moment');
let baseFileName = path.basename(module.filename,path.extname(module.filename));
let namespacePrefix = `application.${baseFileName}.`;

/**
 * @function getNowMoment
 * @description Returns a time stamp string formatted according to th einput formatting string.
 * @param {string} formatting  The formatting string, that tells moment in what formant to
 * return the value for the day, mont, year, hour, moinute, second and millisecond.
 * @return {string} A time stamp string that has been formatted according to the input format.
 * @author Zarko
 * @date 2024/01/27
 */
function getNowMoment(formatting) {
    let functionName = getNowMoment.name;
    // console.log(`BEGIN ${namespacePrefix}${functionName} function`);

    let returnData = '';
    returnData = moment().format(formatting);

    // console.log(`returnData is: ${returnData}`);
    // console.log(`END ${namespacePrefix}${functionName} function`);
    return returnData;
};

/**
 * @function computeDeltaTime
 * @description Computes the time difference between two different date-time stamps in milliseconds.
 * @param {string} startTime The start of the time period that should be computed
 * @param {sring} endTime The end o fthe time period that should be computed.
 * @return {integer} The diference between the beginnin time and ending time in milliseconds.
 * @author Zarko
 * @date 2024/01/27
 */
function computeDeltaTime(startTime, endTime) {
    let functionName = computeDeltaTime.name;
    // console.log(`BEGIN ${namespacePrefix}${functionName} function`);
    // console.log(`startTime is: ${startTime}`);
    // console.log(`endTime is: ${endTime}`);

    let returnData = '';

    // console.log(`returnData is: ${returnData}`);
    // console.log(`END ${namespacePrefix}${functionName} function`);
    return returnData;
};
module.exports = {
    ['getnowMoment']: (formatting => getNowMoment(formatting))
};