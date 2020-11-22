const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const rockValue = "✊";
const paperValue = "📄";
const scissorsValue = "✂";

const overlay = document.getElementById("overlay");
const bestOf3 = document.getElementById("bo3");
const bestOf5 = document.getElementById("bo5");
const playAgain = document.getElementById("play-again");

const resultPage = document.getElementById("result-page");
const playerScoreCircle = document.querySelectorAll("#player-points .score_circle");
const computerScoreCircle = document.querySelectorAll("#computer-points .score_circle");

let roundNumber = document.getElementById("round-number");
let roundResult = document.getElementById("round-result");
let playerSelection = document.querySelector("#player-select p");
let computerSelection = document.querySelector("#computer-select p");
let numberOfRound = 1;
let moveRightPlayer = 0;
let moveRightComputer = 0;

let endMessage = document.getElementById("end-message");

function updatePlayerView(e) {
    if (e.target === rock) {
        playerSelection.innerHTML = rockValue;
        if(playerScoreCircle[2].style.display != "none") {
            gameLogic5();
        } else {
            gameLogic3();
        }
    } else if (e.target === paper) {
        playerSelection.innerHTML = paperValue;
        if(playerScoreCircle[2].style.display != "none") {
            gameLogic5();
        } else {
            gameLogic3();
        }
    } else {
        playerSelection.innerHTML = scissorsValue;
        if(playerScoreCircle[2].style.display != "none") {
            gameLogic5();
        } else {
            gameLogic3();
        }
    }

    numberOfRound++;
    roundNumber.innerHTML = `Round ${numberOfRound}`
}

function playerMove() {
    let playerSelect = playerSelection.innerHTML;
    return playerSelect;
}

function computerMove() {
    const options = [rockValue, paperValue, scissorsValue];
    let computerSelect = options[Math.floor(Math.random()*options.length)];
    computerSelection.innerHTML = computerSelect;
    return computerSelect;
}

function gameLogic3() {
    let playerPlay = playerMove();
    let computerPlay = computerMove();

    switch(true) {
        case playerPlay == computerPlay:
            roundResult.innerHTML = "It's a tie!"
            break;
        case playerPlay == rockValue && computerPlay == scissorsValue:  
        case playerPlay == paperValue && computerPlay == rockValue:  
        case playerPlay == scissorsValue && computerPlay == paperValue:
            roundResult.innerHTML = "You win this round!"
            playerScoreCircle[moveRightPlayer].classList.toggle("player-point")
            moveRightPlayer++;
            break;
        default: 
        roundResult.innerHTML = "You lost this round!"
        computerScoreCircle[moveRightComputer].classList.toggle("computer-point")
        moveRightComputer++;
        break;
    }

    if (moveRightPlayer == 2) {
        resultPage.style.display = "flex";
        resultPage.style.backgroundColor = "var(--win)";
        endMessage.innerHTML = `${moveRightPlayer} - ${moveRightComputer} for you in ${numberOfRound} rounds! You win!`
    } else if (moveRightComputer == 2) {
        resultPage.style.display = "flex";
        resultPage.style.backgroundColor = "var(--danger)";
        endMessage.innerHTML = `${moveRightPlayer} - ${moveRightComputer} for opponent in ${numberOfRound} rounds! You lost!`
    }
}

function startGame() {
    overlay.style.display = "none";
}

function restartGame() {
    resultPage.style.display = "none";
}

rock.addEventListener("click", updatePlayerView)
paper.addEventListener("click", updatePlayerView)
scissors.addEventListener("click", updatePlayerView)

bestOf3.addEventListener("click", startGame);
bestOf5.addEventListener("click", startGame);
playAgain.addEventListener("click", restartGame);
