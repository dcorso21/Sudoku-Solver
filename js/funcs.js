
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function oddSquare(x, y) {
    let topBottom = [0, 1, 2, 6, 7, 8]
    let middle = [3, 4, 5]
    if (topBottom.includes(x) && topBottom.includes(y)) {
        return true
    }
    if (middle.includes(x) && middle.includes(y)) {
        return true
    }
    return false
}

function copyGrid(grid) {
    let newGrid = [];
    for (let y = 0; y < grid.length; y++) {
        newGrid.push(grid[y].slice())
    }
    return newGrid
}

function solveCurrent() {
    sdku.pullEntryGrid(sudoku1)
    solvedGrid = copyGrid(entryGrid)
    s.solve();
    s.displaySolution(sudoku2);
}