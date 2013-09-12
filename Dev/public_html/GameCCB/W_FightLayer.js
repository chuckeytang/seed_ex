/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var Window_FightLayer = cc.CCBLayer.extend({
    _skillPanel: null,
    _noTouchLayer: null,
    ctor:function() {
        "use strict";
    },
            
    onLoadCCB: function() {
        "use strict";
        
        this.me_card.controller.initWithCard(gBattleField.myTeam.getCard(0));

        this.enemy_card.controller.initWithCard(gBattleField.peerTeam.getCard(0));
        // flip head enemy card
        this.enemy_card.controller.bg.setFlipX(true);

        //set callbacks
        this.my_team.controller.setTeamReadyCallback(this.onMyTeamReady, this);
        this.peer_team.controller.setTeamReadyCallback(this.onPeerTeamReady, this);
        this.peer_team.controller.setAlmostTeamReadyCallback(this.onPeerAlmostReady, this);

        //play animation
        this.my_team.controller.enterBattleField();
        this.strategy_panel.controller.init(true);
        this.strategy_panel.controller.setSelCallback(this.onStrategyClick, this);
        this.strategy_panel.controller.setTouchEmptyCallback(this.onDialogEmptyClick, this);

        this._skillPanel = gMainScene.createDialog(UI.DIALOG_SKILL_DETAIL);
        this._skillPanel.controller.init(true);
        this._skillPanel.controller.setEnabled(false);
        this._skillPanel.controller.setSelCallback(this.onSkillClick, this);
        this._skillPanel.controller.setTouchEmptyCallback(this.onDialogEmptyClick, this);
        this.rootNode.addChild(this._skillPanel, UI.DIALOG_ZORDER_1);
        
        if (IsNull(this._noTouchLayer)) {
            this._noTouchLayer = cc.noTouchLayer.createByPriority(UI.LAYER_NO_TOUCH_LAYER_PRI);
            this.rootNode.addChild(this._noTouchLayer, conf.MAX_LOW_LAYER_ZORDER);
            this._noTouchLayer.setTouchCallback(this.onLayerEmptyClick, this);
        }
    },

    openStrategyPanel: function() {
        this.strategy_panel.controller.open();
    },

    closeStrategyPanel: function() {
        this.strategy_panel.controller.close();
    },

    openSkillPanel: function(pos, type) {
        this._skillPanel.setPosition(pos);
        this._skillPanel.controller.open(type);
    },

    closeSkillPanel: function() {
        this._skillPanel.controller.close();
    },

    onMyTeamReady: function(myTeams) {
        this.peer_team.controller.enterBattleField();
    },

    onPeerAlmostReady: function(peerTeam) {
        gBattleField.prepareRound();
    },

    onPeerTeamReady: function(peerTeam) {

    },

    onStrategyClick: function(strategyPanel) {
        // init skills for gongji, fanshim juqi
        var straNode = strategyPanel.controller[strategyPanel.controller.selStrategy];
        var posInLayer = straNode.getParent().convertToWorldSpace(straNode.getPosition());
        switch(strategyPanel.controller.selStrategy) {
            case conf.STRA_GONGJI_ID:
                this.openSkillPanel(posInLayer, conf.SKILL_TYPE_GONGJI);
                break;
            case conf.STRA_FANSHI_ID:
                this.openSkillPanel(posInLayer, conf.SKILL_TYPE_FANSHI);
                break;
            case conf.STRA_JUQI_ID:
                this.openSkillPanel(posInLayer, conf.SKILL_TYPE_JUQI);
                break;
        }
        this.closeStrategyPanel();
    },

    onSkillClick: function(skillBton) {
        this.closeSkillPanel();
        gBattleField.roundBegin();
    },

    onDialogEmptyClick: function(dialog) {
        if(dialog === this.strategy_panel) {
            this.strategy_panel.controller.close();
        }
        else if(dialog === this._skillPanel) {
            this._skillPanel.controller.close();
            this.strategy_panel.controller.open();
        }
    },

    onLayerEmptyClick: function(layer) {
        this.strategy_panel.controller.open();
    },

    // behavior
    pumpGainedCard: function(card) {
        
    }
    ,
    // pcnt - how much percent does this gain projects to the total exp of this level
    pumpGainedExp: function(expNum, pcnt) {

    }
    ,
    // pcnt - how much percent does this cd points counted to its total cd time
    pumpGainedFabaoCD: function(cdNum, pcnt) {

    }
    ,
    // pcnt - how much percent does this skill point counted to its total skill point of this level
    showGainedSkillPoint: function(skillPoint, pcnt) {
        
    }
});

