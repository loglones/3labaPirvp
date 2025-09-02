class SpacePipesGame {
    constructor() {
        this.playerName='';
        this.currentScreen = 'start';
        this.gameBoard = [];
        this.boardSize = 6;
        this.timeLeft = 120;
        this.timeInterval = null;
        this.init();
    }
    init(){
        this.bindEvents();
        this.showScreen('start');
    }
    bindEvents() {
        document.getElementById('player-name').addEventListener('input', (e) => {
            this.playerName = e.target.value.trim();
            document.getElementById('start-button').disabled = !this.playerName;
        });

        document.getElementById('start-button').addEventListener('click', () => {
            this.startGame();
        })
    }
    showScreen(screenName){
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        })

        document.getElementById(`${screenName}-screen`).classList.add('active');
        this.currentScreen = screenName;
    }
    startGame() {
        console.log('Игра началась под именем: ' , this.playerName);
        this.showScreen('game');
        document.getElementById('current-player').textContent = this.playerName;
        this.generateGameBoard();

    }
    generateGameBoard(){
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';
        gameBoard.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`;

        this.gameBoard = [];

        const pipeTypes = [
            {
                type: 'straight',
                rotations: [
                    { name: 'horizontal', image: 'straight-h.png'},
                    { name: 'vertical', image: 'straight-v.png'},
                ]
            },
            {
                type: 'corner',
                rotations: [
                    { name: 'top-right', image: 'corner-tr.png'},
                    { name: 'right-bottom', image: 'corner-rb.png'},
                    { name: 'bottom-left', image: 'corner-bl.png' },
                    { name: 'left-top', image: 'corner-lt.png' }
                ]
            },
            {
                type: 'cross',
                rotations: [
                    { name: 'cross', image: 'cross.png'},
                ]
            }
        ];
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    new SpacePipesGame();
})