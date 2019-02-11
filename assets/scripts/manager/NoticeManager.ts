const {ccclass, property} = cc._decorator;

@ccclass
class Notification_class {
    _eventMap: Map<number, Array<any>> = new Map<number, Array<any>>();
    _eventTarget: Map<any, Array<any>> = new Map<any, Array<any>>();

    on(type, callback, target){
        if(this._eventMap.get(type) == undefined){
            this._eventMap.set(type, []);
        }
        
        this._eventMap.get(type).push({callback: callback, target: target});
        
        if(target.uid == null){
            if(target.name != null){
                target.uid = target.name + "-" + Math.round(Math.random()*1000000);
            }else{
                target.uid = "MGR-" + Math.round(Math.random()*1000000);
            }
        }

        var objId = target.uid;
        if(this._eventTarget.get(objId) == undefined){
            this._eventTarget.set(objId, []);
        }

        this._eventTarget.get(objId).push({type: type, callback: callback});
    }

    emit(type, param){
        let array = this._eventMap.get(type);
        if(array == undefined){
            return;
        }

        for(let i=0; i<array.length; ++i){
            let element = array[i];
            if(element != null){
                element.callback.call(element.target, param);
            }
        }
    }

    off(type, callback){
        var array = this._eventMap.get(type);
        if(array == undefined){
            return;
        }
        for(let i=0; i<array.length; ++i){
            let element = array[i];
            if(element && element.callback == callback){
                array.splice(i, 1);
                break;
            }
        }
    }

    offType(type){
        this._eventMap.delete(type);
    }

    offAll(target){
        var objId = target.uid;
        var array = this._eventTarget.get(objId);
        
        if(array == undefined){
            return;
        }

        for(let i=0; i<array.length; ++i){
            var element = array[i];
            if(element != null){
                this.off(element.type, element.callback);
            }
        }
        this._eventTarget.delete(objId);
    }
}

export var NotificationMgr = new Notification_class();
