class SpacePipesGame {
    constructor() {
        this.playerName='';
        this.currentScreen = 'start';
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
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    new SpacePipesGame();
})