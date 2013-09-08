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
    _card: null,
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
    },

    initWithCard: function(card) {
        this._card = card;
        if(IsNull(card)) {
            // empty card
            this.changeCardBg(conf.EMPTY_CARD_BG);
            this.card_chr.setVisible(false);
        }
        else if(card.mith === true) {
            // mith card
            this.card_chr.setVisible(true);
            this.card_chr.setTexture(cc.TextureCache.getInstance().addImage('UI/Card/card_'+conf.CARD_MITH_PIC));
            this.changeCardBg(conf.MITH_MONSTER_BG);
        }
        else if(card instanceof cd.PlayerCard) {
            // player card
            var cardid = card.getCardID();
            var charPic = cardid.substring(2).toLowerCase();
            this.changeCharAvartar(charPic);
            this.changeCardBg(conf.PLAYER_CARD_BG);
            this.card_chr.setVisible(true);
        }
        else if(card instanceof cd.MonsterCard) {
            // monster card
            var monid = card.getMonsterID();
            var charPic = monid.substring(2).toLowerCase();
            this.changeCharAvartar(charPic);
            this.card_chr.setVisible(true);

            var monType = card.getMonsterType();
            //change card background
            switch(monType) {
                case conf.PUTONG_ATTACK:
                case conf.PUTONG_RECOVER:
                case conf.PUTONG_AGILE:
                case conf.PUTONG_DEFENSE: {
                    this.changeCardBg(conf.PUTONG_MONSTER_BG);
                }
                    break;
                case conf.JINGYING_ATTACK:
                case conf.JINGYING_RECOVER:
                case conf.JINGYING_AGILE:
                case conf.JINGYING_DEFENSE: {
                    this.changeCardBg(conf.JINGYING_MONSTER_BG);
                }
                    break;
                case conf.BOSS_ATTACK:
                case conf.BOSS_RECOVER:
                case conf.BOSS_AGILE:
                case conf.BOSS_DEFENSE: {
                    this.changeCardBg(conf.BOSS_MONSTER_BG);
                }
                    break;
            }
        }
    }
    ,
    onCardClick: function(btn){
        cc.log("FightCard click");
        if(gMainScene.getCurCCBController() instanceof Window_SmallMap) {
            gPlayer.playingLevel = this['_level'];       //mark data
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
        if(this._card instanceof cd.PlayerCard) {
            this.card_chr.setTexture(cc.TextureCache.getInstance().addImage('UI/Card/card_'+picName+'.png'));
        }
        else if(this._card instanceof cd.MonsterCard) {
            this.card_chr.setTexture(cc.TextureCache.getInstance().addImage('UI/Monster/monster_'+picName+'.png'));
        }
    },

    changeCardBg: function(bgName) {
        this.bg.setNormalImage(cc.Sprite.createWithTexture(cc.TextureCache.getInstance().addImage('UI/Card/'+bgName)));
        this.bg.setSelectedImage(cc.Sprite.createWithTexture(cc.TextureCache.getInstance().addImage('UI/Card/'+bgName)));
        this.bg.setDisabledImage(cc.Sprite.createWithTexture(cc.TextureCache.getInstance().addImage('UI/Card/'+bgName)));
    },

    setUserData: function(varName, varValue) {
        this[varName] = varValue;
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
    _item: null,         //model
    _itemClickCallback: null,
    onLoadCCB: function () {
        cc.log("Widget_ItemBton-----loadccb");
    },

    initWithItem: function(item, num) {
        this.num.setString("");
        this.equipped(item, num);
    },

    getWidgetSize: function() {
        return this.bg.getContentSize();
    },

    isEmpty: function() {
        return !this.content.isVisible();
    },

    empty: function() {
        this.num.setVisible(false);
        this.content.setVisible(false);
        this.changePropFrame(conf.ITEM_WHITE_FR);
        this.bg.setTexture(cc.TextureCache.getInstance().addImage('UI/Icon/'+conf.FABAO_BLACK_BG));
        this._item = null;
    },

    setItemClickCallback: function(callback) {
        this._itemClickCallback = callback;
    },

    onUseClick: function (btn) {
        if(NotNull(this._itemClickCallback)) {
            this._itemClickCallback.call(gMainScene.getCurCCBController(), this.rootNode);
        }
    },

    getItemObj: function() {
        return this._item;
    },

    equipped: function(item, num) {
        if(NotNull(this._item) && this._item) {
            if(this._item instanceof pp.FabaoFrag) {

            }
            else if (this._item instanceof pp.Prop){
                if(!(item instanceof pp.Prop) || (this._item.getPropID() !== item.getPropID())) {
                    cc.Assert("not same item, can not equip");
                    return;
                }
            }
        }

        if(IsNull(num)) num = 1;
        
        this.setEnabled(true);

        this._item = item;
        this.setEnabled(true);
        if(IsNull(this._item)) {
            this.empty();
        }
        else if(this._item instanceof pp.FabaoFrag) {

        }
        else if (this._item instanceof pp.Prop){
            var propid = this._item.getPropID();
            var propPic = propid.substring(2).toLowerCase();
            this.changeContent(propPic);
            this.content.setVisible(true);
            var curNum = this.toValue(this.num.getString())+num;
            this.num.setString(curNum);
            if(curNum <= 0) {
                this.num.setVisible(false);
                this.setEnabled(false);
            }
            else if(curNum === 1) {
                this.num.setVisible(false);
            }
            else
                this.num.setVisible(true);
        }
    },

    unequipped: function(empty) {
        if(!this.isEnabled()) {
            cc.Assert("you don't have any item now");
            return;
        }
        var curItem = this.getItemObj();
        var curNum = this.toValue(this.num.getString())-1;
        this.num.setString(curNum);
        if(curNum === 0) {
            // the last one
            if(empty)
               this.empty();
            else
               this.setEnabled(false);
        }
        return curItem;
    },

    setEnabled: function(bEnabled) {
        this.frame.setEnabled(bEnabled);
        this.gray.setVisible(!bEnabled);
    },

    isEnabled: function() {
        return this.frame.isEnabled();
    },

    changePropFrame: function(frName) {
        this.frame.setNormalImage(cc.Sprite.createWithTexture(cc.TextureCache.getInstance().addImage('UI/Icon/'+frName)));
        this.frame.setSelectedImage(cc.Sprite.createWithTexture(cc.TextureCache.getInstance().addImage('UI/Icon/'+frName)));
        this.frame.setDisabledImage(cc.Sprite.createWithTexture(cc.TextureCache.getInstance().addImage('UI/Icon/'+frName)));
    },

    changeContent: function(picName) {
        this.content.setTexture(cc.TextureCache.getInstance().addImage('UI/Item/img_'+picName+'.png'));
    }

});

var Widget_ItemList = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_ItemList-----loadccb");
    }

});

var Widget_NormalCard = cc.CCBLayer.extend({
    _card: null,

    _cardClickCallback: null,
    onLoadCCB: function () {
        cc.log("Widget_NormalCard-----loadccb");
        this._hideAllInfo();
    },

    initWithCard: function(card) {
        this.equipped(card);
    },

    isEmpty: function() {
        return IsNull(this._card);
    },

    empty: function() {
        this._card = null;
        this.changeCardBg(conf.EMPTY_CARD_BG);
        this.card_chr.setVisible(false);
    },

    getCardObj: function() {
        return this._card;
    },

    setCardClickCallback: function(callback) {
        this._cardClickCallback = callback;
    },

    getWidgetSize: function() {
        return this.card_bg.getContentSize();
    },

    changeCharAvartar: function(picName) {
        if(this._card instanceof cd.PlayerCard) {
            this.card_chr.setTexture(cc.TextureCache.getInstance().addImage('UI/Card/card_'+picName+'.png'));
        }
        else if(this._card instanceof cd.MonsterCard) {
            this.card_chr.setTexture(cc.TextureCache.getInstance().addImage('UI/Monster/monster_'+picName+'.png'));
        }
    },

    equipped: function(card) {
        this.setEnabled(true);
        this._card = card;
        if(IsNull(card)) {
            // empty card
            this.empty();
        }
        else if(card.mith === true) {
            // mith card
            this.card_chr.setTexture(cc.TextureCache.getInstance().addImage('UI/Card/card_'+conf.CARD_MITH_PIC));
            this.changeCardBg(conf.MITH_MONSTER_BG);
            this.card_chr.setVisible(true);
        }
        else if(card instanceof cd.PlayerCard) {
            // player card
            var cardid = card.getCardID();
            var charPic = cardid.substring(2).toLowerCase();
            this.changeCharAvartar(charPic);
            this.changeCardBg(conf.PLAYER_CARD_BG);
            this.card_chr.setVisible(true);
        }
        else if(card instanceof cd.MonsterCard) {
            // monster card
            var monid = card.getMonsterID();
            var charPic = monid.substring(2).toLowerCase();
            this.changeCharAvartar(charPic);
            this.card_chr.setVisible(true);

            var monType = card.getMonsterType();
            //change card background
            switch(monType) {
                case conf.PUTONG_ATTACK:
                case conf.PUTONG_RECOVER:
                case conf.PUTONG_AGILE:
                case conf.PUTONG_DEFENSE: {
                    this.changeCardBg(conf.PUTONG_MONSTER_BG);
                }
                    break;
                case conf.JINGYING_ATTACK:
                case conf.JINGYING_RECOVER:
                case conf.JINGYING_AGILE:
                case conf.JINGYING_DEFENSE: {
                    this.changeCardBg(conf.JINGYING_MONSTER_BG);
                }
                    break;
                case conf.BOSS_ATTACK:
                case conf.BOSS_RECOVER:
                case conf.BOSS_AGILE:
                case conf.BOSS_DEFENSE: {
                    this.changeCardBg(conf.BOSS_MONSTER_BG);
                }
                    break;
            }
        }
    },

    unequipped: function(empty) {
        var curCard = this.getCardObj();
        if(empty)
            this.empty();
        else
            this.setEnabled(false);
        return curCard;
    },

    isSelected: function() {
        return this.highlight.isVisible();
    },

    selected: function() {
        this.highlight.setVisible(true);
    },

    unselected: function() {
        this.highlight.setVisible(false);
    },

    setEnabled: function(bEnabled) {
        if(!bEnabled)
            this.unselected();
        this.card_bg.setEnabled(bEnabled);
        this.gray.setVisible(!bEnabled);
    },

    isEnabled: function() {
        return this.card_bg.isEnabled();
    },

    changeCardBg: function(bgName) {
        this.card_bg.setNormalImage(cc.Sprite.createWithTexture(cc.TextureCache.getInstance().addImage('UI/Card/'+bgName)));
        this.card_bg.setSelectedImage(cc.Sprite.createWithTexture(cc.TextureCache.getInstance().addImage('UI/Card/'+bgName)));
        this.card_bg.setDisabledImage(cc.Sprite.createWithTexture(cc.TextureCache.getInstance().addImage('UI/Card/'+bgName)));
    },

    onCardClick: function (btn) {
        if(NotNull(this._cardClickCallback)) {
            this._cardClickCallback.call(gMainScene.getCurCCBController(), this.rootNode);
        }
    },

    _hideAllInfo: function() {
        this.left_time.setVisible(false);
        this.card_num.setVisible(false);
        this.stars.setVisible(false);
        this.property.setVisible(false);
        this.highlight.setVisible(false);
        this.gray.setVisible(false);
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

    hideTemplateNodes: function() {
        this.nodes.setVisible(false);
        this.roads.setVisible(false);
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

    initWithCard: function(card) {
        this.card.controller.initWithCard(card);
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
    },

    markLevelID: function(level) {
        this.card.controller.setUserData('_level', level);
    }
});

