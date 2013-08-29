var Widget_CardList1 = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_CardList1-----loadccb");
    },

    onCardClick: function () {
        cc.log("card click");
    }

});

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
        if (gMainScene.getCurCCBLayer() instanceof Window_EnterBattleLayer) {
        }
        else if (gMainScene.getCurCCBLayer() instanceof Window_SmallMap) {
            gMainScene.switchCCBLayer(UI.ENTER_BATTLE_LAYER_ID);
        }
    }
});

var Widget_FightCard = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_FightCard-----loadccb");
    }
    ,
    onCardClick: function(){
        cc.log("card click");
    }
});

var Widget_GuideBar = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_GuideBar-----loadccb");
    },

    onDuiwuClick: function () {
        cc.log("Duiwu click");
    },

    onQujingClick: function () {
        cc.log("Qujing click");
    },

    onJubaoClick: function () {
        cc.log("Jubao click");
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
        if (gMainScene.getCurCCBLayer() instanceof Window_CardManager) {
            gMainScene.switchCCBLayer(UI.CARD_DETAIL_ID);
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
        if (gMainScene.getCurCCBLayer() instanceof Window_CardManager) {
            gMainScene.switchCCBLayer(UI.CARD_DETAIL_ID);
        }
    }

});

var Widget_SmallMap = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_SmallMap-----loadccb");
    },
            
    onCardClick: function() {
        gMainScene.switchCCBLayer(UI.ENTER_BATTLE_LAYER_ID);
    }
});

var Widget_SkillList = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_SkillList-----loadccb");
    }
});

