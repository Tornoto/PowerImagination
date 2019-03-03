const {ccclass, property} = cc._decorator;

@ccclass
export default class DrawLineScene extends cc.Component {

    @property(cc.Node)
    nGear: cc.Node = null;

    @property(cc.Graphics)
    gComp: cc.Graphics = null;

    @property(cc.Node)
    nTarget: cc.Node = null;

    startPos: cc.Vec2 = null;
    endPos: cc.Vec2 = null;
    tarPos: cc.Vec2 = null;

    dir: cc.Vec2 = null;
    dist: number = 0;
    // 方向提示最大长度
    MAX_DIST = 100;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    start () {
        this.gearSpin();
    }

    gearSpin(){
        let act = cc.rotateBy(0.5, 120);
        this.nGear.runAction(cc.repeatForever(act));
    }

    onTouchStart(event:cc.Touch){
        this.startPos = this.gComp.node.convertToNodeSpaceAR(event.getLocation());
        cc.log(`touch pos: ${this.startPos}`);
    }

    onTouchMove(event:cc.Touch){
        this.nTarget.active = true;
        let pos = event.getLocation();
        let midPos = this.gComp.node.convertToNodeSpaceAR(pos);
        // 计算目标提示位置
        this.dir = midPos.sub(this.startPos);
        this.dist = this.dir.mag() > this.MAX_DIST ? this.MAX_DIST : this.dir.mag();
        this.tarPos = this.nGear.position.add(this.dir.normalize().mul(this.dist));
        this.nTarget.setPosition(this.tarPos);
        // arrow 图片箭头初始朝向
        let initDir = cc.v2(0, -1);
        let angle = initDir.signAngle(this.dir);
        this.nTarget.rotation = -cc.misc.radiansToDegrees(angle);
        cc.log(`dir: ${this.dir}`);
        cc.log(`angle: ${angle}`)
        // 根据手位置划线
        this.gComp.clear();
        this.gComp.moveTo(this.startPos.x, this.startPos.y);
        this.gComp.lineTo(midPos.x, midPos.y);
        this.gComp.stroke();
    }

    onTouchEnd(event:cc.Touch){
        this.nTarget.active = false;
        this.gComp.clear();
        let action = cc.moveTo(0.2, this.tarPos);
        this.nGear.runAction(cc.sequence(action, cc.callFunc(function(){
            this.nGear.setPosition(0,0);
        }.bind(this))))
    }
    // update (dt) {}
}
