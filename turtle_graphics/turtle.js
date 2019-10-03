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
            for (let x = lowestX, status = '='; x <= highestX; x++, status='=') {
                this.pointsVisited.forEach(point => {
                    if (point[0] == x && point[1] == y) status = '+';
                });
                row += status;
            };
            console.log(row);
        };
    };
};
new Turtle(0, 4)
.forward(3)
.left()
.forward(3)
.right()
.forward(5)
.right()
.forward(8)
.right()
.forward(5)
.right()
.forward(3)
.left()
.forward(3)
.print();