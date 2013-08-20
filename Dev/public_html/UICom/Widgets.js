var Widget_HP = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_HP-----loadccb");
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

var Widget_FabaoList = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_FabaoList-----loadccb");
    }

});

var Widget_PropList = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_PropList-----loadccb");
    },
            
    onPropClick: function(btn) {
        cc.log("prop");
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

var Widget_RoadNode = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_RoadNode-----loadccb");
    }

});

var Widget_Road = cc.CCBLayer.extend({
    onLoadCCB: function () {
        cc.log("Widget_Road-----loadccb");
    }

});
