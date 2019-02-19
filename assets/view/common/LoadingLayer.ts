import { HUD } from "../../scripts/manager/HUD";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadingLayer extends cc.Component {

    @property(cc.Node)
    bgNode: cc.Node = null;

    @property(cc.ProgressBar)
    pbLoading: cc.ProgressBar = null;
    /**场景名 */
    sceneName:string = null;
    /**加载的时间点 */
    tm:number = 0;

    // onLoad () {}

    start () {

    }

    /**背景图片适配 */
    bgImgAdaptation(){
        var adaptScale = 1.0;
        if(this.node.width > cc.winSize.width || this.node.height > cc.winSize.height){   //适配
            let scale = Math.min(cc.winSize.width/this.node.width, cc.winSize.height/this.node.height);
            this.node.scale = scale;
            adaptScale = scale;
        }

        this.bgNode.width = cc.winSize.width/adaptScale;
        this.bgNode.height = cc.winSize.height/adaptScale;
    }

    goToScene(sceneName:string){
        this.tm = new Date().valueOf();
        this.sceneName = sceneName;
    }

    onProgress(count, total, item){
        cc.log("count: " + count + ", total: " + total);
        this.pbLoading.progress = count/total;
    }

    loadFinish(err){
        if(new Date().valueOf() - this.tm < 500){
            this.scheduleOnce(this.loadGameScene, 0.5);
        }else{
            this.loadGameScene();
        }
    }

    loadGameScene(){
        cc.director.loadScene(this.sceneName);
        HUD.hideLayer(this);
    }

    // update (dt) {}
}
