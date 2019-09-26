#! /usr/bin/env node

const drawLine = (length) => {
    const line = "";
    return line.padEnd(length, String.fromCharCode(0x2500));
};

const drawTopBorder = (maxLengths) => {
    let paddedString = "";

    paddedString = String.fromCharCode(0x250C);
    for (let index = 0; index < maxLengths.length; index++) {
        const maxLength = maxLengths[index];
        paddedString = paddedString.concat(drawLine(maxLength));
        if (index != maxLengths.length-1) {
            paddedString = paddedString.concat(String.fromCharCode(0x252C));
        };
    };
    return paddedString.concat(String.fromCharCode(0x2510));
};

const drawBottomBorder = (maxLengths) => {
    let paddedString = "";

    paddedString = String.fromCharCode(0x2514);
    for (let index = 0; index < maxLengths.length; index++) {
        const maxLength = maxLengths[index];
        paddedString = paddedString.concat(drawLine(maxLength));
        if (index != maxLengths.length-1) {
            paddedString = paddedString.concat(String.fromCharCode(0x2534));
        };
    };
    return paddedString.concat(String.fromCharCode(0x2518));
};

const drawMiddleBorder = (maxLengths) => {
    let paddedString = "";

    paddedString = String.fromCharCode(0x251C);
    for (let index = 0; index < maxLengths.length; index++) {
        const maxLength = maxLengths[index];
        paddedString = paddedString.concat(drawLine(maxLength));
        if (index != maxLengths.length-1) {
            paddedString = paddedString.concat(String.fromCharCode(0x253C));
        };
    };
    return paddedString.concat(String.fromCharCode(0x2524));
};

const drawBarsAround = (arrayStrings) => {
    let paddedString = "";

    for (let index = 0; index < arrayStrings.length; index++) {
        const string = arrayStrings[index];
        if (index === 0) {
            paddedString = String.fromCharCode(0x2502).padEnd(string.length+1, string).padEnd(string.length+2, String.fromCharCode(0x2502));
        } else {
            paddedString = paddedString.concat(string.padEnd(string.length+1, String.fromCharCode(0x2502)));
        };
    }
    return paddedString;
};

const boxIt = (arrayStringArrays) => {
    let maxLengths = [];
    let paddedString = "";

    for (let index = 0; index < arrayStringArrays.length; index++) {
        const elementArray = arrayStringArrays[index];
        for (let strIndex = 0; strIndex < elementArray.length; strIndex++) {
            if (arrayStringArrays[0].length < elementArray.length) {
                return 'Please provide a CSV file in the required format.';
            };
            if (index === 0) {
                maxLengths.push(0);
            };
            const element = elementArray[strIndex];
            if (maxLengths[strIndex] < element.length) {
                maxLengths[strIndex] = element.length;
            };
        };
    };

    
    paddedString = drawTopBorder(maxLengths).concat('\n');
    for (let index = 0; index < arrayStringArrays.length; index++) {
        const elementArray = arrayStringArrays[index];
        let tmpArrayStrings = [];
        for (let strIndex = 0; strIndex < elementArray.length; strIndex++) {
            let element = elementArray[strIndex];
            tmpArrayStrings.push(element.padEnd(maxLengths[strIndex]));
        };
        paddedString = paddedString.concat(drawBarsAround(tmpArrayStrings)).concat('\n');
        if (index < arrayStringArrays.length-1) {
            paddedString = paddedString.concat(drawMiddleBorder(maxLengths)).concat('\n');
        };
    };
    return paddedString.concat(drawBottomBorder(maxLengths));
};

if (process.argv.length === 3 && process.argv[2].endsWith('.csv')) {
    let fs = require('fs');
    let readline = require('readline');
    let stream = require('stream');

    let instream = fs.createReadStream(process.argv[2]);
    let outstream = new stream;
    let rl = readline.createInterface(instream, outstream);

    let arr = [];

    rl.on('line', function(line) {
        arr.push(line.split(','));
    });

    rl.on('close', function() {
        console.log(boxIt(arr));
    });
} else {
    console.log('Please provide a CSV file in the required format.');
};