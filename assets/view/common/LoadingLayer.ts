import { HUD } from "../../scripts/manager/HUD";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.ProgressBar)
    pbLoading: cc.ProgressBar = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    goToScene(sceneName:string){

    }

    onProgress(count, total, item){
        cc.log("count: " + count + ", total: " + total);
        this.pbLoading.progress = count/total;
        if(count == total){
            HUD.goToScene("PIMainScene");
            HUD.hideLayer(this);
        }
    }

    loadFinish(err){

    }

    // update (dt) {}
}
