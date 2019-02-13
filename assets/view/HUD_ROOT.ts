const {ccclass, property} = cc._decorator;

@ccclass
export default class ROOT_Layer extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    data = [];

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.game.addPersistRootNode(this.node);
    }

    start () {
        this.data.push("rootlayer");
    }

    // update (dt) {}
}
