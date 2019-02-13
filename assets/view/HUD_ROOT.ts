import { SYS } from "../scripts/model/ConstData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HUD_ROOT extends cc.Component {

    @property(cc.Prefab)
    pfLoading: cc.Prefab = null;

    onLoad() {
        // add global variable
        // (window as any).Mgr = Mgr;
        cc.game.addPersistRootNode(this.node);
        ROOT_Layer = this;
    }

    start() {
    }
    
    _dt: number = 0;
    update(dt) {
        this._dt += dt;
        if (this._dt >= 1) {
            this._dt -= 1;
            this.checkWinSize();
        }
    }

    checkWinSize() {
        if (cc.winSize.height != SYS.SH || Math.abs(cc.winSize.width - SYS.SW) > 1) {
            SYS.SH = cc.winSize.height;
            SYS.SW = cc.winSize.width;
            SYS.SH2 = SYS.SH * 0.5;
            SYS.SW2 = SYS.SW * 0.5;
        }
    }

    onSizeChange() {
        SYS.SH = cc.winSize.height;
        SYS.SW = cc.winSize.width;
        SYS.SH2 = SYS.SH * 0.5;
        SYS.SW2 = SYS.SW * 0.5;
    }
}
export var ROOT_Layer: HUD_ROOT;
