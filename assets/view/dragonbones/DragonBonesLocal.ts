const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    nMonster0:cc.Node = null;
    dbMonster0: dragonBones.ArmatureDisplay = null;
    _arm0:dragonBones.Armature = null;;

    @property(dragonBones.ArmatureDisplay)
    dbMonster1: dragonBones.ArmatureDisplay = null;
    _arm1: dragonBones.Armature = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._arm1 = this.dbMonster1.armature();
        this._arm1.animation.play("walk");
    }

    start () {
        // do nothing 
        // ignore this ts code file
    }

    onLoadDragonBones(){
        this.dbMonster0=  this.createDragonAni("monster/m1", this.nMonster0, true, 0, "armatureName", "walk");
        this._arm0 = this.dbMonster0.armature();
        // this._arm0.animation.play("walk");
    }

    res = ["bones/monster/m1/monsterbone001_0_ske","bones/monster/m1/monsterbone001_0_tex"];
    onChangeDragonBones(){
        let data = this.dbMonster1.armature().clock;
        cc.loader.loadRes(this.res[0], dragonBones.DragonBonesAsset, (err, res)=>{
            cc.loader.loadRes(this.res[1], dragonBones.DragonBonesAtlasAsset, (err2, res2)=>{
                this.dbMonster1.dragonAsset = res;
                this.dbMonster1.dragonAtlasAsset = res2;
                this.dbMonster1.armature().clock = data;
            });
        });
    }

    onPlayAni(){
        this.dbMonster1.armature().animation.play("dash");
    }

    createDragonAni(resName: string, node: cc.Node, bPlay = true, playTimes: number = 0, armatureName = "armatureName", animationName = "Animation1", completeCallback = null): dragonBones.ArmatureDisplay {
        if(node == null){
            return null;
        }
        var dragon = node.getComponent(dragonBones.ArmatureDisplay);
        if(dragon == null){
            dragon = node.addComponent(dragonBones.ArmatureDisplay);
        }

        let resPath = `bones/${resName}`;

        cc.loader.loadResDir(resPath, function(err, assets){
            if(err || assets.length <= 0){
                cc.log("createDragonAni error, resource path = " + resPath);
                return;
            }

            if(node == null || (node as any)._components == null){
                return;
            }

            assets.forEach(asset => {
                if(asset instanceof dragonBones.DragonBonesAsset){
                    dragon.dragonAsset = asset;
                }
                if(asset instanceof dragonBones.DragonBonesAtlasAsset){
                    dragon.dragonAtlasAsset = asset;
                }
            });

            dragon.armatureName = armatureName;
            dragon.animationName = animationName;

            if(bPlay){
                dragon.playAnimation(animationName, playTimes);
            }
            
            if(completeCallback){
                dragon.addEventListener(dragonBones.EventObject.COMPLETE, completeCallback);
            }
        });
        return dragon;
    }

    // onLoadDragonBone(){
    //     if(cc.find("Canvas/animNode")){
    //         cc.find("Canvas/animNode").destroy();
    //     }else{
    //         var animNode = new cc.Node();
    //         animNode.name = "animNode";
    //         animNode.parent = cc.find("Canvas");
    //         var dragonDisplay = animNode.addComponent(dragonBones.ArmatureDisplay);

    //         var image = cc.url.raw('resources/bones/monster/monsterbone001_0_tex.png');
    //         var ske = cc.url.raw("resources/bones/monster/monsterbone001_0_ske.json");
    //         var atlas = cc.url.raw("resources/bones/monster/monsterbone001_0_tex.json");
    //         cc.loader.load(image, (error, texture) => {
    //             cc.loader.load({ url: atlas, type: 'txt' }, (error, atlasJson) => {
    //                 cc.loader.load({ url: ske, type: 'txt' }, (error, dragonBonesJson) => {
    //                     var atlas = new dragonBones.DragonBonesAtlasAsset();
    //                     atlas.atlasJson = atlasJson;
    //                     atlas.texture = texture;

    //                     var asset = new dragonBones.DragonBonesAsset();
    //                     asset.dragonBonesJson = dragonBonesJson;

    //                     dragonDisplay.dragonAtlasAsset = atlas;
    //                     dragonDisplay.dragonAsset = asset;

    //                     dragonDisplay.armatureName = 'armatureName';
    //                     dragonDisplay.playAnimation('walk', 0);
    //                 });
    //             });
    //         });


    //     }
    // }

    // update (dt) {}
}
