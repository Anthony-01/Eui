//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////


class Main extends eui.UILayer {
    // p_res:RES.IResource;

    // p_view:GameUi;
    constructor(){
        super();
    }


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        });

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        };

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        };

        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.runGame().catch((err)=>{
            console.log(err);
        })
    }

    private async runGame() {
        //修改
        await this.loadResource();

        this.createGameScene();
        // const result = await RES.getResAsync("description_json");
        // let parser = new egret.HtmlTextParser();
        // let textflowArr = result.map(text => parser.parse(text));
        // console.log(textflowArr);
        // this.startAnimation(result);
        // await platform.login();
        // const userInfo = await platform.getUserInfo();

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("game", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;

    private _gameWidth:number;
    private _gameHeight:number;
    gameUi:GameUi;
    gameControl:GameControl;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        this.gameUi = new GameUi();
        this._gameWidth = this.gameUi.width;
        this._gameHeight = this.gameUi.height;
        this.addChild(this.gameUi);
        this.adjustUi(this.gameUi);
        this.gameControl= new GameControl(this.gameUi);
        this.gameControl.onStartGame();
    }

    /*
    * 适配方案,通过scaleX以及scaleY实现
    * */
    private adjustUi(gameUi:GameUi):void{
        gameUi.horizontalCenter = 0;
        gameUi.verticalCenter = 0;
        let rateX =  this.stage.stageWidth/gameUi.width;
        let rateY =  (this.stage.stageHeight-150)/gameUi.height;
        let rate = rateX < rateY ? rateY : rateX;
        this.stage.scaleMode = egret.StageScaleMode.NO_BORDER;
        gameUi.scaleX = rate;
        gameUi.scaleY = rate;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * The Description file has been loaded successfully,starting to play the animation
     */
    private startAnimation(result: Array<any>): void {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }


}
