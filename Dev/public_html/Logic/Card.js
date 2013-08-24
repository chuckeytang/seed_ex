var cd = cd || {};

cd.Card = cc.Class.extend({
    id: null,
    cardConf: null,

    curLevel: 1,
    maxHp: 0,
    attack: 0,
    criticalRat: 0,
    defense: 0,
    juqi: 0,
    fanshiRat: 0,
    fanshi: 0,
    
    ctor: function(ID) {
        this.id = ID;
        this.cardConf = conf.Param.cardList[id];
        this.updateMyData();
    }
    ,
    flush: function() {
        var db = cc.UserDefault.getInstance();
        db.setStringForKey(this.type+'_'+this.curLevel.toString(), this.curLevel);
    }
    ,
    loadFromDB: function() {
        var db = cc.UserDefault.getInstance();
        this.curLevel = db.getStringForKey(this.type+'_'+this.curLevel.toString());
        this.updateMyData();
    }
    ,
    _updateMyData: function() {
        this.maxHp = this.cardConf.getHpForLv(this.curLevel);
        this.attack = this.cardConf.getAttackForLv(this.curLevel);
        this.criticalRat = this.cardConf.getCriticAttackForLv(this.curLevel);
        this.defense = this.cardConf.getDefenseForLv(this.curLevel);
        this.juqi = this.cardConf.getJuqiForLv(this.curLevel);
        this.fanshiRat = this.cardConf.getFanshiRatForLv(this.curLevel);
        this.fanshi = this.attack*this.fanshiRat;
    }
});

cd.PlayerCard = cd.Card.extend({
    lvExp: 0,
    curLvExp: 0,   // exp for current level  
    recoverHPSpeed: 0,
    reviveTime: 0,
    juqiExp: 0,
    
    ctor: function(type) {
        this._super(type);
    }
    ,
    flush: function() {
        this._super();
        var db = cc.UserDefault.getInstance();
        db.setStringForKey(this.type+'_'+this.curLvExp.toString(), this.curLvExp);
    }
    ,
    loadFromDB: function() {
        this._super();
        var db = cc.UserDefault.getInstance();
        this.curLvExp = db.getStringForKey(this.type+'_'+this.curLvExp.toString());
    }
    ,
    // logic function
    gainExp: function() {
        
    }
    ,
    _updateMyData: function() {
        this._super();
        this.lvExp = this.cardConf.getExpForLv(this.curLevel);
        this.recoverHPSpeed = this.cardConf.getRecoverHPSpeedForLv(this.curLevel);
        this.reviveTime = this.getReviveTimeForLv(this.curLevel);
        this.juqiExp = this.getJuqiExpForLv(this.curLevel);
    }
});

cd.MonsterCard = cd.Card.extend({
    
    ctor: function(type) {
        this._super(type);
    }
    ,
    flush: function() {
        this._super();
    }
    ,
    loadFromDB: function() {
        this._super();
    }    
});