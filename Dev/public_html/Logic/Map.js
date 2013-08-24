var Map = cc.Class.extend({
    
});

var WorldMap = Map.extend({
    
});

var AreaMap = Map.extend({
    
});

var LevelNode = cc.Class.extend({
    _confData: null,
    leftNode: null,
    rightNode: null,
    topNode: null,
    bottomNode: null,
    
    ctor: function(levelConf) {
        this._confData = levelConf;
    }
    ,
    construct4Sides: function(zone) {
        this.leftNode = zone.getLevelNodeByAbID(_confData.getLeftLevel());
        this.rightNode = zone.getLevelNodeByAbID(_confData.getRightLevel());
        this.topNode = zone.getLevelNodeByAbID(_confData.getTopLevel());
        this.bottomNode = zone.getLevelNodeByAbID(_confData.getBottomLevel());
    }
});

var ZoneMap = Map.extend({
    _zoneID: null,
    _levelList: new Array(),         // all levels in the zone stored here with key ID
    _rootLevel: null,
    ctor: function(_zoneID) {
        this._zoneID = _zoneID;
        var zoneInfo = conf.mapConf.getZoneInfo(_zoneID);
        var levelConfList = zoneInfo.getLevelList();
        for(var i=0; i<levelConfList.length; i++) {
            _levelList.push(new LevelNode(levelConfList[i]));
        }
        this._rootLevel = this._levelList[0];
        
        for(var i=0; i<this._levelList.length; i++) {
            this._levelList[i].construct4Sides(this);
        }
    }
    ,
    getLevelNode: function(zoneLevel) {
        return this._levelList[zoneLevel];
    }
    ,
    getLevelNodeByAbID: function(abLevel) {
        return this._levelList[conf.Param.mapConf.convertToZoneLevel(abLevel)];
    }
});