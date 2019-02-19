const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        // this.onLoadDragonBone(); // 似乎龙骨版本有问题
    }

    onLoadDragonBone(){
        if(cc.find("Canvas/animNode")){
            cc.find("Canvas/animNode").destroy();
        }else{
            var animNode = new cc.Node();
            animNode.name = "animNode";
            animNode.parent = cc.find("Canvas");
            var dragonDisplay = animNode.addComponent(dragonBones.ArmatureDisplay);

            var image = cc.url.raw('resources/bones/monster/monsterbone001_0_tex.png');
            var ske = cc.url.raw("resources/bones/monster/monsterbone001_0_ske.json");
            var atlas = cc.url.raw("resources/bones/monster/monsterbone001_0_tex.json");
            cc.loader.load(image, (error, texture) => {
                cc.loader.load({ url: atlas, type: 'txt' }, (error, atlasJson) => {
                    cc.loader.load({ url: ske, type: 'txt' }, (error, dragonBonesJson) => {
                        var atlas = new dragonBones.DragonBonesAtlasAsset();
                        atlas.atlasJson = atlasJson;
                        atlas.texture = texture;

                        var asset = new dragonBones.DragonBonesAsset();
                        asset.dragonBonesJson = dragonBonesJson;

                        dragonDisplay.dragonAtlasAsset = atlas;
                        dragonDisplay.dragonAsset = asset;

                        dragonDisplay.armatureName = 'armatureName';
                        dragonDisplay.playAnimation('walk', 0);
                    });
                });
            });


        }
    }

    // update (dt) {}
}
