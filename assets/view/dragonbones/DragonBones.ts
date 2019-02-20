const {ccclass, property} = cc._decorator;

@ccclass
export default class DragonBones extends cc.Component {

    @property(dragonBones.ArmatureDisplay)
    dbMonster: dragonBones.ArmatureDisplay = null;

    @property(cc.Label)
    labLoadDragonBones: cc.Label = null;

    bLoaded:boolean = false;

    res = [["bones/monster/m1/monsterbone001_0_ske","bones/monster/m1/monsterbone001_0_tex"],
            ["bones/monster/m2/monsterbone001_1_ske","bones/monster/m2/monsterbone001_1_tex"]];
    idx = 1;

    start () {
        //this.dbMonster.playAnimation("dash",5);
    }

    onLoadDragonBones(){
        this.loadDragonBones();
    }

    loadDragonBones(){
        let idx = this.idx++%2;
        
        let data = this.dbMonster.armature().clock;
        cc.loader.loadRes(this.res[idx][0], dragonBones.DragonBonesAsset, (err, res)=>{
            cc.loader.loadRes(this.res[idx][1], dragonBones.DragonBonesAtlasAsset, (err2, res2)=>{
                this.dbMonster.dragonAsset = res;
                this.dbMonster.dragonAtlasAsset = res2;
                this.dbMonster.armature().clock = data;
            });
        });
    }

    // update (dt) {}
}
