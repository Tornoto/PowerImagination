import { HUD } from "../scripts/manager/HUD";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PopMessage extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    onClose(){
        HUD.hideLayer(this);
    }

    // update (dt) {}
}
