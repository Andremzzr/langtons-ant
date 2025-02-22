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
    moveFoward(rows, cols) {
        switch (this.head) {
            case 'N':
                this.row = (this.row - 1 + rows) % rows;
                break;
            case 'E':
                this.col = (this.col + 1) % cols;
                break;
            case 'S':
                this.row = (this.row + 1) % rows;
                break;
            case 'W':
                this.col = (this.col - 1 + cols) % cols;
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
}



const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d');
const cellSize = 15;



const cols = Math.floor(canvas.width / cellSize)
const rows = Math.floor(canvas.height / cellSize)

console.log(cols, rows)
const grid = new Grid(cols, rows)
const ant = new Ant('N');


ant.setPosition(Math.floor(rows / 2), Math.floor(cols / 2))

function fillCell(color, i, j) {
    ctx.fillStyle = color;
    ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
}

function drawGrid(grid) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j]) {
                fillCell('white', i ,j)
            } else {
                fillCell('black', i ,j)
            }

            ctx.strokeStyle = 'gray';
            ctx.lineWidth = 0.5;
            ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
    }
}
setInterval(() => {
    drawGrid(grid.display())
    if ( !grid.display()[ant.row][ant.col]) {
        //BLACK CELL
        grid.setWhite(ant.row, ant.col)
        ant.turnLeft();
    } else {
        //WHITE CELL
        grid.setBlack(ant.row, ant.col)
        ant.turnRight();
    }
    ant.moveFoward(rows, cols);
}, 10)
