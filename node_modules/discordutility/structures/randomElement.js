"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const randomNumber_1 = require("./randomNumber");
function randomElement(array, count) {
    if (!Array.isArray(array) || !array[0])
        return [];
    if (!array[1])
        return array[0];
    if (!count)
        array[randomNumber_1.randomNumber(array.length, 0)];
    let newArr = [];
    for (let i = 0; i < count; i++) {
        newArr.push(array[randomNumber_1.randomNumber(array.length, 0)]);
    }
    return newArr;
}
exports.randomElement = randomElement;
;
