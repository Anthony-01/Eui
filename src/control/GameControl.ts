class GameControl {

    _gameUi:GameUi;

    constructor(gameUi:GameUi){
        this._gameUi = gameUi;
    }

    onStartGame(data?:any):void{
        this._gameUi.startGame();
    }

    nextGame():void{
        this._gameUi.nextGame();
        this._gameUi.updateInfo(this);
    }

    onUploadResult():void{
        this._gameUi.updateGold();
    }
}