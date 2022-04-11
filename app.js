const p1 = {
    display: document.querySelector('#p1Display'),
    button: document.querySelector('#p1btn'),
    score: 0
}

const p2 = {
    display: document.querySelector('#p2Display'),
    button: document.querySelector('#p2btn'),
    score: 0
}

let winningScore = 6;
let isGameOver = false;
let newOption = 0;

const playto = document.querySelector('#playto');
playto.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();
})

p1.button.addEventListener('click', () => {
    updateScore(p1, p2);
    scoreResize(p1, p2);
})

p2.button.addEventListener('click', () => {
    updateScore(p2, p1);
    scoreResize(p1, p2);
})

const resetbtn = document.querySelector('#reset');
resetbtn.addEventListener('click', () => {
    reset();
    playto.value = 6;
    winningScore = 6;
})

function reset() {
    isGameOver = false;
    for (let player of [p1, p2]) {
        player.score = 0;
        player.display.textContent = 0;
        player.display.classList.remove('has-text-success', 'has-text-danger');
        player.button.disabled = false;
    }
    //removing the option that is and will be at index number 3
    for (let i = 3; i < playto.length; i = 3) {
        playto.remove(i);
    }
    playto.classList.remove("overtime", "bold");
    p1.display.classList.remove('is-size-1-tablet', 'has-text-weight-bold');
    p2.display.classList.remove('is-size-1-tablet', 'has-text-weight-bold');
    confetti.remove();

}

function updateScore(player, opponent) {
    if (!isGameOver) {
        player.score++;
        if (player.score === winningScore) {
            if (player.score >= opponent.score + 2) {
                isGameOver = true;
                player.display.classList.add('has-text-success');
                opponent.display.classList.add('has-text-danger');
                player.button.disabled = true;
                opponent.button.disabled = true;
                confetti.start(1200, 50, 150);
            }
        } else if (player.score === winningScore - 1 && opponent.score === winningScore - 1) {
            winningScore++;
            //adding new winning score option to the select
            newOption = document.createElement('option')
            newOption.textContent = winningScore;
            newOption.value = winningScore;
            playto.append(newOption);
            playto.value = winningScore;

            playto.classList.add("overtime", "bold")
        }
        player.display.textContent = player.score;
    }
}

function scoreResize(player, opponent) {
    if (player.score > opponent.score) {
        player.display.classList.add('is-size-1-tablet', 'has-text-weight-bold');
        opponent.display.classList.remove('is-size-1-tablet', 'has-text-weight-bold');
    } else if (opponent.score > player.score) {
        opponent.display.classList.add('is-size-1-tablet', 'has-text-weight-bold');
        player.display.classList.remove('is-size-1-tablet', 'has-text-weight-bold');
    } else {
        player.display.classList.remove('is-size-1-tablet', 'has-text-weight-bold');
        opponent.display.classList.remove('is-size-1-tablet', 'has-text-weight-bold');
    }
}