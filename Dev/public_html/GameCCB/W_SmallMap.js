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
    _levelTree: null,
    _roads: null,
            
    ctor:function() {
        "use strict";
        this._super();
        this._levelTree = new Array();
        this._roads = new Array();
    },
            
    onLoadCCB: function() {
        "use strict";
        cc.log("Window_SmallMap loaded --- ccbi");
        this._nodeContainer = new PreBattleCandidateSVContainer;
        this._nodeContainer.InitWithScrollView(this.scroll_road_node,cc.size(0, 10), new cc.Color4B(255,255,255,0));
        var roadSize = gMainScene.createWidget(UI.WIDGET_ROAD).controller.getWidgetSize();
        roadSize.width *= 0.95;
        var nodeSize;

        var zone = gMap.getZone(gPlayer.playingZone);   //ZoneMap
        var levelCnt = zone.getLevelCnt();
        var contentSize;
        for(var i=0; i<levelCnt; i++) {
            var levelNode = zone.getLevel(i+1);     //LevelNode
            var node = gMainScene.createWidget(UI.WIDGET_LEVEL_NODE);
            if(IsNull(contentSize)) {
                // init content size
                contentSize = node.controller.getWidgetSize();
            }

            if(IsNull(nodeSize)) {
                // init node size
                nodeSize = node.controller.getCardSize();
                contentSize.leftSize = nodeSize.width;
                contentSize.rightSize = nodeSize.width;
                contentSize.topSize = nodeSize.height;
                contentSize.bottomSize = nodeSize.height;
            }

            if(!(node.controller instanceof Widget_LevelNode))
                continue;
            node.model = levelNode;
            node.meSettled = false;
            node.branchSettled = false;

            var headMonID;
            var headMonType;
            switch(node.model.getCurChallengeTimes()) {
                case 0: {
                    headMonID = node.model.get1stMons()[0].getMonsterID();
                    headMonType = node.model.get1stMons()[0].getMonsterType();
                    }
                    break;
                case 1: {
                    headMonID = node.model.get2ndMons()[0].getMonsterID();
                    headMonType = node.model.get2ndMons()[0].getMonsterType();
                    }
                    break;
                default: {
                    headMonID = node.model.get3rdMons()[0].getMonsterID();
                    headMonType = node.model.get3rdMons()[0].getMonsterType();
                    }
                    break;
            }

            //change card character
            if(NotNull(headMonID)) {
                node.controller.changeCharAvartar(headMonID.substring(2).toLowerCase());
            }

            //change card background
            switch(headMonType) {
                case conf.PUTONG_ATTACK:
                case conf.PUTONG_RECOVER:
                case conf.PUTONG_AGILE:
                case conf.PUTONG_DEFENSE: {
                    node.controller.changeCardBg(conf.PUTONG_MONSTER_BG);
                }
                break;
                case conf.JINGYING_ATTACK:
                case conf.JINGYING_RECOVER:
                case conf.JINGYING_AGILE:
                case conf.JINGYING_DEFENSE: {
                    node.controller.changeCardBg(conf.JINGYING_MONSTER_BG);
                }
                break;
                case conf.BOSS_ATTACK:
                case conf.BOSS_RECOVER:
                case conf.BOSS_AGILE:
                case conf.BOSS_DEFENSE: {
                    node.controller.changeCardBg(conf.BOSS_MONSTER_BG);
                }
                break;
            }

            // set position
            if(i === 0) {
                //root
                this._rootNode = node;
                this._rootNode.setPosition(this._nodeContainer.getController().start_node.getPosition());
                this._rootNode.meSettled = true;
            }

            // soul provided conf
            for(var j=0; j<conf.MAX_LEVEL_HUNLI_COLLECT; j++) {
                if(j < levelNode.getMaxSoulCollect()) {
                    // show
                    node.controller.showHunli(j+1, true);
                }
                else
                {
                    // hide
                    node.controller.showHunli(j+1, false);
                }
            }

            this._levelTree.push(node);
            this._nodeContainer.addItem(node);
        }

        //set all levels' position
        var allsettled = false;
        while(!allsettled) {
            allsettled = true;
            for(var j=0; j<this._levelTree.length; j++) {
                var node = this._levelTree[j];
                if(node.meSettled === undefined || node.meSettled === false) {
                    allsettled = false;
                    continue;
                }

                if(node.branchSettled === true)
                    continue;

                node.branchSettled = false;
                //left
                if(NotNull(node.model.getLeftNode())) {
                    var leftNode = this._levelTree[node.model.getLeftNode().getThisLevelID()-1];
                    if(NotNull(leftNode) && leftNode.meSettled !== true) {
                        leftNode.setPosition(cc.pAdd(node.getPosition(), cc.p(-(roadSize.width+nodeSize.width),0)));
                        contentSize.leftSize += roadSize.width+nodeSize.width;
                        leftNode.meSettled = true;

                        //road
                        var leftRoad = gMainScene.createWidget(UI.WIDGET_ROAD);
                        leftRoad.init(node, leftNode, Widget_Road.TO_LEFT);
                        leftRoad.controller.rotate(180);
                        leftRoad.setPosition(node.controller.left_node.getPosition());
                        this._roads.push(leftRoad);
                        node.addChild(leftRoad, -1);
                        node.branchSettled = true;
                        if(NotNull(leftNode.model) && leftNode.model.getLevelType() === conf.LEVEL_LOCKED) {
                            leftRoad.controller.showLock(true);
                        }
                        else
                            leftRoad.controller.showLock(false);
                    } 
                }
                

                //right
                if(NotNull(node.model.getRightNode())) {
                    var rightNode = this._levelTree[node.model.getRightNode().getThisLevelID()-1];
                    if(NotNull(rightNode) && rightNode.meSettled !== true) {
                        rightNode.setPosition(cc.pAdd(node.getPosition(), cc.p(roadSize.width+nodeSize.width,0)));
                        contentSize.rightSize += roadSize.width+nodeSize.width;
                        rightNode.meSettled = true;

                        //road
                        var rightRoad = gMainScene.createWidget(UI.WIDGET_ROAD);
                        rightRoad.init(node, rightRoad, Widget_Road.TO_RIGHT);
                        rightRoad.controller.rotate(0);
                        rightRoad.setPosition(node.controller.right_node.getPosition());
                        this._roads.push(rightRoad);
                        node.addChild(rightRoad, -1);
                        node.branchSettled = true;
                        if(NotNull(rightRoad.model) && rightRoad.model.getLevelType() === conf.LEVEL_LOCKED) {
                            rightRoad.controller.showLock(true);
                        }
                        else
                            rightRoad.controller.showLock(false);
                    }
                }

                //top
                if(NotNull(node.model.getTopNode())) {
                    var topNode = this._levelTree[node.model.getTopNode().getThisLevelID()-1];
                    if(NotNull(topNode) && topNode.meSettled !== true) {
                        topNode.setPosition(cc.pAdd(node.getPosition(), cc.p(0, roadSize.width+nodeSize.height)));
                        contentSize.topSize += roadSize.width+nodeSize.height;
                        topNode.meSettled = true;

                        //road
                        var topRoad = gMainScene.createWidget(UI.WIDGET_ROAD);
                        topRoad.init(node, topRoad, Widget_Road.TO_TOP);
                        topRoad.controller.rotate(-90);
                        topRoad.setPosition(node.controller.top_node.getPosition());
                        this._roads.push(topRoad);
                        node.addChild(topRoad, -1);
                        node.branchSettled = true;
                        if(NotNull(topRoad.model) && topRoad.model.getLevelType() === conf.LEVEL_LOCKED) {
                            topRoad.controller.showLock(true);
                        }
                        else
                            topRoad.controller.showLock(false);
                    }
                }

                //bottom
                if(NotNull(node.model.getBottomNode())) {
                    var bottomNode = this._levelTree[node.model.getBottomNode().getThisLevelID()-1];
                    if(NotNull(bottomNode) && bottomNode.meSettled !== true) {
                        bottomNode.setPosition(cc.pAdd(node.getPosition(), cc.p(0, -(roadSize.width+nodeSize.height))));
                        contentSize.bottomSize += roadSize.width+nodeSize.height;
                        bottomNode.meSettled = true;

                        //road
                        var bottomRoad = gMainScene.createWidget(UI.WIDGET_ROAD);
                        bottomRoad.init(node, bottomRoad, Widget_Road.TO_BOTTOM);
                        bottomRoad.controller.rotate(90);
                        bottomRoad.setPosition(node.controller.bottom_node.getPosition());
                        this._roads.push(bottomRoad);
                        node.addChild(bottomRoad, -1);
                        node.branchSettled = true;
                        if(NotNull(bottomRoad.model) && bottomRoad.model.getLevelType() === conf.LEVEL_LOCKED) {
                            bottomRoad.controller.showLock(true);
                        }
                        else
                            bottomRoad.controller.showLock(false);
                    }
                }
                
            }
        }

        contentSize.leftSize = contentSize.leftSize>contentSize.rightSize ? contentSize.leftSize : contentSize.rightSize;
        contentSize.rightSize = contentSize.leftSize;
        contentSize.width += contentSize.leftSize+contentSize.rightSize;
        contentSize.height += contentSize.topSize+contentSize.bottomSize;
        this._nodeContainer.setViewSize(contentSize);
        this._nodeContainer.setContentOffsetTo(contentSize.width*0.5, false);

        this._nodeContainer.getController().clearTemplateNodes();
    }
});

