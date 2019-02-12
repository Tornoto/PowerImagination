import { NotificationMgr } from "../scripts/manager/NoticeManager";
import { MsgCode } from "../scripts/model/MessageCode";
import { HUD } from "../scripts/manager/HUD";
import ROOT_Layer from "./ROOT_Layer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Prefab)
    pfMessage: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        NotificationMgr.on(MsgCode.MSG_GREETING, this.greeting, this);
    }

    start () {
        this.label.string = "hello PI !";
        this.scheduleOnce(function(){
            NotificationMgr.emit(MsgCode.MSG_GREETING, null);
        }, 1);
    }

    greeting(){
        this.label.string = "Good Night !";
        // test persist root node
        let comp = cc.find("root_layer").getComponent(ROOT_Layer);
        cc.log("data: " + comp.data);
    }

    onDestroy(){
        NotificationMgr.offAll(this);
    }

    onMessage(){
        HUD.showLayer(this.pfMessage);
    }

    // update (dt) {}
}
