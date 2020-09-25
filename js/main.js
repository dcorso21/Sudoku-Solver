var sudoku1 = document.querySelector(".sudoku1");
var sudoku2 = document.querySelector(".sudoku2");
var menu = document.querySelector(".menu");
var updated = true;
var solvedGrid = [];
var entryGrid = [];

const sdku = new sudoku();
const s = new solver();
sudoku1 = sdku.makeSquares(sudoku1);
sdku.pullEntryGrid(sudoku1)



var menu = document.querySelector(".menu")
var help = document.querySelector(".btn")
var backbtn = document.querySelector(".backbtn")


help.addEventListener("click", () => {
    menu.classList.toggle("animate")
})

backbtn.addEventListener("click", () =>{
    menu.classList.toggle("animate")
})



