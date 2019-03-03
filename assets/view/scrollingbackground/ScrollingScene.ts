const {ccclass, property} = cc._decorator;

@ccclass
export default class ScrollingScene extends cc.Component {

    @property(cc.Node)
    nBg1: cc.Node = null;
    @property(cc.Node)
    nBg2: cc.Node = null;

    bgHeight: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.bgHeight = this.nBg1.height;
    }

    start () {
        cc.log(`start ----\nbackground height: ${this.bgHeight}`);
    }

    update (dt) {
        this.scrollingBg(dt);
    }

    scrollingBg(dt){
        this.nBg1.setPosition(this.nBg1.position.x, this.nBg1.position.y - 1);
        this.nBg2.setPosition(this.nBg2.position.x, this.nBg2.position.y - 1);
        if(this.nBg1.position.y < -this.bgHeight){
            this.nBg1.setPosition(this.nBg2.position.x, this.nBg2.position.y+512);
        }
        if(this.nBg2.position.y < -this.bgHeight){
            this.nBg2.setPosition(this.nBg1.position.x, this.nBg1.position.y+512);
        }
    }
}
