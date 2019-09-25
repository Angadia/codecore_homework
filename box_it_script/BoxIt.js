#! /usr/bin/env node

const drawLine = (length) => {
    let line = "";
    return line.padEnd(length, String.fromCharCode(0x2500));
};

const drawTopBorder = (length) => {
    if (length < 0) {
        length = 0;
    };
    return String.fromCharCode(0x250C).padEnd(length+1, drawLine(length)).padEnd(length+2, String.fromCharCode(0x2510));
};

const drawBottomBorder = (length) => {
    if (length < 0) {
        length = 0;
    };
    return String.fromCharCode(0x2514).padEnd(length+1, drawLine(length)).padEnd(length+2, String.fromCharCode(0x2518));
};

const drawMiddleBorder = (length) => {
    if (length < 0) {
        length = 0;
    };
    return String.fromCharCode(0x251C).padEnd(length+1, drawLine(length)).padEnd(length+2, String.fromCharCode(0x2524));
};

const drawBarsAround = (string) => {
    return String.fromCharCode(0x2502).padEnd(string.length+1, string).padEnd(string.length+2, String.fromCharCode(0x2502));
};

const boxIt = (arrayStrings) => {
    let maxLength = 0;
    let paddedString = "";

    arrayStrings.forEach(element => {
        if (element.length > maxLength) {
            maxLength = element.length;
        };
    });

    paddedString = drawTopBorder(maxLength);
    paddedString = paddedString.concat('\n');
    for (let index = 0; index < arrayStrings.length; index++) {
        const element = arrayStrings[index];
        paddedString = paddedString.concat(drawBarsAround(element.padEnd(maxLength))).concat('\n');
        if (index != arrayStrings.length-1) {
            paddedString = paddedString.concat(drawMiddleBorder(maxLength)).concat('\n');
        };
    };
    return paddedString.concat(drawBottomBorder(maxLength));
};

console.log(boxIt(process.argv.slice(2)));


// console.log(drawLine(10));
// console.log(drawTopBorder(-1));
// console.log(drawTopBorder(3));
// console.log(drawBottomBorder(-1));
// console.log(drawBottomBorder(3));
// console.log(drawMiddleBorder(-1));
// console.log(drawMiddleBorder(3));
// console.log(drawBarsAround("My name is Dan"));
// console.log(drawBarsAround("You are Jane  "));
// console.log(drawBarsAround("  You are Bill"));
// console.log(boxIt(['Jon Snow', 'Cersei Lannister']));
// console.log(boxIt(['', 'Cersei Lannister']));
// console.log(boxIt([' ']));