var SmallMapSVContainer = ScrollViewContainer.extend({
    ctor : function() {
        "use strict";
        this._super();
    }
});

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var Window_SmallMap = cc.CCBLayer.extend({
    nodeContainer:null,
            
    ctor:function() {
        "use strict";
        this._super();
    },
            
    onLoadCCB: function() {
        "use strict";
        cc.log("Window_SmallMap loaded --- ccbi");
        this.nodeContainer = new PreBattleCandidateSVContainer;
        this.nodeContainer.InitWithScrollView(this.scroll_road_node,cc.size(0, 10), new cc.Color4B(255,255,255,0));
        this.nodeContainer.AddItem(globalUITool.CloneNodeGraph(this.nodeContainer.GetController().start_node));
    },
            
    onCardClick: function() {
        gMainScene.switchCCBLayer(UI.CARD_MANAGER_ID);
    },
            
    onBigMapClick: function() {
    }
});

