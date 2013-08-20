/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var Window_CardDetail = cc.CCBLayer.extend({
    ctor:function() {
        "use strict";
        this._super();
    },
            
    onLoadCCB: function() {
        "use strict";
        cc.log("Window_CardDetail loaded --- ccbi");
    },
            
    onCardClick: function() {
        gMainScene.switchCCBLayer(UI.CARD_MANAGER_ID);
    },
            
    onPantaoClick: function() {

    },
            
    onHuanhundanClick: function() {

    }
});

