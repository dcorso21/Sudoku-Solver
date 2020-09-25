
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
            // [xz, yz, nz] = [Number(sq.id[1]), Number(sq.id[4]), Number(e.target[0].value)]
            if (s.possible(xz, yz, nz, entryGrid) || nz === 0) {
                nz = (nz === 0) ? " " : nz;
                p.textContent = nz;
            } else {
                alert("Entry is not valid")
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
            if (sq.contains(p)) {
                return;
            }
            e.preventDefault();
            let [xz, yz, nz] = [Number(sq.id[1]), Number(sq.id[4]), Number(e.target[0].value)]
            setValue(xz, yz, nz);
            sq.appendChild(p);
            sq.removeChild(f);
            updated = true;
            solveCurrent()
        });

        f.addEventListener("focusout", (e) => {
            if (sq.contains(p)) { return; }
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
        cl = oddSquare(x, y) ? cl + " emphasis" : cl;
        sq.setAttribute("class", cl);
        p = document.createElement("p");
        p.textContent = solvedGrid[y][x];
        sq.appendChild(p);
        return sq;
    }

    displaySolution(sudoku) {
        removeAllChildNodes(sudoku);
        for (let row = 0; row < solvedGrid.length; row++) {
            for (let col = 0; col < 9; col++) {
                sudoku.appendChild(this.square(col, row));
            }
        }
        return sudoku;
    }

    possible(x, y, n, grid) {
        if (grid[y].includes(n)) {
            return false;
        }
        for (let i = 0; i < 9; i++) {
            if (grid[i][x] === n) {
                return false;
            }
        }
        let x0 = Math.floor(x / 3) * 3,
            y0 = Math.floor(y / 3) * 3;

        let sq = grid[y0].slice(x0, x0 + 3);
        sq = sq.concat(grid[y0 + 1].slice(x0, x0 + 3));
        sq = sq.concat(grid[y0 + 2].slice(x0, x0 + 3));
        // console.log(sq);
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
                    if (this.possible(x, y, n, solvedGrid)) {
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