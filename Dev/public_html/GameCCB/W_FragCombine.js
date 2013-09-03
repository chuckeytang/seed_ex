var PropListSVContainer = ScrollViewContainer.extend({
    ctor : function() {
        "use strict";
        this._super();
    }
});

var Window_FragCombine = cc.CCBLayer.extend({
    propListContainer:null,
    ctor:function() {
        "use strict";
        this._super();
    },

    onLoadCCB: function() {
        "use strict";
        cc.log("Window_FragCombine loaded --- ccbi");
        this.propListContainer = new PropListSVContainer;
        this.propListContainer.InitWithScrollView(this.prop_list,cc.size(0, 10), new cc.Color4B(255,255,255,0));
        this.propListContainer.addItem(globalUITool.CloneNodeGraph(this.propListContainer.getController().start_item));
    }
});

