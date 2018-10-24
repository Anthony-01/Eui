class GameUi extends eui.Component {

    controller: GameControl;
    private _topicHandle:TopicHandle;

    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
        this.skinName = "GameUiSkin";

    }
    protected createChildren() {
        super.createChildren();
        this._topicHandle = new TopicHandle(this);
    }
    private onComplete():void {

    }

    /*
    * 开始游戏
    * */
    startGame():void{

    }

    /*
    * next
    * */
    nextGame():void{

    }
    /*
    *
    * */
    updateInfo(control:GameControl){
        this.controller = control;
    }

    /*
    * 更新信息
    * */
    updateGold():void{

    }
}