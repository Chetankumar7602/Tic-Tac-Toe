let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let xScoreDisplay = document.querySelector("#x-score");
let oScoreDisplay = document.querySelector("#o-score");

let turnO = true;
let xScore = 0;
let oScore = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            alert(`${pos1Val} wins!`);
            updateScore(pos1Val);
            disableAllBoxes();
            return;
        }
    }

    if ([...boxes].every(box => box.innerText !== "")) {
        alert("It's a draw!");
    }
};

const updateScore = (winner) => {
    if (winner === "X") {
        xScore++;
        xScoreDisplay.innerText = xScore;
    } else {
        oScore++;
        oScoreDisplay.innerText = oScore;
    }
};

const disableAllBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

const resetGame = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
    turnO = true;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turnO) {
                box.innerText = "O";
                turnO = false;
            } else {
                box.innerText = "X";
                turnO = true;
            }
            box.disabled = true;
            checkWinner();
        }
    });
});

reset.addEventListener("click", resetGame);
