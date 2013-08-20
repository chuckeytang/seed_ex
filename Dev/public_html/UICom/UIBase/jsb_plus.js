/**
 * Created with JetBrains WebStorm.
 * User: gww
 * Date: 13-7-25
 * Time: 上午1:55
 * To change this template use File | Settings | File Templates.
 */
// TargetPlatform
cc.TargetWindows = 0;
cc.TargetLinux = 1;
cc.TargetMacOS = 2;
cc.TargetAndroid = 3;
cc.TargetIphone = 4;
cc.TargetIpad = 5;
cc.TargetBlackBerry = 6;
cc.TargetNaCl = 7;
cc.TargetEmscripten = 8;
cc.TargetTizen = 9;


cc.noTouchLayer = cc.Layer.extend({
    priority: 0,
    ctor: function () {
        this._super();
        cc.associateWithNative(this, cc.Layer);
    },

    init: function (priority) {
        this._super();
        this.priority = priority;
        return true;
    },

    onEnter: function () {
        cc.registerTargettedDelegate(cc.MENU_HANDLER_PRIORITY + this.priority, true, this);
    },

    onExit: function () {
        cc.unregisterTouchDelegate(this);
    },

    onTouchBegan: function (touch, ev) {
        cc.log("------------------");
        return true;
    }
});

cc.noTouchLayer.create = function () {
    var layer = new cc.noTouchLayer();
    if (layer && layer.init(0))
        return layer;

    return null;
};

cc.noTouchLayer.createByPriority = function (priority) {
    var layer = new cc.noTouchLayer();
    if (layer && layer.init(priority))
        return layer;

    return null;
};

////////////////////////////////////////////////////////
// CCBLayerCache
cc.CCBLayerCache = function () {
};
cc.CCBLayerCache._ccb_map = [];
cc.CCBLayerCache.getCCBLayer = function (filename) {

    var layer = cc.CCBLayerCache._ccb_map[filename];
    if (IsNull(layer)) {
        cc.log("cc.BuilderReader.load:[" + filename + "]");
        layer = cc.BuilderReader.load(filename);
        cc.CCBLayerCache._ccb_map[filename] = layer;

        layer.controller["ccb_name"] = filename;
//        layer.retain();
    }
    return layer;
};

cc.ccb_map = [];
cc.Node.prototype.addCCBChild = function (ccblayer_or_name, zorder, tag) {
    "use strict";
    var layer = null;

    if (typeof (ccblayer_or_name) === "string") {
        layer = cc.CCBLayerCache.getCCBLayer(ccblayer_or_name);
    }
    else
        layer = ccblayer_or_name;


    if (NotNull(layer.getParent()))
        layer.removeFromParent(false);

    if (IsNull(zorder)) {
        this.addChild(layer);
    } else if (IsNull(tag)) {
        this.addChild(layer, zorder);
    } else {
        this.addChild(layer, zorder, tag);
    }
    layer.controller.callOnShow();
    return layer;
};

// CCBLayer
cc.CCBLayer = cc.Layer.extend({
    is_ccb_layer: true,
    ccb_name: "",
    onDidLoadFromCCB: function () {
        "use strict";
        if (NotNull(this.onLoadCCB))
            this.onLoadCCB();
        this.setUpdateEnabled(true);
    },
    callOnShow: function () {
        "use strict";
        if (NotNull(this.onShow))
            this.onShow();
    },
    callOnHide: function () {
        "use strict";
        if (NotNull(this.onHide))
            this.onHide();
    },
    getAnimationManager: function () {
        if (NotNull(this.rootNode))
            return this.rootNode.animationManager;
        else
            return null;
    },

    playAnimation: function (animation_name, callback) {

        var manager = this.getAnimationManager();

        if (NotNull(callback)) {
            manager.setCompletedAnimationCallback(this, function () {
                "use strict";
                callback();
                manager.setCompletedAnimationCallback(undefined, undefined);
            });
        }

        if (NotNull(manager))
            manager.runAnimationsForSequenceNamed(animation_name);
    },

    setUpdateEnabled: function (enable) {
        //enable ? this.rootNode.schedule(this.onUpdate) : this.rootNode.unschedule(this.onUpdate);
        var self = this;
        var ccb_name = typeof (this).nam;//getClassName(this);
        this.rootNode.onUpdate = function (dt) {
            if (NotNull(self.onUpdate)) {
                //cc.log("CCBLayer:[" + ccb_name + "]-----onUpdate");
                self.onUpdate(dt);
            }
        };
        if (NotNull(self.onUpdate))
            enable ? this.rootNode.schedule(this.rootNode.onUpdate) : this.rootNode.unschedule(this.rootNode.onUpdate);
    },

    removeFromParent: function (cleanup) {
        if (this.rootNode) {
            this.rootNode.removeFromParent(cleanup);
        }
    },

    getParent: function () {
        return this.rootNode.getParent();
    },

    setParent: function (parent) {

        if (parent && this.rootNode) {
            parent.addChild(this.rootNode);
        }
    },

    close: function (callback) {
        "use strict";

        cc.globalScene.setNoTouchLayerEnabled(true, -1);
        var self = this;
        var after_function = function () {
            self.removeFromParent(false);
            self.callOnHide();
            //if (NotNull(cc.globalScene.mask_layer))
            //    cc.globalScene.mask_layer.removeFromParent(false);
            cc.globalScene.setNoTouchLayerEnabled(false);
            if (self.open_mode === cc.OpenMode.show)
                cc.globalScene.removeChild(self.mask_layer);
            if (NotNull(callback))
                callback();
        };
        /*
         if (this.open_mode == cc.OpenMode.push) {
         cc.globalScene.popCCBLayer(after_function)
         } else {
         this.playAnimation("Outro", after_function);
         }*/
        this.playAnimation("Outro", after_function);

    },

    jump: function (ccb, callback) {
        "use strict";
        this.close(function () {
            if(NotNull(ccb) && ccb!=="")
                cc.globalScene.pushCCBLayer(ccb, callback);
        });
    },


    setVisible: function (b) {
        if (this.rootNode && b !== this.rootNode.isVisible()) {
            this.rootNode.setVisible(b);
        }
    },

    isVisible: function () {
        if (this.rootNode) {
            return this.rootNode.isVisible();
        } else {
            return false;
        }
    },

    isTouchEnabled: function () {
        if (this.rootNode)
            return this.rootNode.isTouchEnabled();
        else
            return false;
    },

    setTouchEnabled: function (enable) {
        if (this.rootNode) {
            this.rootNode.setTouchEnabled(enable);
        }
    }/*,


     onEnter: function () {
     cc.log("CCBLayer-----onEnter");
     },

     onExit: function () {
     cc.log("CCBLayer-----onExit");
     } */



});

////////////////////////////////////////////////////////
// OpenMode
cc.OpenMode = {};
cc.OpenMode.push = true;
cc.OpenMode.show = false;

////////////////////////////////////////////////////////
// Scene
cc.Scene.prototype._ui_stack = [];
cc.Scene.prototype.no_touch_layer = null;
cc.Scene.prototype.setNoTouchLayerEnabled = function (val, pri) {
    "use strict";
    if (IsNull(this.no_touch_layer)) {
        this.no_touch_layer = cc.noTouchLayer.createByPriority(-1);
        //this.no_touch_layer = cc.LayerColor.create(cc.c4(28, 28, 28, 180), size.width, size.height);
        this.no_touch_layer.retain();

    }
    if (val) {
        if (NotNull(this.no_touch_layer.getParent()))
            this.no_touch_layer.removeFromParent(false);
        if (NotNull(pri))
            this.no_touch_layer.priority = pri;
        else
            this.no_touch_layer.priority = 0;
        cc.globalScene.addChild(this.no_touch_layer, 99);
    } else {
        this.no_touch_layer.removeFromParent(false);
    }
};

cc.Scene.prototype.addParticle = function (filename) {
    "use strict";
    var particle_obj = cc.ParticleSystem.create(filename);
    this.addChild(particle_obj);
};

cc.Scene.prototype.clearAllCCBLayer = function () {
    "use strict";
    this.removeAllChildren(false);
    this._ui_stack = [];
};

cc.Scene.prototype.pushCCBLayer = function (ccblayer_or_name, callback, withIntro) {
    "use strict";
    cc.log("---------pushCCBLayer:" + ccblayer_or_name);
    //this.removeAllChildren(false);
    var layer = null;
    if (typeof (ccblayer_or_name) === "string") {
        layer = cc.CCBLayerCache.getCCBLayer(ccblayer_or_name);
    }
    else
        layer = ccblayer_or_name;

    this.addCCBChild(layer);
    layer.controller.owner_scene = this;
    layer.controller.open_mode = cc.OpenMode.push;
    this._ui_stack.push(layer);
    if(withIntro)
        layer.controller.playAnimation("Intro", callback);
    return layer;
};

cc.Scene.prototype.batchPushCCBLayer = function (layer_arr, callback) {
    "use strict";
    for(var i=0; i<layer_arr.length; i++) {
        var ccblayer_or_name = layer_arr[i];
        var layer = null;
        if (typeof (ccblayer_or_name) === "string") {
            layer = cc.CCBLayerCache.getCCBLayer(ccblayer_or_name);
        }
        else
            layer = ccblayer_or_name;
        this._ui_stack.push(layer);
    }
    var layer = this.addCCBChild(layer_arr.tail());
    layer.controller.owner_scene = this;
    layer.controller.open_mode = cc.OpenMode.push;
    layer.controller.playAnimation("Intro", callback);
    return layer;
};

cc.Scene.prototype.popCCBLayer = function (callback, withOutro) {
    "use strict";
    var self = this;
    var layer = this._ui_stack.pop();
    if (IsNull(layer))
        return;

    var removeFunc = function () {
            self.removeAllChildren(false);
            var new_layer = self._ui_stack.pop();
            if (IsNull(new_layer))
                return;
            self.pushCCBLayer(new_layer, callback);
        };
        
    if(withOutro)
        layer.controller.playAnimation("Outro", removeFunc);
    else
        removeFunc.apply();
};

 cc.Scene.prototype.switchCCBLayer = function (ccblayer_or_name, callback, withAnim) {
    "use strict";
    this.popCCBLayer(callback, withAnim);
    this.pushCCBLayer(ccblayer_or_name, callback, withAnim);
 }; 

cc.Scene.prototype.getCurCCBLayer = function() {
    "use strict";
    return this._ui_stack[this._ui_stack.length - 1];
};

cc.Scene.prototype.showCCBLayer = function (ccblayer_or_name, callback) {
    "use strict";
    //var size = cc.Director.getInstance().getWinSize();

    this.setNoTouchLayerEnabled(true);
    var layer = null;
    if (typeof (ccblayer_or_name) === "string") {
        layer = cc.CCBLayerCache.getCCBLayer(ccblayer_or_name);
    }
    else
        layer = ccblayer_or_name;
    //var layer = cc.CCBLayerCache.getCCBLayer(ccblayer_or_name);

    if (IsNull(layer.controller.mask_layer)) {
        layer.controller.mask_layer = cc.LayerColor.create(ui_cfg.DIALOG_MASK_COLOR, size.width, size.height);
        layer.controller.mask_layer.addChild(cc.noTouchLayer.create());
        layer.controller.mask_layer.retain();
    }

    this.addChild(layer.controller.mask_layer);
    this.addCCBChild(layer);
    layer.controller.open_mode = cc.OpenMode.show;
    layer.controller.playAnimation("Intro", callback);

    return layer;
};

cc.Scene.prototype.getCCBLayer = function () {
    "use strict";
    return this._ui_stack.tail();
};

//////////////////
// Sprite
cc.Sprite.prototype.frame_couter = 0;
cc.Sprite.prototype.data_binding_update_freq = 0;
cc.Sprite.prototype.data_binding_callback = null;
cc.Sprite.prototype.visible_binding_callback = null;
cc.Sprite.prototype.on_update = function () {
    "use strict";
    this.frame_couter++;
    if (this.frame_couter % this.data_binding_update_freq === 0) {
        if (NotNull(this.data_binding_callback))
            this.setDisplayFrame(FrameCache.GetSpriteFrame(this.data_binding_callback()));
        if (NotNull(this.visible_binding_callback))
            this.setVisible(this.visible_binding_callback());
    }
};

cc.Sprite.setDataBinding = function (update_freq, data_binding_callback, visible_binding_callback) {
    this.data_binding_update_freq = update_freq;
    if (this.data_binding_update_freq < 1)
        this.data_binding_update_freq = 1;
    this.data_binding_callback = data_binding_callback;
    this.visible_binding_callback = visible_binding_callback;
};

// Class
cc.Class.prototype.getClass = function() {
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec((this).constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
};

// LabelTTF
cc.LabelTTF.prototype.frame_couter = 0;
cc.LabelTTF.prototype.data_binding_update_freq = 0;
cc.LabelTTF.prototype.data_binding_callback = null;
cc.LabelTTF.prototype.visible_binding_callback = null;
cc.LabelTTF.prototype.on_update = function () {
    "use strict";
    this.frame_couter++;
    if (this.frame_couter % this.data_binding_update_freq === 0) {
        if (NotNull(this.data_binding_callback))
            this.setString("" + this.data_binding_callback());
        if (NotNull(this.visible_binding_callback))
            this.setVisible(this.visible_binding_callback());
    }
};

cc.LabelTTF.setDataBinding = function (update_freq, data_binding_callback, visible_binding_callback) {
    this.data_binding_update_freq = update_freq;
    if (this.data_binding_update_freq < 1)
        this.data_binding_update_freq = 1;
    this.data_binding_callback = data_binding_callback;
    this.visible_binding_callback = visible_binding_callback;
};

// LabelBMFont
cc.LabelBMFont.prototype.frame_couter = 0;
cc.LabelBMFont.prototype.data_binding_update_freq = 0;
cc.LabelBMFont.prototype.data_binding_callback = null;
cc.LabelBMFont.prototype.visible_binding_callback = null;

cc.LabelBMFont.prototype.on_update = function () {
    "use strict";
    this.frame_couter++;
    if (this.frame_couter % this.data_binding_update_freq === 0) {
        if (NotNull(this.data_binding_callback))
            this.setString("" + this.data_binding_callback());
        if (NotNull(this.visible_binding_callback))
            this.setVisible(this.visible_binding_callback());
    }

};

cc.LabelBMFont.setDataBinding = function (update_freq, data_binding_callback, visible_binding_callback) {

    this.data_binding_update_freq = update_freq;
    if (this.data_binding_update_freq < 1)
        this.data_binding_update_freq = 1;
    this.data_binding_callback = data_binding_callback;
    this.visible_binding_callback = visible_binding_callback;
};