var sudoku1 = document.querySelector(".sudoku1");
var sudoku2 = document.querySelector(".sudoku2");
var updated = true;

class sudoku {
    constructor() {
        this.description = "Functions for creating an interactive sudoku";
    }

    square(x, y) {
        //Mode 1 => Div
        let sq, p, f, i;
        sq = document.createElement("div");
        sq.setAttribute("id", `(${x}, ${y})`);
        sq.setAttribute("class", "square");
        p = document.createElement("p");
        p.textContent = " ";
        sq.appendChild(p);
        f = document.createElement("form");
        i = document.createElement("input");
        i.setAttribute("type", "text");
        i.setAttribute("placeholder", "1-9");
        f.appendChild(i);

        sq.addEventListener("click", () => {
            if (!sq.contains(p)) {
                return;
            }
            updated = false;
            let value;
            console.log(p);
            value = p.textcontent == undefined ? " " : p.textContent;
            sq.removeChild(p);
            i.setAttribute("value", value);
            sq.appendChild(f);
            i.focus();
        });
        f.addEventListener("submit", (e) => {
            e.preventDefault();
            p.textContent = `${e.target[0].value}`;
            sq.appendChild(p);
            sq.removeChild(f);
            updated = true;
        });
        f.addEventListener("focusout", () => {
            if (sq.contains(p)) {
                return;
            }
            sq.appendChild(p);
            sq.removeChild(f);
            updated = true;
        });
        return sq;
    }

    makeSquares(sudoku) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                sudoku.appendChild(this.square(col, row));
            }
        }
        return sudoku;
    }
}

class solver {
    constructor() {
        this.grid = [];
    }

    square(x, y) {
        let sq, p, f, i;
        sq = document.createElement("div");
        sq.setAttribute("id", `s(${x}, ${y})`);
        sq.setAttribute("class", "square");
        p = document.createElement("p");
        p.textContent = this.grid[x][y];
        sq.appendChild(p);
        return sq;
    }

    makeSolution(sudoku) {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < 9; col++) {
                sudoku.appendChild(this.square(col, row));
            }
        }
        return sudoku;
    }

    createGrid(sudoku) {
        this.grid = [];
        let row = [];
        let squares = sudoku.getElementsByClassName("square");
        for (let i = 0; i < squares.length; i++) {
            let n = squares[i].getElementsByTagName("p")[0].textContent;
            row.push(n);
            if (row.length === 9) {
                this.grid.push(row);
                row = [];
            }
        }
    }
    possible(x, y, n) {
        // return true
        for (let i = 0; i < 9; i++) {
            // Check for same value in row
            if (this.grid[y][i] === n) {
                return false;
                // Check for same value in Column
            } else if (this.grid[i][x] === n) {
                return false;
            }
        }
        // return true
        let x_sq_origin, y_sq_origin; // This checks for the same value in the square
        x_sq_origin = Math.floor(x / 3) * 3;
        y_sq_origin = Math.floor(y / 3) * 3;
        for (let i = 0; i > 3; i++) {
            for (let j = 0; i > 3; i++) {
                if (grid[x_sq_origin + i][y_sq_origin + j] === n) {
                    return false;
                }
            }
        }
        return true;
    }

    ssolve() {
        console.log('here');
        let AcceptableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (!AcceptableNumbers.includes(this.grid[x][y])) {
                    for (let n = 1; n < 10; n++) {
                        if (this.possible(x, y, n)) {
                            this.grid[x][y] = n;
                            this.ssolve();
                            this.grid[x][y] = " ";
                        }
                    }
                    return;
                }
            }
        }
    }
}

const sdku = new sudoku();
sudoku1 = sdku.makeSquares(sudoku1);

const s = new solver();
s.createGrid(sudoku1);
// s.ssolve();
// console.log(s.grid);

// s.makeSolution(sudoku2);
