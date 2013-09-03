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
    },

    getWidgetSize: function() {
        return this.bg.getContentSize();
    },

    setPlayerCard: function(card) {

    },

    setMonsterCard: function(card) {

    },

    changeCharAvartar: function(picName) {
        this.card_chr.setTexture(cc.TextureCache.getInstance().addImage('UI/Monster/monster_'+picName+'.png'));
    },

    changeCardBg: function(bgName) {
        this.bg.setNormalImage(cc.Sprite.createWithTexture(cc.TextureCache.getInstance().addImage('UI/Card/'+bgName)));
        this.bg.setSelectedImage(cc.Sprite.createWithTexture(cc.TextureCache.getInstance().addImage('UI/Card/'+bgName)));
        this.bg.setDisabledImage(cc.Sprite.createWithTexture(cc.TextureCache.getInstance().addImage('UI/Card/'+bgName)));
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
    startNode: null,
    endNode: null,
    type: null,
    onLoadCCB: function () {
        cc.log("Widget_Road-----loadccb");
    },

    init: function(startNode, endNode, type) {
        this.startNode = startNode;
        this.endNode = endNode;
        this.type = type;
    },

    onCardClick: function () {
        if (gMainScene.getCurCCBController() instanceof Window_CardManager) {
            gMainScene.switchCCBLayer(UI.WINDOW_CARD_DETAIL_ID);
        }
    },

    getWidgetSize: function() {
        return new cc.Size(this.road.getContentSize().width*this.road_node.getScale(), this.lock.getContentSize().height*this.road_node.getScale());
    },

    rotate: function(degree) {
        this.road_node.setRotation(degree);
        this.lock.setRotation(-degree);
    },

    showLock: function(visible) {
        this.lock.setVisible(visible);
    }
});
Widget_Road.TO_LEFT = 0;
Widget_Road.TO_RIGHT = 1;
Widget_Road.TO_TOP = 2;
Widget_Road.TO_BOTTOM = 3;

var Widget_SmallMap = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_SmallMap-----loadccb");
    },
            
    onCardClick: function() {
        gMainScene.switchCCBLayer(UI.WINDOW_ENTER_BATTLE_LAYER_ID);
    },

    clearTemplateNodes: function() {
        this.nodes.removeFromParent(true);
        this.roads.removeFromParent(true);
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
    },

    getWidgetSize: function() {
        var size = new cc.Size();
        size.width = this.card.controller.getWidgetSize().width*this.card.getScaleX()*this.road_node.getScaleX();
        size.height = (this.card.controller.getWidgetSize().height*this.card.getScaleY()*0.5 +
            (this.hun1.getPosition().y-this.card.getPosition().y) +
            this.hun1.getContentSize().height*this.hun1.getScaleY()) * this.road_node.getScaleY();
        return size;
    },

    getCardSize: function() {
        return new cc.Size(this.card.controller.getWidgetSize().width*this.road_node.getScaleX(), this.card.controller.getWidgetSize().height*this.road_node.getScaleY());
    },

    changeCharAvartar: function(picName) {
        this.card.controller.changeCharAvartar(picName);
    },

    changeCardBg: function(bgName) {
        this.card.controller.changeCardBg(bgName);
    }
});

