// SELECTORS

const wrapper = document.querySelector('[data-set="wrapper"]')
const paper = document.querySelector('[data-game-icon="paper"]')
const scissors = document.querySelector('[data-game-icon="scissors"]')
const rock = document.querySelector('[data-game-icon="rock"]')
let score = document.querySelector('[data-set="score"]')

// rules & reset selectors
const rules = document.querySelector('[data-set="rules"]')
const rulesModule = document.querySelector('[data-set="rules-module"]')
const closeIcon = document.querySelector('[data-set="close"]')
const reset = document.querySelector('.reset-container')

// game selectors
const gameIcons = document.querySelectorAll('.circle')
const gameBox = document.querySelector('.game-box')
const onGameBox = document.querySelector('.ongame-box')
const gameInfoBox = document.querySelector('.game-info-box')
const playerIcon = document.querySelector('.player-icon')
const computerIcon = document.querySelector('.computer-icon')


let scoreCount = localStorage.getItem('scoreCount') ? (JSON.parse(localStorage.getItem('scoreCount'))) : 0;
console.log('scoreCount: ', score); // for testing and debugging
score.innerText = scoreCount;


// EVENT LISTENERS
// icon clicks
gameIcons.forEach(gameIcon => {
    gameIcon.addEventListener('click', (e) => {

        // create random generated computer pick
        const rand = Math.floor(Math.random() * gameIcons.length)
        const randomPick = gameIcons[rand]

        // adding animation class
        computerIcon.classList.add('pulse')

        // adding icons with 3 seconds delay
        setTimeout(() => {
            computerIcon.append(randomPick)

            // logic for deciding a winner
            if(gameIcon === randomPick) {
                gameInfo('It\'s a draw!')
                // make a clone node from generated random pick and adding to the players choice
                const clone = randomPick.cloneNode(true)
                playerIcon.append(clone)
               
            } else if (gameIcon === paper && randomPick === rock) {
                scoreCount++
                score.innerText = scoreCount;
                playerIcon.classList.add('is-winner')
                gameInfo('You win!')
            } else if (gameIcon === rock && randomPick === scissors) {
                scoreCount++
                score.innerText = scoreCount;
                playerIcon.classList.add('is-winner')
                gameInfo('You win!')
            } else if (gameIcon === scissors && randomPick === paper) {
                scoreCount++
                score.innerText = scoreCount;
                playerIcon.classList.add('is-winner')
                gameInfo('You win!')
            } else {
                scoreCount--
                score.innerText = scoreCount;
                computerIcon.classList.add('is-winner')
                gameInfo('You loose!')
            }
            // remove animation class
            computerIcon.classList.remove('pulse')
            
            // add play again button
            createPlayAgainBtn()
            localStorage.setItem('scoreCount', JSON.stringify(scoreCount));
        }, 3000)

        // player icon adding before computer icon
        playerIcon.append(gameIcon)

        // adding and removing classes
        onGameBox.classList.add('active-flex')
        gameIcon.classList.add('static', 'pointer')
        randomPick.classList.add('static', 'pointer')
        gameBox.classList.add('remove');
    })
})

// rules module
rules.addEventListener('click', () => {
    rulesModule.classList.toggle('active')
    wrapper.classList.toggle('opacity')
})

// close rules modal
closeIcon.addEventListener('click', () => {
    rulesModule.classList.remove('active')
    wrapper.classList.remove('opacity')
})

// reset game
reset.addEventListener('click', () => {
    localStorage.clear()
    location.reload();
})

// play again
document.addEventListener('click', e => {
    if (e.target.matches('.btn-play-again')){
        playAgain()
        // remove play again button after clicking it
        e.target.remove()
    }
})

// FUNCTIONS
// function for executing play again button
function playAgain() {
    onGameBox.classList.remove('active-flex')
    gameBox.classList.remove('remove')
    score.innerText = score.innerText;
    // removes is winner class
    computerIcon.classList.remove('is-winner')
    playerIcon.classList.remove('is-winner')
    // remove game info text
    onGameBox.children[1].children[0].remove()
    // remove clone node so that it doesn't appear on the next game
    playerIcon.children[0].remove()
    // adding back the icons to the gameBox container
    for (let gameIcon of gameIcons){
        gameIcon.classList.remove('static', 'pointer')
        gameBox.append(gameIcon)
    }
}

// create play again button after clicking on game icons
function createPlayAgainBtn() {
    let btnPlayAgain = document.createElement('button')
    btnPlayAgain.innerText = "Play Again?"
    btnPlayAgain.classList.add('btn-play-again')
    gameInfoBox.append(btnPlayAgain)
}

// function for displaying info about result of the game
// passing argument which will be provided as text element innerText
function gameInfo(text) {
    let textEl = document.createElement('p')
    textEl.classList.add('game-info')
    gameInfoBox.append(textEl)
    return textEl.innerText = text;
}
