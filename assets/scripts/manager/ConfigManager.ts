const {ccclass, property} = cc._decorator;

@ccclass
export default class CfgMgr_class{

    C_character = {};

    index:number = 0;
    
    loadConfig(){
        let keys = Object.getOwnPropertyNames(this);
        for(let k of keys){
            if(k.startsWith('C')){
                this.index++;
                let path = "config/" + k.substr(2);
                this.getConfigInfo(k, path);
            }
        }
    }

    getConfigInfo(name:string, path:string){
        let self = this;
        let count = 1;
        cc.loader.loadRes(path, (err, resource) => {
            if(err){
                cc.error("cannot find configure file: "+path+"! " + err.message);
                return null;
            }
            if(resource){
                var str:string = cc.loader.getRes(resource.nativeUrl);
                if(typeof str != "string"){
                    cc.error("load configure " + name + "error !");
                }else{
                    let sList;
                    if(str.indexOf("\r\n") < 0){
                        sList = str.split("\n");
                    }else{
                        sList = str.split("\r\n");
                    }
                    
                    let cfg = {};
                    let item = {};
                    
                    for(let line of sList){
                        if(line != null && line.length > 0){
                            if(line.startsWith("#")){
                                continue;
                            }
                            if(line.startsWith("[")){
                                item = {};
                                let objName = line.substr(1, line.length -2);
                                cfg[objName] = item;
                                continue;
                            }

                            let pair = line.split("=");
                            if(pair.length > 1){
                                let k = pair[0].trim();
                                let v = pair[1].trim();
                                item[k] = v;
                            }
                        }
                    }
                    self[name] = cfg;
                    cc.log("load config: " + name + " completed !")
                }
            }
            self.index--;
            count++;
            if(self.index == 0){
                cc.log("all configure files loaded !");
            }
        });
    }

    charCfg: Map<number, CharItem> = new Map<number, CharItem>();
    /**
     * 获取角色配置
     * @param id 
     */
    getCharConfig(id: number):CharItem{
        let rc: CharItem = this.charCfg[id];
        if(rc == null){
            let cfg = this.C_character[id.toString()];
            rc = new CharItem();

            if(cfg == null){
                cc.warn("get config of char id" + id + " error !");
                return null;
            }
            rc.name = cfg["NAME"];
            rc.icon_res = cfg["ICON_RES"];
            
            this.charCfg[id] = rc;
            // remove text 
            delete this.C_character[id];
        }
        return rc;
    }
}

export class CharItem{
    name: string;
    /**icon path */
    icon_res: string;
}

export var Cfg = new CfgMgr_class();
