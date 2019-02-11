import { NotificationMgr } from "../scripts/manager/NoticeManager";
import { MsgCode } from "../scripts/model/MessageCode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

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
    }

    onDestroy(){
        NotificationMgr.offAll(this);
    }

    // update (dt) {}
}
