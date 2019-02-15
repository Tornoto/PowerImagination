import { ROOT_Layer } from "../../view/HUD_ROOT";
import LoadingLayer from "../../view/common/LoadingLayer";
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

    goToSceneWithLoading(sceneName:string){
        let layer = ROOT_Layer.node.getChildByName("loading");
        if(layer == null){
            layer = HUD.showLayer(ROOT_Layer.pfLoading, ROOT_Layer.node);
            layer.name = "loading";
            layer.zIndex = cc.macro.MIN_ZINDEX + 10;
            layer.getComponent(LoadingLayer).bgImgAdaptation();  //背景图片适配
        }
        var loading = layer.getComponent(LoadingLayer);
        loading.goToScene(sceneName);

        cc.director.preloadScene(sceneName, (count, total, item)=>{
            loading.onProgress(count, total, item);
        }, 
        (err)=>{
            loading.loadFinish(err);
        });
    }
}

export var HUD = new HUD_class(); 
(window as any).HUD = HUD;