var sudoku1 = document.querySelector(".sudoku1")
class sudoku{
    constructor(){
        this.description = "Functions for creating an interactive sudoku"
    }

    square(x, y){
        //Mode 1 => Div
        let sq, p, f, i;
        sq = document.createElement("div")
        sq.setAttribute("id", `(${x}, ${y})`)
        sq.setAttribute("class", "square")
        p = document.createElement("p")
        p.textContent = " "
        sq.appendChild(p)
        f = document.createElement("form")
        i = document.createElement("input")
        i.setAttribute("type", "text"); 
        i.setAttribute("placeholder", "1-9");
        f.appendChild(i)

        sq.addEventListener("click", ()=>{
            if (!sq.contains(p)){return};
            let value;
            console.log(p);
            value = p.textcontent == undefined? " ": p.textContent;
            sq.removeChild(p)
            i.setAttribute("value", value)
            sq.appendChild(f)
            i.focus()
        })
        f.addEventListener("submit", (e)=>{
            e.preventDefault()
            p.textContent = `${e.target[0].value}`;
            sq.appendChild(p);
            sq.removeChild(f);
        })
        return sq
    }

    makeSquares(sudoku){
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                sudoku.appendChild(this.square(col, row))
                
            }
        }
        return sudoku
    }

}


const sdku = new sudoku;
sudoku1 = sdku.makeSquares(sudoku1)
// var d = document.createElement("div")
// d.setAttribute("class", "square")

// var s = document.createElement("p")
// s.textContent = "1"
// d.appendChild(s)
// var form = document.createElement("form")
// var input = document.createElement("input")
// input.setAttribute("type", "text"); 
// input.setAttribute("placeholder", "Text");
// form.setAttribute("method", "post"); 
// form.appendChild(input)


// sudoku1.appendChild(s)

// s.addEventListener("click", ()=>{
//     // sudoku1.removeChild(s)
//     sudoku1.appendChild(form)
//     document.querySelector("input").focus()
// })

// form.addEventListener("submit", (e)=>{
//     e.preventDefault()
//     s.textContent = `${e.target[0].value}`;
//     sudoku1.appendChild(s);
//     sudoku1.removeChild(form);
// })





