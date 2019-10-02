class Turtle {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.directions = {'east': [+1, 0], 'south': [0, +1], 'west': [-1, 0], 'north': [0, -1]};
        this.direction = 'east';

        this.pointsVisited = [];
        this.pointsVisited.push([x, y]);
    };


};