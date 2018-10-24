class TestSkin extends eui.Component {
    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
        this.skinName = "TestSkinS";
    }
    protected createChildren() {
        super.createChildren();
        console.log("createChildren")
    }
    private onComplete():void{
        console.log("onComplete");
    }
}