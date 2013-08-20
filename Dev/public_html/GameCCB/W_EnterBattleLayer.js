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
    candidateContainer:null,
    onbattleContainer:null,

    ctor:function() {
        "use strict";
        this._super();
    },
            
    onLoadCCB: function() {
        "use strict";
        cc.log("Window_EnterBattleLayer loaded --- ccbi");
        this.candidateContainer = new PreBattleCandidateSVContainer;
        this.candidateContainer.InitWithScrollView(this.candidate_list,cc.size(0, 10), new cc.Color4B(255,255,255,0));
        this.candidateContainer.AddItem(globalUITool.CloneNodeGraph(this.candidateContainer.GetController().start_card));
        
        this.onbattleContainer = new PreBattleOnBoardSVContainer;
        this.onbattleContainer.InitWithScrollView(this.on_board_list,cc.size(10, 0), new cc.Color4B(255,255,255,0));
        this.onbattleContainer.AddItem(globalUITool.CloneNodeGraph(this.onbattleContainer.GetController().start_card));
    },
            
    onFightClick: function() {
        gMainScene.switchCCBLayer(UI.FIGHT_LAYER_ID);
    }
});

