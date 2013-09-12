/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var Window_MainLayer = cc.CCBLayer.extend({
    ctor:function() {
        "use strict";
        //this._super();
    },
            
    onLoadCCB: function() {
        "use strict";
        cc.log("Window_MainLayer loaded --- ccbi");
    },

    onStartClick: function() {
        this._switchMenuID = UI.WINDOW_BIG_MAP;
    }
});

