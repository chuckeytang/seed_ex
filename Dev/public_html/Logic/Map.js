var Map = cc.Class.extend({
    
});

var WorldMap = Map.extend({
    
});

var AreaMap = Map.extend({
    
});

var LevelNode = cc.Class.extend({
    confData: null,
    leftNode: null,
    rightNode: null,
    topNode: null,
    bottomNode: null,
    
    ctor: function(zone, level) {
        this.confData = conf.Param.mapConf.getLevelInfo(zone, level);
    }
    ,
    construct4Sides: function(left, right, top, bottom) {
        this.leftNode = left;
        this.rightNode = right;
        this.topNode = top;
        this.bottomNode = bottom;
    }
});

var ZoneMap = Map.extend({
    levelList: new Array(),         // all levels in the zone stored here with key ID
    rootLevel: null,
    ctor: function(zoneID) {
        var zoneInfo = conf.mapConf.getZoneInfo(zoneID);
        for(var i=0; i<zoneInfo.levelCnt; i++) {
            var levelNode = new LevelNode(zoneID, i);
            if(i===0) {
                rootLevel = levelNode;
            }
            levelList[levelNode.conf[conf.ID]] = levelNode;
        }
        
        for(var levelNode in levelList) {
            // if the configuration of this level has left branch and its branch is contained in levelList
            var leftNode = null, rightNode = null, topNode = null, bottomNode = null;
            if (levelNode.conf[conf.BRANCH_LEFT]) {
                leftNode = levelList[levelNode.conf[conf.BRANCH_LEFT]];
            }
            
            if (rightNode.conf[conf.BRANCH_RIGHT]) {
                rightNode = levelList[levelNode.conf[conf.BRANCH_RIGHT]];
            }
            
            if (topNode.conf[conf.BRANCH_TOP]) {
                topNode = levelList[levelNode.conf[conf.BRANCH_TOP]];
            }
            
            if (levelNode.conf[conf.BRANCH_BOTTOM]) {
                bottomNode = levelList[levelNode.conf[conf.BRANCH_BOTTOM]];
            }
            
            construct4Sides(leftNode, rightNode, topNode, bottomNode);
        }
    }
});