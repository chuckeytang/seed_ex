var Map = cc.Class.extend({
    
});

var WorldMap = Map.extend({
    
});

var AreaMap = Map.extend({
    _zones: null,
    ctor: function() {
        this._zones = new Array();
        var zonesConf = conf.Param.mapConf.getZones();
        for(var i=0; i<zonesConf.length; i++) {
            this._zones[zonesConf[i].getZoneID()] = new ZoneMap(zonesConf[i].getZoneID());
        }
    },

    getZone: function(zoneID) {
        return this._zones[zoneID];
    },

    flush: function() {
        for(var i=0; i<this._zones.length; i++) {
            this._zones[i].flush();
        }
    },

    loadFromDB: function() {
        for(var i=0; i<this._zones.length; i++) {
            this._zones[i].loadFromDB();
        }
    }
});

var LevelNode = cc.Class.extend({
    _confData: null,
    _leftNode: null,
    _rightNode: null,
    _topNode: null,
    _bottomNode: null,
    _1stMonsters: null,
    _2ndMonsters: null,
    _3rdMonsters: null,

    _challengeTimes: 0,
    
    ctor: function(levelConf) {
        this._confData = levelConf;
        this._1stMonsters=new Array();
        this._2ndMonsters=new Array();
        this._3rdMonsters=new Array();

        var monsConf1 = levelConf.get1stFightMonList();
        for(var i=0; i<monsConf1.length; i++) {
            this._1stMonsters.push(new cd.MonsterCard(monsConf1[i][LevelConf.MONSTER_ID], monsConf1[i][LevelConf.MONSTER_LEVEL], this.toValue(monsConf1[i][LevelConf.MONSTER_STAR])));
        }

        var monsConf2 = levelConf.get2ndFightMonList();
        for(var i=0; i<monsConf2.length; i++) {
            this._2ndMonsters.push(new cd.MonsterCard(monsConf2[i][LevelConf.MONSTER_ID], monsConf2[i][LevelConf.MONSTER_LEVEL], this.toValue(monsConf2[i][LevelConf.MONSTER_STAR])));
        }

        var monsConf3 = levelConf.get3rdFightMonList();
        for(var i=0; i<monsConf3.length; i++) {
            this._3rdMonsters.push(new cd.MonsterCard(monsConf3[i][LevelConf.MONSTER_ID], monsConf3[i][LevelConf.MONSTER_LEVEL], this.toValue(monsConf3[i][LevelConf.MONSTER_STAR])));
        }

        this.loadFromDB();
    },

    flush: function() {
        var db = cc.UserDefault.getInstance();
        db.setStringForKey('level_'+this._confData.getAbsoluteLevelID()+this._challengeTimes.toString(), this._challengeTimes);
    },

    loadFromDB: function() {
        var db = cc.UserDefault.getInstance();
        this._challengeTimes = this.toValue(db.getStringForKey('level_'+this._confData.getAbsoluteLevelID()+this._challengeTimes.toString()));
        // test
        this._challengeTimes = 3;
    },

    construct4Sides: function(zone) {
        if(this._confData.getLeftLevel() !== conf.NULL_CONF_VALUE) {
            this._leftNode = zone.getLevel(this._confData.getLeftLevel());
        }
        if(this._confData.getRightLevel() !== conf.NULL_CONF_VALUE) {
            this._rightNode = zone.getLevel(this._confData.getRightLevel());
        }
        if(this._confData.getTopLevel() !== conf.NULL_CONF_VALUE) {
            this._topNode = zone.getLevel(this._confData.getTopLevel());
        }
        if(this._confData.getBottomLevel() !== conf.NULL_CONF_VALUE) {
            this._bottomNode = zone.getLevel(this._confData.getBottomLevel());
        }
    },

    getMaxSoulCollect: function() {
        return this._confData.getMaxSoulCollect();
    },

    getThisLevelID: function() {
        return this._confData.getThisLevelID();
    },

    getLeftNode: function() {
        return this._leftNode;
    },

    getRightNode: function() {
        return this._rightNode;
    },

    getTopNode: function() {
        return this._topNode;
    },

    getBottomNode: function() {
        return this._bottomNode;
    },

    get1stMons: function() {
        return this._1stMonsters;
    },

    get2ndMons: function() {
        return this._2ndMonsters;
    },

    get3rdMons: function() {
        return this._3rdMonsters;
    },

    get1stFightCardNum: function() {
        return this._confData.get1stFightCardNum();
    },

    get2ndFightCardNum: function() {
        return this._confData.get2ndFightCardNum();
    },

    get3rdFightCardNum: function() {
        return this._confData.get3rdFightCardNum();
    },

    getLevelType: function() {
        return this._confData.getLevelType();
    },

    challenge: function() {
        this._challengeTimes++;
        this.flush();
    },

    getCurChallengeTimes: function() {
        return this._challengeTimes;
    }
});

var ZoneMap = Map.extend({
    _zoneID: null,
    _levelList: null,         // all levels in the zone stored here with key ID
    _rootLevel: null,
    ctor: function(_zoneID) {
        this._zoneID = _zoneID;
        this._levelList = new Array();
        var zoneInfo = conf.Param.mapConf.getZoneInfo(_zoneID);
        var levelConfList = zoneInfo.getLevelList();
        for(var i=0; i<levelConfList.length; i++) {
            this._levelList.push(new LevelNode(levelConfList[i]));
        }
        this._rootLevel = this._levelList[0];
        
        for(var i=0; i<this._levelList.length; i++) {
            this._levelList[i].construct4Sides(this);
        }
    }
    ,
    flush: function() {
        for(var i=0; i<this._levelList.length; i++) {
            this._levelList[i].flush();
        }
    },

    loadFromDB: function() {
        for(var i=0; i<this._levelList.length; i++) {
            this._levelList[i].loadFromDB();
        }
    },

    getLevelNodeByAbID: function(abLevel) {
        return this._levelList[conf.Param.mapConf.convertToZoneLevel(abLevel)-1];
    },

    getLevelCnt: function() {
        return this._levelList.length;
    },

    getLevel: function(levelID) {
        return this._levelList[levelID-1];
    }
});