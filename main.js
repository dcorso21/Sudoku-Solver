var sudoku1 = document.querySelector(".sudoku1")


class sudoku{
    constructor(){
        this.description = "Functions for creating an interactive sudoku"
    }

    square(x, y){
        //Mode 1 => Div
        let sq = document.createElement("div")
    }

}


var d = document.createElement("div")
d.setAttribute("class", "square")

var s = document.createElement("p")
s.textContent = "1"
d.appendChild(s)
var form = document.createElement("form")
var input = document.createElement("input")
input.setAttribute("type", "text"); 
input.setAttribute("name", "ix"); 

input.setAttribute("placeholder", "Text");
form.setAttribute("method", "post"); 
form.appendChild(input)


sudoku1.appendChild(s)

s.addEventListener("click", ()=>{
    // sudoku1.removeChild(s)
    sudoku1.appendChild(form)
    document.querySelector("input").focus()
})

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    s.textContent = `${e.target[0].value}`;
    sudoku1.appendChild(s);
    sudoku1.removeChild(form);
})





