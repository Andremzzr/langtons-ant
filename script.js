/**
 * Rules:
 * white cell == 1
 * 
 * black dell == 0
 * 
 * if ant is (A) move to a white cell turn right and make cell black
 * if ant is on black cell, turn left and flip cell to white
 */

const WHITE = 1;
const BLACK = 0;

class Ant {

    directions = ['N', 'S', 'W', 'E']
    head = undefined;
    row = undefined;
    col = undefined;
    
    constructor(head) {
        if (! this.directions.includes(head)) {
            throw new Error("head direction doenst exists");
        }
        this.head = head;
    }

    turnLeft() {
        switch (this.head) {
            case 'N':
                this.head = 'W'
                break;
            case 'W':
                this.head = 'S'
                break;
            case 'S':
                this.head = 'E'
                break;
            case 'E':
                this.head = 'N'
                break;
            default:
                break;
        }
    }
    
    turnRight() {
        switch (this.head) {
            case 'N':
                this.head = 'E'
                break;
            case 'E':
                this.head = 'S'
                break;
            case 'S':
                this.head = 'W'
                break;
            case 'W':
                this.head = 'N'
                break;
            default:
                break;
        }
    }

    // [0, 0, 0]
    // [0, 0, 0]
    moveFoward() {
        switch (this.head) {
            case 'N':
                this.row-=1;
                break;
            case 'E':
                this.col+=1;
                break;
            case 'S':
                this.row+=1;
                break;
            case 'W':
                this.col-=1;
                break;
            default:
                break;
        }
    }

    setPosition(row, col) {
        this.row = row;
        this.col = col;
    }
}

class Grid {
    grid = []
    ant = []

    constructor(rows, cols) {
        this.grid = this.createGrid(rows, cols)
    }

    createGrid(rows, cols) {
        let grid = []
        for (let i = 0; i < rows; i++) {
            grid.push(Array(cols).fill(BLACK))        
        }
        return grid
    }

    display() {
        return this.grid
    }

    setBlack(row, col) {
        this.grid[row][col] = BLACK;
    }

    setWhite(row, col) {
        this.grid[row][col] = WHITE;
    }

    getCell(row, col) {
        return this.grid[row][col]
    }
}

const cols = 10
const rows = 10

const grid = new Grid(cols, rows)
const ant = new Ant('N');

ant.setPosition(Math.floor(rows / 2), Math.floor(cols / 2))

setInterval(() => {
    if ( ! grid.getCell(ant.row, ant.col)) {
        //BLACK CELL
        grid.setWhite(ant.row, ant.col)
        ant.turnLeft();
    } else {
        //WHITE CELL
        grid.setBlack(ant.row, ant.col)
        ant.turnRight();
    }
    ant.moveFoward();
    console.table(grid.display())
}, 2000)
