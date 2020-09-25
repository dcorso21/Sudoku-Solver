var sudoku1 = document.querySelector(".sudoku1");
var sudoku2 = document.querySelector(".sudoku2");
var menu = document.querySelector(".menu");
var updated = true;
var hideSolution = true;
var solvedGrid = [];
var entryGrid = [[], [], [], [], [], [], [], [], []];

/**
 *  This will remove all elements in a certain html element
 * @param {document.element} parent 
 */
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/**
 * Decides if a square should be emphasised
 * @param {Number} x 
 * @param {Number} y 
 */
function oddSquare(x, y) {
    let topBottom = [0, 1, 2, 6, 7, 8];
    let middle = [3, 4, 5];
    if (topBottom.includes(x) && topBottom.includes(y)) {
        return true;
    }
    if (middle.includes(x) && middle.includes(y)) {
        return true;
    }
    return false;
}

/**
 * Copies 2d Array to new variable, which is returned
 * @param {document.Sudoku} grid 
 */
function copyGrid(grid) {
    let newGrid = [];
    for (let y = 0; y < grid.length; y++) {
        newGrid.push(grid[y].slice());
    }
    return newGrid;
}

/**
 * Solves the entry sudoku
 */
function solveCurrent() {
    ENTRY.pullEntryGrid(sudoku1);
    solvedGrid = copyGrid(entryGrid);
    SOLVER.solve();
    if (!hideSolution){
        SOLVER.displaySolution(sudoku2);
    }
}

/**
 * Class for funcs in entry grid
 */
class Entry {
    constructor() {
        this.description = "Functions for creating an interactive sudoku";
    }

    /**
     * Create a reactive square for the sudoku1
     * @param {Number} x 
     * @param {Number} y 
     */
    square(x, y) {
        //Mode 1 => Div
        let sq, p, f, i;
        sq = document.createElement("div");
        sq.setAttribute("id", `(${x}, ${y})`);
        let cl = "square";
        cl = oddSquare(x, y) ? cl + " emphasis" : cl;
        sq.setAttribute("class", cl);
        p = document.createElement("p");
        p.textContent = " ";
        sq.appendChild(p);
        f = document.createElement("form");
        i = document.createElement("input");
        i.setAttribute("type", "text");
        i.setAttribute("placeholder", "1-9");
        f.appendChild(i);

        function setValue(xz, yz, nz) {
            // console.log(s.possible(xz, yz, nz));
            // console.log(s.possible(entryGrid));
            // if (entryGrid == undefined){return}
            if (SOLVER.possible(xz, yz, nz, entryGrid) || nz === 0) {
                nz = nz === 0 ? " " : nz;
                p.textContent = nz;
            } else {
                alert("Entry is not valid");
            }
        }

        sq.addEventListener("click", () => {
            if (!sq.contains(p)) {
                return;
            }
            updated = false;
            let value;
            value = p.textcontent == undefined ? " " : p.textContent;
            sq.removeChild(p);
            i.setAttribute("value", value);
            sq.appendChild(f);
            i.focus();
        });

        f.addEventListener("submit", (e) => {
            console.log("submit");
            if (sq.contains(p)) {
                return;
            }
            e.preventDefault();
            let [xz, yz, nz] = [
                Number(sq.id[1]),
                Number(sq.id[4]),
                Number(e.target[0].value),
            ];
            setValue(xz, yz, nz);
            sq.appendChild(p);
            sq.removeChild(f);
            updated = true;
            solveCurrent();
        });

        f.addEventListener("focusout", (e) => {
            console.log("focusOut");
            if (sq.contains(p)) {
                return;
            }
            let val = Number(e.target.value);
            console.log(val, entryGrid);
            let [xz, yz] = [Number(sq.id[1]), Number(sq.id[4])];
            // console.log(xz, yz);
            // console.log(entryGrid);
            setValue(xz, yz, val);
            sq.appendChild(p);
            sq.removeChild(f);
            updated = true;
            solveCurrent();
        });
        return sq;
    }

    /**
     * Create all squares in sudoku
     * @param {element} sudoku 
     */
    makeSquares(sudoku) {
        removeAllChildNodes(sudoku);
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                sudoku.appendChild(this.square(col, row));
            }
        }
        return sudoku;
    }

    
    /**
     * Pulls the values from the entries and creates 2d Array EntryGrid
     * @param {element} sudoku 
     */
    pullEntryGrid(sudoku) {
        entryGrid = [];
        let row = [];
        let squares = sudoku.getElementsByClassName("square");
        for (let i = 0; i < squares.length; i++) {
            let n = squares[i].getElementsByTagName("p")[0].textContent;
            n = Number(n);
            if (![1, 2, 3, 4, 5, 6, 7, 8, 9].includes(n)) {
                n = 0;
            }
            n = Number(n);
            row.push(n);
            if (row.length === 9) {
                entryGrid.push(row);
                row = [];
            }
        }
    }
}

/**
 * Class for funcs in solver grid
 */
class Solver {
    constructor() {
        // this.grid = [];
        this.solved = [];
    }

    /**
     * Create one square for solution
     * @param {Number} x 
     * @param {Number} y 
     */
    square(x, y) {
        let sq, p, f, i;
        sq = document.createElement("div");
        sq.setAttribute("id", `s(${x}, ${y})`);
        let cl = "square";
        cl = oddSquare(x, y) ? cl + " emphasis" : cl;
        sq.setAttribute("class", cl);
        p = document.createElement("p");
        p.textContent = solvedGrid[y][x];
        sq.appendChild(p);
        return sq;
    }

    /**
doc.sudoku     * Puts grid elements into sudoku2 div
     * @param {element} sudoku 
     */
    displaySolution(sudoku) {
        removeAllChildNodes(sudoku);
        for (let row = 0; row < solvedGrid.length; row++) {
            for (let col = 0; col < 9; col++) {
                sudoku.appendChild(this.square(col, row));
            }
        }
        return sudoku;
    }

    /**
     * Check if position is possible for solution
     * I found this video with a similar solution to solving sudokus! 
     * https://www.youtube.com/watch?v=G_UYXzGuqvM
     * Most of my code clearly resembles his, but I did refactor quite a bit 
     * I've written comments to prove comprehension
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} n value at x,y
     * @param {Array} grid 
     */
    possible(x, y, n, grid) {
        if (grid.length === 0) {
            return false;
        }
        if (grid[y].includes(n)) { // If n not in row
            return false;
        }
        for (let i = 0; i < 9; i++) {
            if (grid[i][x] === n) { //If n not in col
                return false;
            }
        }
        let x0 = Math.floor(x / 3) * 3, // To check for square,
            y0 = Math.floor(y / 3) * 3; // find top-left square element

        let sq = grid[y0].slice(x0, x0 + 3); // Makes a list of all vals in square
        sq = sq.concat(grid[y0 + 1].slice(x0, x0 + 3));
        sq = sq.concat(grid[y0 + 2].slice(x0, x0 + 3));
        // console.log(sq);
        if (sq.includes(n)) { // check for square 
            return false;
        }
        return true; // If Possible
    }

    /**
     * Solves sudoku recursively
     * I found this video with a similar solution to solving sudokus! 
     * https://www.youtube.com/watch?v=G_UYXzGuqvM
     * Most of my code clearly resembles his, but I did refactor quite a bit 
     */
    solve() {
        for (let y = 0; y < 9; y++) {                         // for each row
            if (solvedGrid[y].includes(0)) {                  // if row includes empty space
                let x = solvedGrid[y].indexOf(0);             // get position of 0 in grid
                for (let n = 1; n < 10; n++) {                // for each num (1-9)
                    if (this.possible(x, y, n, solvedGrid)) { // Check if possible to place n
                        solvedGrid[y][x] = n;                 // if so, then set it's value
                        if (this.solve() != false) {          // Continue solving
                            return solvedGrid;                // if not false, grid is solved
                        }                                     
                        solvedGrid[y][x] = 0;                 // if false returns, then reset this x,y
                    }
                }
                return false;                                 // if no numbers work, go back and reset numbers
            }
        }
        return solvedGrid;                                    // If no empty places, grid is solved!
    }
}

const ENTRY = new Entry();
const SOLVER = new Solver();
sudoku1 = ENTRY.makeSquares(sudoku1);
ENTRY.pullEntryGrid(sudoku1);
solveCurrent()

var menu = document.querySelector(".menu");
var help = document.querySelector(".help");
var reset = document.querySelector(".reset");
var hide = document.querySelector(".hide");
var backbtn = document.querySelector(".backbtn");

help.addEventListener("click", () => {
    menu.classList.toggle("animate");
});
backbtn.addEventListener("click", () => {
    menu.classList.toggle("animate");
});

reset.addEventListener("click", () => {
    sudoku1 = ENTRY.makeSquares(sudoku1)
})

hide.addEventListener("click", () =>{
    if (hideSolution){
        SOLVER.displaySolution(sudoku2);
        hide.textContent = "Hide"
        hideSolution = false;
        return
    }
    removeAllChildNodes(sudoku2);
    hide.textContent = "Show"
    hideSolution = true;
})