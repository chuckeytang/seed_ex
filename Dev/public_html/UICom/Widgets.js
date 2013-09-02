var Widget_CardList2 = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_CardList2-----loadccb");
    },

    onCardClick: function () {
        cc.log("card click");
    }
});

var Widget_CharInfo = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_CharInfo-----loadccb");
    }
});

var Widget_Sumup = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_Sumup-----loadccb");
    }
});

var Widget_FightBton = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_FightBton-----loadccb");
    }
    ,
    onFightClick: function(){
        if (gMainScene.getCurCCBController() instanceof Window_EnterBattleLayer) {
        }
        else if (gMainScene.getCurCCBController() instanceof Window_SmallMap) {
            gMainScene.switchCCBLayer(UI.WINDOW_ENTER_BATTLE_LAYER_ID);
        }
    }
});

var Widget_FightCard = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_FightCard-----loadccb");
        this.setUpdateEnabled(true);
    },
    clone: function() {
        var clone = new this.constructor;
        for (var prop in this) {
            if(clone[prop.toString()] === undefined) {
                clone[prop.toString()] = this[prop.toString()];
            }
        }
    }
    ,
    onCardClick: function(){
        cc.log("FightCard click");
        if(gMainScene.getCurCCBController() instanceof Window_SmallMap) {
            this._switchMenuID = UI.WINDOW_ENTER_BATTLE_LAYER_ID;
        }
    },

    onUpdate: function(dt) {
        if(NotNull(this._switchMenuID)) {
            gMainScene.switchCCBLayer(this._switchMenuID);
            this._switchMenuID = null;
        }
    }
});

var Widget_GuideBar = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_GuideBar-----loadccb");
        this.setUpdateEnabled(true);
    },

    onDuiwuClick: function () {
        cc.log("Duiwu click");
        this._switchMenuID = UI.WINDOW_CARD_MANAGER_ID;
    },

    onQujingClick: function () {
        cc.log("Qujing click");
        this._switchMenuID = UI.WINDOW_BIG_MAP;
    },

    onJubaoClick: function () {
        cc.log("Jubao click");
        this._switchMenuID = UI.WINDOW_FRAG_COMBINE_ID;
    },

    onJieyuanClick: function () {
        cc.log("Jieyuan click");
    },

    onHuodongClick: function () {
        cc.log("Huodong click");
    },

    onShangchengClick: function () {
        cc.log("Shangcheng click");
    }

});

var Widget_HP = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_HP-----loadccb");
    }

});

var Widget_ItemBton = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_ItemBton-----loadccb");
    },

    onUseClick: function() {
        cc.log("use click");
    }

});

var Widget_ItemList = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_ItemList-----loadccb");
    }

});

var Widget_NormalCard = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_NormalCard-----loadccb");
    },

    onCardClick: function () {
        if (gMainScene.getCurCCBController() instanceof Window_CardManager) {
            gMainScene.switchCCBLayer(UI.WINDOW_CARD_DETAIL_ID);
        }
    }

});

var Widget_Power = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_Power-----loadccb");
    }

});

var Widget_PropList = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_PropList-----loadccb");
    }
});

var Widget_Road = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_Road-----loadccb");
    },

    onCardClick: function () {
        if (gMainScene.getCurCCBController() instanceof Window_CardManager) {
            gMainScene.switchCCBLayer(UI.WINDOW_CARD_DETAIL_ID);
        }
    },

    getRoadSize: function() {
        return new cc.Size(this.road.getContentSize().width*this.road_node.getScale(), this.item.getContentSize().height*this.road_node.getScale());
    }

});

var Widget_SmallMap = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_SmallMap-----loadccb");
    },
            
    onCardClick: function() {
        gMainScene.switchCCBLayer(UI.WINDOW_ENTER_BATTLE_LAYER_ID);
    }
});

var Widget_SkillList = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_SkillList-----loadccb");
    }
});

var Widget_LevelNode = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_LevelNode-----loadccb");
    },

    showHunli: function(index, visible) {
        if(index <= 0 || index > conf.MAX_LEVEL_HUNLI_COLLECT) return;
        this['hun'+index].setVisible(visible);
    }
});

