var PlayerBagCardSVContainer = ScrollViewContainer.extend({
    ctor : function() {
        "use strict";
        this._super();
    }
});

var PlayerBagPropSVContainer = ScrollViewContainer.extend({
    ctor : function() {
        "use strict";
        this._super();
    }
});

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var Window_PlayerBag = cc.CCBLayer.extend({
    propContainer:null,
    cardContainer:null,
            
    ctor:function() {
        "use strict";
        this._super();
    },
            
    onLoadCCB: function() {
        "use strict";
        cc.log("Window_PlayerBag loaded --- ccbi");
        this.propContainer = new PlayerBagPropSVContainer;
        this.propContainer.InitWithScrollView(this.prop_list,cc.size(0, 10), new cc.Color4B(255,255,255,0));
        this.propContainer.AddItem(globalUITool.CloneNodeGraph(this.propContainer.GetController().pantao));
        this.propContainer.AddItem(globalUITool.CloneNodeGraph(this.propContainer.GetController().huanhundan));
        
        this.cardContainer = new PlayerBagCardSVContainer;
        this.cardContainer.InitWithScrollView(this.card_list,cc.size(10, 0), new cc.Color4B(255,255,255,0));
        this.cardContainer.AddItem(globalUITool.CloneNodeGraph(this.cardContainer.GetController().start_card));
    },
            
    onCardClick: function() {
        gMainScene.switchCCBLayer(UI.CARD_MANAGER_ID);
    },
            
    onSmallMapClick: function() {
        gMainScene.switchCCBLayer(UI.SMALL_MAP);
    },
            
    onUseClick: function() {
    }
});

