/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var Window_FightLayer = cc.CCBLayer.extend({
    ctor:function() {
        "use strict";
        this._super();
    },
            
    onLoadCCB: function() {
        "use strict";
        cc.log("Window_FightLayer loaded --- ccbi");
    }
    ,
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

