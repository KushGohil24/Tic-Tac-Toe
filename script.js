let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let clickNum = 0;
let turnO = true;
let isWinner = false;
const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}
const disableBoxes = () => {
    for (const box of boxes) {
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for (const box of boxes) {
        box.disabled = false;
        box.innerText = "";  
    }
}
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        clickNum++;
        console.log("box was clicked");
        if (turnO) {
            box.classList.remove("box1")
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.classList.add("box1")
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        // checkdraw();
        checkWinner();
    })
});
const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkWinner = () => {
    for (const pattern of winPattern) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                isWinner = true;
                console.log("winner",pos1val);
                showWinner(pos1val);
            }
        }
    }
    if (clickNum === 9 && isWinner === false) {
        msg.innerText = `Better luck next time ! Match is draw`;
        msgContainer.classList.remove("hide");
        disableBoxes();   
    }
}
// const checkdraw = () => {
//     if (clickNum === 9) {
//         msg.innerText = `Better luck next time ! Match is draw`;
//         msgContainer.classList.remove("hide");
//         disableBoxes();
//     }
// }
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);