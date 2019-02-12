const {ccclass, property} = cc._decorator;

@ccclass
export default class HUD_class {


    // onLoad () {}

    start () {

    }

    showLayer(pf: cc.Prefab, parent: cc.Node = null){
        if(pf == null){
            cc.log("pf cannot be null !");
            return null;
        }
        let layer = cc.instantiate(pf);
        if(layer == null){
            cc.warn("cannot instantiate " + pf);
            return null;
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

    goToScene(sceneName: string){
        cc.director.loadScene(sceneName);
    }
}

export var HUD = new HUD_class(); 
(window as any).HUD = HUD;