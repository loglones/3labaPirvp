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
        this.startTimer();
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

        for( let row = 0; row < this.boardSize; row++){
            this.gameBoard[row] = [];
            for( let col = 0; col < this.boardSize; col++){
                const cell = document.createElement('div')
                cell.className = 'pipe-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;

                const randomType = pipeTypes[Math.floor(math.random() * pipeTypes.length)];
                const randomRotation = randomType.rotations[Math.floor(math.random() * randomType.rotations.length)];

                this.gameBoard[row][col] = {
                    type: randomType.type,
                    rotation: randomRotation.name,
                    rotationIndex: randomType.rotations.indexOf(randomRotation),
                    rotations: randomType.rotations,
                    connected: false
                };

                this.updatePipeImage(row, col);
                cell.addEventListener('click', () => this.rotatePipe(row, col));
                gameBoard.appendChild(cell);
            }
        }
        this.makeStartAndEndPoints();
    }
    updatePipeImage(row, col){
        const pipe = this.gameBoard[row][col];
        const cell = document.querySelector(`.pipe-cell[data-row="${row}"][data-col="${col}"]`);

        const rotationData = pipe.rotations.find(r => r.name === pipe.rotation);
        cell.innerHTML = `<img src="images/${rotationData.image}" alt="${pipe.type} pipe" class="pipe-image">`
    }
    rotatePipe(row,col){
        const pipe = this.gameBoard[row][col];
        const cell = document.querySelector(`.pipe-cell[data-row="${row}"][data-col="${col}"]`)

        cell.classList.add('rotating');

        setTimeout(() => {
           if(pipe.type === 'straight') {
               pipe.rotationIndex = (pipe.rotationIndex + 1) % pipe.rotations.length;
               pipe.rotation = pipe.rotations[pipe.rotationIndex].name;
           }
           else if (pipe.type === 'corner') {
               pipe.rotationIndex = (pipe.rotationIndex + 1) % pipe.rotations.length;
               pipe.rotation = pipe.rotations[pipe.rotationIndex].name;
           }
           else if (pipe.type === 'cross') {

           }

           this.updatePipeImage(row, col);
           cell.classList.remove('rotating');
           this.checkSolution();
        },300);
    }
    makeStartAndEndPoints(){
        this.gameBoard[0][0] = {
            type: 'start',
            rotation: 'start',
            connected: false,
            rotations: [{name: 'start', image: 'start.png'}]
        };
        const startCell = document.querySelector('.pipe-cell[data-row="0"][data-col="0"]');
        startCell.innerHTML = '<img src="images/start.png" alt="Start" class="pipe-image">';
        startCell.removeEventListener('click', () => this.rotatePipe(0,0));
        const endRow = this.boardSize - 1;
        const endCol = this.boardSize - 1;
        this.gameBoard[endRow][endCol] = {
            type: 'end',
            rotation: 'end',
            connected:false,
            rotations: [{name: 'end', image: 'end.png'}]
        };
        const endCell = document.querySelector(`.pipe-cell[data-row="${endRow}"][data-col="${endCol}"]`);
        endCell.innerHTML = '<img src="images/end.png" alt="End" class="pipe-image">';
        endCell.removeEventListener('click', () => this.rotatePipe(endRow,endCol));
    }
    startTimer() {
        this.timeLeft = 120;
        this.updateTimer();

        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();

            if(this.timeLeft <= 0) {
                this.endGame(false);
            }
        },1000);
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    new SpacePipesGame();
})