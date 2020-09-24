import numpy as np

grid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
]


# https://stackoverflow.com/questions/1697334/algorithm-for-solving-sudoku


def isValid(grid, x, y, n):
    # Check if row doesnt have e as value yet
    if n in grid[y]:
        return False
    if n in [grid[i][x] for i in range(9)]:
        return False

    sqX = (x//3)*3
    sqY = (y//3)*3

    square = grid[sqY][sqX:sqX+3]
    square.extend(grid[sqY+1][sqX:sqX+3])
    square.extend(grid[sqY+2][sqX:sqX+3])
    if n in square:
        return False
    return True


def solveSudoku(grid):        
    for y in range(9):
        if 0 in grid[y]:
            x = grid[y].index(0)
            for n in range(1, 10):
                if isValid(grid, x, y, n):
                    grid[y][x] = n
                    if solveSudoku(grid) != False:
                        return grid
                    grid[y][x] = 0
            return False
    return grid


input = [
    [5, 1, 7, 6, 0, 0, 0, 3, 4],
    [2, 8, 9, 0, 0, 4, 0, 0, 0],
    [3, 4, 6, 2, 0, 5, 0, 9, 0],
    [6, 0, 2, 0, 0, 0, 0, 1, 0],
    [0, 3, 8, 0, 0, 6, 0, 4, 7],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 9, 0, 0, 0, 0, 0, 7, 8],
    [7, 0, 3, 4, 0, 0, 5, 6, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
]
print(np.matrix(solveSudoku(grid)))
