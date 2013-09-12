var PreBattlePropSVContainer = ScrollViewContainer.extend({
    ctor : function() {
        "use strict";
        this._super();
    }
});

var PreBattleEnemySVContainer = ScrollViewContainer.extend({
    ctor : function() {
        "use strict";
        this._super();
    }
});

var PreBattleCandidateSVContainer = ScrollViewContainer.extend({
    ctor : function() {
        "use strict";
        this._super();
    }
});

var PreBattleOnBoardSVContainer = ScrollViewContainer.extend({
    ctor : function() {
        "use strict";
        this._super();
    }
});

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var Window_EnterBattleLayer = cc.CCBLayer.extend({
    _candidateContainer:null,
    _onbattleContainer:null,
    _enemyContainer:null,
    _propContainer:null,

    _candidateList:null,
    _onbattleList:null,
    _enemyList:null,
    _propList:null,

    _curSelectedOnboardCard: null,

    ctor:function() {
        "use strict";
        //this._super();
    },
            
    onLoadCCB: function() {
        "use strict";
        cc.log("Window_EnterBattleLayer loaded --- ccbi");
        this._enemyContainer = new PreBattleEnemySVContainer;
        this._enemyContainer.InitWithScrollView(this.enemy_list, new cc.Size(10, 0), new cc.Color4B(255,255,255,0));

        this._candidateContainer = new PreBattleCandidateSVContainer;
        this._candidateContainer.InitWithScrollView(this.candidate_list, new cc.Size(10, 0), new cc.Color4B(255,255,255,0));

        this._onbattleContainer = new PreBattleOnBoardSVContainer;
        this._onbattleContainer.InitWithScrollView(this.on_board_list, new cc.Size(10, 0), new cc.Color4B(255,255,255,0));

        this._propContainer = new PreBattlePropSVContainer;
        this._propContainer.InitWithScrollView(this.prop_list, new cc.Size(10, 0), new cc.Color4B(255,255,255,0));

        this._candidateList = new Array();
        this._onbattleList = new Array();
        this._enemyList = new Array();
        this._propList = new Array();

    },

    release: function() {
        this._enemyContainer.clearAllItem();
        this._candidateContainer.clearAllItem();
        this._onbattleContainer.clearAllItem();
        this._propContainer.clearAllItem();
        this._curSelectedOnboardCard = null;

        this._candidateList.clear();
        this._onbattleList.clear();
        this._enemyList.clear();
        this._propList.clear();
    },

    init: function() {

        var zone = gMap.getZone(gPlayer.playingZone);           //ZoneMap
        var levelNode = zone.getLevel(gPlayer.playingLevel);    //LevelNode
        var enemyList;
        var onBoardNum;
        switch(levelNode.getCurChallengeTimes()) {
            case 0: {
                enemyList = levelNode.get1stMons();
                onBoardNum = levelNode.get1stFightCardNum();
            }
                break;
            case 1: {
                enemyList = levelNode.get2ndMons();
                onBoardNum = levelNode.get2ndFightCardNum();
            }
                break;
            default: {
                enemyList = levelNode.get3rdMons();
                onBoardNum = levelNode.get3rdFightCardNum();
            }
                break;
        }
        if (IsNull(enemyList) || IsNull(onBoardNum)) return;

        var cardSize;
        var enemyContentSize;
        var cardDis = this._enemyContainer.getController().next_card.getPosition().x - this._enemyContainer.getController().start_card.getPosition().x;
        for(var i=0; i<enemyList.length; i++) {
            var monsterCard = enemyList[i];
            var node = cc.Node.create();
            var card = gMainScene.createWidget(UI.WIDGET_NORMAL_CARD);
            card.type = Window_EnterBattleLayer.ENEMY_CARD;
            card.controller.initWithCard(monsterCard);
            card.controller.setCardClickCallback(this.onEnemyCardClick, this);
            if(IsNull(enemyContentSize)) {
                cardSize = new cc.Size(card.controller.getWidgetSize().width*this._enemyContainer.getController().start_card.getScaleX(), card.controller.getWidgetSize().height*this._enemyContainer.getController().start_card.getScaleY());
                enemyContentSize = new cc.Size(cardSize.width, cardSize.height);
            }
            card.setPosition(this._enemyContainer.getController().card_body1.getPosition());
            node.addChild(card,0,1);
            node.setScale(this._enemyContainer.getController().start_card.getScale());
            node.setPosition(cc.pAdd(this._enemyContainer.getController().start_card.getPosition(), cc.p(cardDis*i, 0)));

            enemyContentSize.width += cardDis;
            this._enemyContainer.addItem(node);
            this._enemyList.push(card);
        }
        this._enemyContainer.setInnerSize(enemyContentSize);

        var candidateContentSize;
        var cardPackage = gPlayer.getCardPackage();
        var i=0;
        for(var id in cardPackage) {
            if(id.search('C_') === -1) continue;

            var node = cc.Node.create();
            var card = gMainScene.createWidget(UI.WIDGET_NORMAL_CARD);
            card.type = Window_EnterBattleLayer.CANDIDATE_CARD;
            card.controller.initWithCard(cardPackage[id][Player.CARD_OBJ_INDEX]);
            card.controller.setCardClickCallback(this.onCandidateCardClick, this);

            if(IsNull(candidateContentSize)) {
                candidateContentSize = new cc.Size(cardSize.width, cardSize.height);
            }
            card.setPosition(this._candidateContainer.getController().card_body1.getPosition());
            node.addChild(card,0,1);
            node.setScale(this._candidateContainer.getController().start_card.getScale());
            node.setPosition(cc.pAdd(this._candidateContainer.getController().start_card.getPosition(), cc.p(cardDis*i, 0)));

            candidateContentSize.width += cardDis;
            this._candidateContainer.addItem(node);
            this._candidateList.push(card);
            i++;
        }
        this._candidateContainer.setInnerSize(candidateContentSize);

        var onBoardContentSize;
        for(var i=0; i<onBoardNum; i++) {
            var node = cc.Node.create();
            var card = gMainScene.createWidget(UI.WIDGET_NORMAL_CARD);
            card.type = Window_EnterBattleLayer.ONBOARD_CARD;
            card.controller.initWithCard();
            card.controller.setCardClickCallback(this.onBoardCardClick, this);

            var prop = gMainScene.createWidget(UI.WIDGET_ITEM_BTON);
            prop.controller.initWithItem();
            prop.setVisible(false);
            card.prop = prop;       // bind prop to the on board card
            if(i === 0) {
                this._curSelectedOnboardCard = card;
                this._curSelectedOnboardCard.controller.selected();
            }

            if(IsNull(onBoardContentSize)) {
                onBoardContentSize = new cc.Size(cardSize.width, cardSize.height);
            }
            card.setPosition(this._onbattleContainer.getController().card_body1.getPosition());
            prop.setPosition(this._onbattleContainer.getController().equip_item1.getPosition());
            node.addChild(card,0,1);
            node.addChild(prop,0,2);
            node.setScale(this._onbattleContainer.getController().start_card.getScale());
            node.setPosition(cc.pAdd(this._onbattleContainer.getController().start_card.getPosition(), cc.p(cardDis*i, 0)));

            onBoardContentSize.width += cardDis;
            this._onbattleContainer.addItem(node);
            this._onbattleList.push(card);
        }
        this._onbattleContainer.setInnerSize(onBoardContentSize);

        // prop
        var propContentSize;
        var propPackage = gPlayer.getPropPackage();
        var propSize = new cc.Size();
        var propDis = this._propContainer.getController().second_item.getPosition().y - this._propContainer.getController().start_item.getPosition().y;
        var propnode = cc.Node.create();
        i = 0;
        for(var id in propPackage) {
            if(id.search('P_') === -1) continue;

            var prop = gMainScene.createWidget(UI.WIDGET_ITEM_BTON);
            prop.controller.initWithItem(propPackage[id][Player.PROP_OBJ_INDEX], propPackage[id][Player.PROP_NUM_INDEX]);
            prop.controller.setItemClickCallback(this.onPropClick);

            if(IsNull(propSize)) {
                propSize = new cc.Size(prop.controller.getWidgetSize().width, prop.controller.getWidgetSize().height);
            }

            if(IsNull(propContentSize)) {
                propContentSize = new cc.Size(propSize.width, propSize.height);
            }
            prop.setPosition(cc.pAdd(this._propContainer.getController().start_item.getPosition(), cc.p(0, propDis*i)));
            propnode.addChild(prop);

            propContentSize.height += (-propDis);
            this._propList.push(prop);
            i++;
        }
        this._propContainer.addItem(propnode);
        var origPropInnerSize = this._propContainer.getInnerSize();
        if(origPropInnerSize.height < propContentSize.height)
            this._propContainer.setInnerSize(propContentSize);
    },
            
    onFightClick: function() {
        var cardIDs = new Array();
        for(var i=0; i<this._onbattleList.length; i++) {
            var card = this._onbattleList[i].controller.getCardObj();
            if(NotNull(card))
                cardIDs.push(card.getCardID());
        }
        gPlayer.enterBattleField(cardIDs);
        this._switchMenuID = UI.WINDOW_FIGHT_LAYER_ID;
    },

    onPropClick: function(prop) {
        if(IsNull(this._curSelectedOnboardCard) || !this._curSelectedOnboardCard.prop.controller.isVisible())
            return;

        if(!this._curSelectedOnboardCard.prop.controller.isEmpty()) {
            //unload the previous prop first
            for (var i=0; i<this._propList.length; ++i){
                if(this._curSelectedOnboardCard.prop.controller.getItemObj() === this._propList[i].controller.getItemObj()) {
                    this._propList[i].controller.equipped(this._curSelectedOnboardCard.prop.controller.unequipped(true));
                    break;
                }
            }
        }
        this._curSelectedOnboardCard.prop.controller.equipped(prop.controller.unequipped());
    },

    onCandidateCardClick: function(card) {
        if(!(card.controller instanceof Widget_NormalCard))
            return;

        // enable all candidate cards first
        for(var i=0; i<this._candidateList.length; i++) {
            var otherCard = this._candidateList[i];
            if(!otherCard.controller.isEnabled() && otherCard.controller.getCardObj() === this._curSelectedOnboardCard.controller.getCardObj()) {
                otherCard.controller.setEnabled(true);
            }
        }
        this._curSelectedOnboardCard.controller.equipped(card.controller.unequipped());
        this._curSelectedOnboardCard.prop.setVisible(true);
    },

    onBoardCardClick: function(card) {
        if(!(card.controller instanceof Widget_NormalCard))
            return;

        if(card === this._curSelectedOnboardCard) {
            // unload prop first
            if(NotNull(card.prop)) {
                for (var i=0; i<this._propList.length; ++i){
                    if(card.prop.controller.getItemObj() === this._propList[i].controller.getItemObj()) {
                        this._propList[i].controller.equipped(card.prop.controller.unequipped(true));
                        return;
                    }
                }
            }

            // unload selected card
            if(!this._curSelectedOnboardCard.controller.isEmpty()) {
                for (var i=0; i<this._candidateList.length; ++i){
                    if(this._curSelectedOnboardCard.controller.getCardObj() === this._candidateList[i].controller.getCardObj()) {
                        this._candidateList[i].controller.equipped(this._curSelectedOnboardCard.controller.unequipped(true));
                        this._curSelectedOnboardCard.prop.setVisible(false);
                        return;
                    }
                }
            }
        }
        else {
            // choose this card
            for(var i=0; i<this._onbattleList.length; i++) {
                var otherCard = this._onbattleList[i];
                if(otherCard.controller.isSelected()) {
                    otherCard.controller.unselected();
                }
            }
            this._curSelectedOnboardCard = card;
            this._curSelectedOnboardCard.controller.selected();
        }

    },

    onEnemyCardClick: function(card) {
        if(!(card.controller instanceof Widget_NormalCard))
            return;
    }
});

Window_EnterBattleLayer.ENEMY_CARD = 'EnemyCard';
Window_EnterBattleLayer.CANDIDATE_CARD = 'CandidateCard';
Window_EnterBattleLayer.ONBOARD_CARD = 'OnBoardCard';