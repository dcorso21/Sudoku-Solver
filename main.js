var sudoku1 = document.querySelector(".sudoku1");
var sudoku2 = document.querySelector(".sudoku2");
var updated = true;
var solvedGrid = [];
var entryGrid = [];



//  Found https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function oddSquare(x,y) {
    let topBottom = [0,1,2,6,7,8]
    let middle = [3,4,5]
    if (topBottom.includes(x) && topBottom.includes(y)){
        return true
    }
    if (middle.includes(x) && middle.includes(y)){
        return true
    }
    return false
}

class sudoku {
    constructor() {
        this.description = "Functions for creating an interactive sudoku";
    }

    square(x, y) {
        //Mode 1 => Div
        let sq, p, f, i;
        sq = document.createElement("div");
        sq.setAttribute("id", `(${x}, ${y})`);
        let cl = "square";
        cl = oddSquare(x, y) ? cl + " emphasis": cl;
        sq.setAttribute("class", cl);
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
            value = p.textcontent == undefined ? " " : p.textContent;
            sq.removeChild(p);
            i.setAttribute("value", value);
            sq.appendChild(f);
            i.focus();
        });

        f.addEventListener("submit", (e) => {
            if (sq.contains(p)) {
                return;
            }
            e.preventDefault();
            if (console.log(s.possible(Number(sq.id[1]), Number(sq.id[4]), Number(e.target[0].value)))){
                p.textContent = `${e.target[0].value}`;
            } else {
                alert("Entry is not valid")
            }
            sq.appendChild(p);
            sq.removeChild(f);
            updated = true;
            solveCurrent()
        });
        
        f.addEventListener("focusout", (e) => {
            if (sq.contains(p)){return;}
            let val = e.target.value;
            // if (s.possible(sq.id[1], sq.id[4], e.target[0].value)){
            //     p.textContent = `${e.target[0].value}`;
            // } else {
            //     alert("Entry is not valid")
            // }
            p.textContent = val;
            sq.appendChild(p);
            sq.removeChild(f);
            updated = true;
            solveCurrent()
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

class solver {
    constructor() {
        // this.grid = [];
        this.solved = [];
    }

    square(x, y) {
        let sq, p, f, i;
        sq = document.createElement("div");
        sq.setAttribute("id", `s(${x}, ${y})`);
        let cl = "square";
        cl = oddSquare(x, y) ? cl + " emphasis": cl;
        sq.setAttribute("class", cl);
        p = document.createElement("p");
        p.textContent = solvedGrid[y][x];
        sq.appendChild(p);
        return sq;
    }

    makeSolution(sudoku) {
        removeAllChildNodes(sudoku);
        for (let row = 0; row < solvedGrid.length; row++) {
            for (let col = 0; col < 9; col++) {
                sudoku.appendChild(this.square(col, row));
            }
        }
        return sudoku;
    }

    possible(x, y, n) {
        if (solvedGrid[y].includes(n)) {
            return false;
        }
        for (let i = 0; i < 9; i++) {
            if (solvedGrid[i][x] === n) {
                return false;
            }
        }
        let x0 = Math.floor(x / 3) * 3,
            y0 = Math.floor(y / 3) * 3;

        let sq = solvedGrid[y0].slice(x0, x0 + 3);
        sq.concat(solvedGrid[y0 + 1].slice(x0, x0 + 3));
        sq.concat(solvedGrid[y0 + 2].slice(x0, x0 + 3));
        if (sq.includes(n)) {
            return false;
        }
        return true;
    }

    solve() {
        for (let y = 0; y < 9; y++) {
            if (solvedGrid[y].includes(0)) {
                let x = solvedGrid[y].indexOf(0);
                for (let n = 1; n < 10; n++) {
                    if (this.possible(x, y, n)) {
                        solvedGrid[y][x] = n;
                        if (this.solve() != false) {
                            return solvedGrid;
                        }
                        solvedGrid[y][x] = 0;
                    }
                }
                return false;
            }
        }
        return solvedGrid;
    }
}

const sdku = new sudoku();
const s = new solver();
sudoku1 = sdku.makeSquares(sudoku1);

function solveCurrent() {
    solvedGrid = [...entryGrid]
    sdku.pullEntryGrid(sudoku1)
    // console.log("unsolved", grid);
    s.solve();
    s.makeSolution(sudoku2);
}
