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
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                alert(`${pos1Val} wins!`);
                updateScore(pos1Val);
                drawLine(pattern);
                disableAllBoxes();
                return;
            }
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

const drawLine = (pattern) => {
    const box1 = boxes[pattern[0]];
    const box2 = boxes[pattern[2]];
    const line = document.createElement("div");
    line.classList.add("line");

    const rect1 = box1.getBoundingClientRect();
    const rect2 = box2.getBoundingClientRect();

    line.style.left = `${(rect1.left + rect1.right) / 2}px`;
    line.style.top = `${(rect1.top + rect1.bottom) / 2}px`;
    line.style.width = `${Math.hypot(rect2.left - rect1.left, rect2.top - rect1.top)}px`;
    line.style.transform = `rotate(${Math.atan2(rect2.top - rect1.top, rect2.left - rect1.left) * 180 / Math.PI}deg)`;

    document.querySelector(".game").appendChild(line);
};

const resetGame = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
    turnO = true;
    const line = document.querySelector(".line");
    if (line) {
        line.remove();
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

reset.addEventListener("click", resetGame);
