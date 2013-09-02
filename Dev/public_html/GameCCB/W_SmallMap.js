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
    _nodeContainer:null,
    _rootNode: null,
    _levelTree: new Array(),
            
    ctor:function() {
        "use strict";
        this._super();
    },
            
    onLoadCCB: function() {
        "use strict";
        cc.log("Window_SmallMap loaded --- ccbi");
        this._nodeContainer = new PreBattleCandidateSVContainer;
        this._nodeContainer.InitWithScrollView(this.scroll_road_node,cc.size(0, 10), new cc.Color4B(255,255,255,0));
        var roadSize = gMainScene.createWidget(UI.WIDGET_ROAD).controller.getRoadSize();

        var zoneInfo = conf.Param.mapConf.getZoneInfo(gPlayer.playingZone);    //ZoneConf
        var levelCnt = zoneInfo.getLevelCnt();
        for(var i=0; i<levelCnt; i++) {
            var levelInfo = zoneInfo.getLevelList()[i];     //LevelConf
            var node = gMainScene.createWidget(UI.WIDGET_LEVEL_NODE);
            if(!(node.controller instanceof Widget_LevelNode))
                continue;

            // set position
            if(i === 0) {
                //root
                this._rootNode = node;
                this._rootNode.setPosition(this._nodeContainer.GetController().start_node.getPosition());
                this._rootNode.meSettled = true;
            }

            // soul provided conf
            for(var i=0; i<conf.MAX_LEVEL_HUNLI_COLLECT; i++) {
                if(i < levelInfo.getMaxSoulCollect()) {
                    // show
                    node.controller.showHunli(i+1, true);
                }
                else
                {
                    // hide
                    node.controller.showHunli(i+1, false);
                }
            }

            this._levelTree.push(node);
            this._nodeContainer.AddItem(node);
        }

        //set all levels' position
        var allsettled = false;
        while(!allsettled) {
            allsettled = true;
            for(var i=0; i<this._levelTree.length; i++) {
                var node = this._levelTree[i];
                if(node.meSettled === undefined || node.meSettled === false) {
                    allsettled = false;
                    continue;
                }

                if(node.branchSettled == true)
                    continue;

                //left
                var leftNode = this._levelTree[node.getLeftLevel()-1];
                if(NotNull(leftNode) && leftNode.meSettled !== true) {
                    leftNode.setPosition(cc.pAdd(node.getPosition(), cc.p(-roadSize.width,0)));
                    leftNode.meSettled = true;
                }

                //right
                var rightNode = this._levelTree[node.getRightLevel()-1];
                if(NotNull(rightNode) && rightNode.meSettled !== true) {
                    rightNode.setPosition(cc.pAdd(node.getPosition(), cc.p(roadSize.width,0)));
                    rightNode.meSettled = true;
                }

                //top
                var topNode = this._levelTree[node.getTopLevel()-1];
                if(NotNull(topNode) && topNode.meSettled !== true) {
                    topNode.setPosition(cc.pAdd(node.getPosition(), cc.p(0, roadSize.width)));
                    topNode.meSettled = true;
                }

                //bottom
                var bottomNode = this._levelTree[node.getBottomLevel()-1];
                if(NotNull(bottomNode) && bottomNode.meSettled !== true) {
                    bottomNode.setPosition(cc.pAdd(node.getPosition(), cc.p(0, -roadSize.width)));
                    bottomNode.meSettled = true;
                }
                node.branchSettled = true;
            }
        }
    }
});

