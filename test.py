import numpy as np

grid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 2, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
]

def findCell(grid, x, y):
    for yp in range(y,9):
        if 0 in grid[yp]:
            return (grid[yp].index(0), yp)




def findNextCellToFill(grid, x, y):
    for xp in range(x, 9):
        for yp in range(y, 9):
            if grid[yp][xp] == 0:
                return xp, yp
    for xp in range(0, x):
        for yp in range(0, y):
            if grid[yp][xp] == 0:
                return xp, yp
    return -1, -1


def isValid(grid, x, y, n):
    # Check if row doesnt have e as value yet
    if n in grid[y]: 
        return False
    if n in [grid[i][x] for i in range(9)]:
        return False

    # finding the top left x,y co-ordinates of the section containing the i,j cell
    firstSquareX = (x//3)*3
    firstSquareY = (y//3)*3

    square = grid[firstSquareY][firstSquareX:firstSquareX+3]
    square.extend(grid[firstSquareY+1][firstSquareX:firstSquareX+3])
    square.extend(grid[firstSquareY+2][firstSquareX:firstSquareX+3])
    if n in square:
        return False
    # print("valid")
    return True


def solveSudoku(grid, x=0, y=0):
    x, y = findNextCellToFill(grid, x, y)
    # print(x, y)
    if x == -1:
        return True
    for n in range(1, 10):
        # print('hello')
        if isValid(grid, x, y, n):
            grid[y][x] = n
            if solveSudoku(grid, x, y) != False:
                return grid
            # Undo the current cell for backtracking
            grid[y][x] = 0
    return False


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
# print(np.matrix(solveSudoku(input)))
