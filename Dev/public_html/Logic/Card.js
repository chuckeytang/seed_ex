var cd = cd || {};

cd.Card = cc.Class.extend({
    _id: null,
    _cardConf: null,

    curLevel: 1,
    maxHp: 0,
    attack: 0,
    criticalRat: 0,
    defense: 0,
    juqi: 0,
    fanshiRat: 0,
    fanshi: 0,
    
    ctor: function(ID) {
        this._id = ID;
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
    updateMyData: function() {
        this.maxHp = this._cardConf.getHpForLv(this.curLevel);
        this.attack = this._cardConf.getAttackForLv(this.curLevel);
        this.criticalRat = this._cardConf.getCriticAttackForLv(this.curLevel);
        this.defense = this._cardConf.getDefenseForLv(this.curLevel);
        this.juqi = this._cardConf.getJuqiForLv(this.curLevel);
        this.fanshiRat = this._cardConf.getFanshiRatForLv(this.curLevel);
        this.fanshi = this.attack*this.fanshiRat;
    }
});

cd.PlayerCard = cd.Card.extend({
    lvExp: 0,
    curLvExp: 0,   // exp for current level  
    recoverHPSpeed: 0,
    reviveTime: 0,
    juqiExp: 0,
    
    ctor: function(ID) {
        this._super(ID);
        this._cardConf = conf.Param.cardList[ID];
        this.updateMyData();
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
    updateMyData: function() {
        this._super();
        this.lvExp = this._cardConf.getExpForLv(this.curLevel);
        this.recoverHPSpeed = this._cardConf.getRecoverHPSpeedForLv(this.curLevel);
        this.reviveTime = this._cardConf.getReviveTimeForLv(this.curLevel);
        this.juqiExp = this._cardConf.getJuqiExpForLv(this.curLevel);
    }
});

cd.MonsterCard = cd.Card.extend({
    
    ctor: function(ID) {
        this._super(ID);
        this._cardConf = conf.Param.monsterList[ID];
        this.updateMyData();
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