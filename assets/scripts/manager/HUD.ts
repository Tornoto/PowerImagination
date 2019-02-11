const {ccclass, property} = cc._decorator;

@ccclass
export default class HUD_class {


    // onLoad () {}

    start () {

    }

    showLayer(pf: cc.Prefab, parent: cc.Node = null){
        if(pf == null){
            cc.error("pf cannot be null !");
            return null;
        }
        let layer = cc.instantiate(pf);
        if(layer == null){
            cc.error("cannot instantiate " + pf);
        }
        if(parent){
            parent.addChild(layer);
        }else{
            let scene = cc.director.getScene();
            let sz = cc.winSize;
            layer.setParent(scene);
            layer.setPosition(sz.width/2, sz.height/2);       
        }
        return layer;
    }

    hideLayer(pf: cc.Component){
        if(pf.node != null){
            pf.node.destroy();
        }
    }
}

export var HUD = new HUD_class(); 
