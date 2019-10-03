class Turtle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = {0: [+1, 0], 1: [0, +1], 2: [-1, 0], 3: [0, -1]};
        this.direction = 0;
        this.pointsVisited = [];
        this.pointsVisited.push([x, y]);
    };
    forward(n) {
        for (let i = 0; i < n; i++) {
            this.pointsVisited.push(
            [this.x+=this.directions[this.direction][0], this.y+=this.directions[this.direction][1]]);
        };
        return this;
    };
    right() {
        this.direction = (this.direction+1) % 4;
        return this;
    };
    left() {
        this.direction = (this.direction == 0 ? 3 : this.direction-1) % 4;
        return this;
    };
    allPoints() {
        return this.pointsVisited;
    };
    print() {
        let lowestX = this.pointsVisited.map(el => el).reduce(((min,cur) => Math.min(min, cur[0])), 0);
        let lowestY = this.pointsVisited.map(el => el).reduce(((min,cur) => Math.min(min, cur[1])), 0);
        let highestX = this.pointsVisited.map(el => el).reduce(((max,cur) => Math.max(max, cur[0])), 0);
        let highestY = this.pointsVisited.map(el => el).reduce(((max,cur) => Math.max(max, cur[1])), 0);
        for (let y = lowestY, row = ''; y <= highestY; y++, row='') {
            for (let x = lowestX, status = ' '; x <= highestX; x++, status=' ') {
                this.pointsVisited.forEach(point => {
                    if (point[0] == x && point[1] == y) status = '+';
                });
                row += status;
            };
            console.log(row);
        };
    };
    print(outputFilename) {
        let fs = require('fs');
        let data = '';
        let lowestX = this.pointsVisited.map(el => el).reduce(((min,cur) => Math.min(min, cur[0])), 0);
        let lowestY = this.pointsVisited.map(el => el).reduce(((min,cur) => Math.min(min, cur[1])), 0);
        let highestX = this.pointsVisited.map(el => el).reduce(((max,cur) => Math.max(max, cur[0])), 0);
        let highestY = this.pointsVisited.map(el => el).reduce(((max,cur) => Math.max(max, cur[1])), 0);
        for (let y = lowestY, row = ''; y <= highestY; y++, row='') {
            for (let x = lowestX, status = ' '; x <= highestX; x++, status=' ') {
                this.pointsVisited.forEach(point => {
                    if (point[0] == x && point[1] == y) status = '+';
                });
                row += status;
            };
            data += (row+'\n');
        };
        fs.writeFile(outputFilename, data, (err) => {
            if (err) throw err;
            console.log(`Drawing written to ${outputFilename}`);
        });
    };
};

function processTurtleCmds (cmds, turtle) {
    cmds.forEach(cmd => {
        if (!cmd.startsWith('f') && !cmd.startsWith('r') && !cmd.startsWith('l')) {
            console.log(`Skipping unrecognized cmd \'${cmd}\'.`);
        } else {
            if (cmd.startsWith('f')) {
                turtle.forward(parseInt(cmd.slice(1)));
            } else if (cmd.startsWith('r')) {
                turtle.right();
            } else {
                turtle.left();
            };
        };
    });
};

if (process.argv.length < 5) {
    let cmds = [], inputs = process.argv.slice(2);
    let flash, outputFilename = '';
    if (inputs.length == 2 && inputs[0].startsWith('--output=')) {
        outputFilename = inputs.shift().slice(9);
    };
    cmds = inputs.shift().split('-');
    if (cmds.length == 0) {
        flash = new Turtle(0, 0);
    } else if (!cmds[0].startsWith('t')) {
        flash = new Turtle(0, 0);
    } else {
        let cmd = cmds.shift();
        point = cmd.slice(1).split(',');
        if (point.length != 2 || !parseInt(point[0]) || !parseInt(point[1])) {
            console.log('Please provide commands in required format.');
            return;
        } else {
            flash = new Turtle(parseInt(point[0]), parseInt(point[1]));
        };
    };
    processTurtleCmds(cmds, flash);
    if (outputFilename == '') {
        flash.print()
    } else {
        flash.print(outputFilename);
    };
};
