var DialogBase = cc.CCBLayer.extend({
    _noTouchLayer: null,
    ctor: function() {
    },

    init: function(throwTouches) {
        if (throwTouches && IsNull(this._noTouchLayer)) {
            this._noTouchLayer = cc.noTouchLayer.createByPriority(UI.NO_TOUCH_LAYER_PRIORITY);
            this.rootNode.addChild(this._noTouchLayer, conf.MAX_LOW_LAYER_ZORDER);
        }
    },

    setTouchEmptyCallback: function(callback, target) {
        if(NotNull(this._noTouchLayer))
            this._noTouchLayer.setTouchCallback(callback, target);
    },

    setEnabled: function(enable) {
        this._noTouchLayer.setEnabled(enable);
    }
});

var Dialog_Common1 = DialogBase.extend({
    onLoadCCB: function () {
        cc.log("Dialog_Common1-----loadccb");
    }
});

var Dialog_Common2 = DialogBase.extend({
    onLoadCCB: function () {
        cc.log("Dialog_Common2-----loadccb");
    }
});

var Dialog_FabaoDetail = DialogBase.extend({
    onLoadCCB: function () {
        cc.log("Dialog_FabaoDetail-----loadccb");
    }
});

var Dialog_PropDetail = DialogBase.extend({
    onLoadCCB: function () {
        cc.log("Dialog_PropDetail-----loadccb");
    }
});

var Dialog_SkillDetail = DialogBase.extend({
    _curSkillset: null,
    _selCallback: null,
    _selTarget: null,

    onLoadCCB: function () {
        cc.log("Dialog_SkillDetail-----loadccb");
        for(var i=1; i<=Dialog_SkillDetail.SKILL_SET3; i++) {
            for(var j=1; j<=i; j++) {
                this['skill'+i+'_'+j].controller.setBtonClickCallback(this.onSkillClick, this);
            }
         }
    },

    setEnabled: function(enable) {
        DialogBase.prototype.setEnabled.call(this, enable);
        if(this._curSkillset === Dialog_SkillDetail.SKILL_SET_ALL) {
            for(var i=0; i<skillset; i++) {
                this.setEnabled(enable, i+1);
            }
        }
        else if(this._curSkillset > Dialog_SkillDetail.SKILL_SET_ALL && this._curSkillset <= Dialog_SkillDetail.SKILL_SET3) {
            for(var i=0; i<this._curSkillset; i++) {
                this['skill'+this._curSkillset+'_'+(i+1)].controller.setEnabled(enable);
            }
        }
    },

    setSelCallback: function(callback, target) {
        this._selCallback = callback;
        this._selTarget = target;
    },

    onSkillClick: function(skillBton) {
        if(NotNull(this._selCallback)) {
            if(NotNull(this._selTarget))
                this._selCallback.call(this._selTarget, this.rootNode);
            else
                this._selCallback.call(gMainScene.getCurCCBController(), this.rootNode);
        }
    },

    // skillType - Gongji, Fanshi, Juqi
    open: function(skillType, skills) {
        if(IsNull(skills)) 
            this._curSkillset = 1;
        else
            this._curSkillset = skills.length+1;

        for(var i=0; i<Dialog_SkillDetail.SKILL_SET3; i++) {
            this['skill_set_'+(i+1)].setVisible(false);
        }
        this['skill_set_'+this._curSkillset].setVisible(true);
        switch(skillType) {
            case conf.SKILL_TYPE_GONGJI:
                this['skill'+this._curSkillset+'_1'].controller.changeContent(conf.STRA_GONGJI_ICON);
                break;
            case conf.SKILL_TYPE_FANSHI:
                this['skill'+this._curSkillset+'_1'].controller.changeContent(conf.STRA_FANSHI_ICON);
                break;
            case conf.SKILL_TYPE_JUQI:
                this['skill'+this._curSkillset+'_1'].controller.changeContent(conf.STRA_JUQI_ICON);
                break;
        }

        switch(this._curSkillset) {
            case Dialog_SkillDetail.SKILL_SET1: {
                this.playAnimation('one_skill_expand');
            }
                break;
            case Dialog_SkillDetail.SKILL_SET2: {
                this.playAnimation('two_skill_expand');
            }
                break;
            case Dialog_SkillDetail.SKILL_SET3: {
                this.playAnimation('three_skill_expand');
            }
                break;
        }

        if(this._curSkillset > Dialog_SkillDetail.SKILL_SET_ALL && this._curSkillset <= Dialog_SkillDetail.SKILL_SET3) {
            for(var i=0; i<this._curSkillset; i++) {
                this['skill'+this._curSkillset+'_'+(i+1)].controller.appear();
            }
        }

        this.setEnabled(true);
    },

    close: function() {
        switch(this._curSkillset) {
            case Dialog_SkillDetail.SKILL_SET1: {
                this.playAnimation('one_skill_close');
            }
                break;
            case Dialog_SkillDetail.SKILL_SET2: {
                this.playAnimation('two_skill_close');
            }
                break;
            case Dialog_SkillDetail.SKILL_SET3: {
                this.playAnimation('three_skill_close');
            }
                break;
        }

        if(this._curSkillset > Dialog_SkillDetail.SKILL_SET_ALL && this._curSkillset <= Dialog_SkillDetail.SKILL_SET3) {
            for(var i=0; i<this._curSkillset; i++) {
                this['skill'+this._curSkillset+'_'+(i+1)].controller.disappear();
            }
        }

        this.setEnabled(false);
        this._curSkillset = null;
    },

    closeCallback: function() {
        for(var i=0; i<Dialog_SkillDetail.SKILL_SET3; i++) {
            this['skill_set_'+(i+1)].setVisible(false);
        }
    }
});
Dialog_SkillDetail.SKILL_SET_ALL = 0;
Dialog_SkillDetail.SKILL_SET1 = 1;
Dialog_SkillDetail.SKILL_SET2 = 2;
Dialog_SkillDetail.SKILL_SET3 = 3;

var Dialog_StrategySelection = DialogBase.extend({
    _selCallback: null,
    _selTarget: null,

    selStrategy: null,
    onLoadCCB: function () {
        this.gongji.controller.setBtonClickCallback(this.onGongjiClick, this);
        this.gongji.controller.changeContent(conf.STRA_GONGJI_ICON);
        this.fanshi.controller.setBtonClickCallback(this.onFanshiClick, this);
        this.fanshi.controller.changeContent(conf.STRA_FANSHI_ICON);
        this.juqi.controller.setBtonClickCallback(this.onJuqiClick, this);
        this.juqi.controller.changeContent(conf.STRA_JUQI_ICON);
    },

    setSelCallback: function(callback, target) {
        this._selCallback = callback;
        this._selTarget = target;
    },

    setEnabled: function(enable) {
        DialogBase.prototype.setEnabled.call(this, enable);
        this.juqi.controller.setEnabled(enable);
        this.fanshi.controller.setEnabled(enable);
        this.gongji.controller.setEnabled(enable);
    },

    open: function() {
        this.playAnimation('expand');
        this.setEnabled(true);
    },

    close: function() {
        this.playAnimation('close');
        this.setEnabled(false);
    },

    onGongjiClick: function(fightBton) {
        this.selStrategy = conf.STRA_GONGJI_ID;
        this._onSel(fightBton);
    },

    onFanshiClick: function(fightBton) {
        this.selStrategy = conf.STRA_FANSHI_ID;
        this._onSel(fightBton);
    },

    onJuqiClick: function(fightBton) {
        this.selStrategy = conf.STRA_JUQI_ID;
        this._onSel(fightBton);
    },

    _onSel: function(fightBton) {
        if(NotNull(this._selCallback)) {
            if(NotNull(this._selTarget))
                this._selCallback.call(this._selTarget, this.rootNode);
            else
                this._selCallback.call(gMainScene.getCurCCBController(), this.rootNode);
        }
    }


});
