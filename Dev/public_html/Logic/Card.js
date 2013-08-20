var cd = cd || {};

cd.Card = cc.Class.extend({
    type: null,
    cardInfo: null,

    level: 1,
    lvExp: 0,
    hp: 0,
    attack: 0,
    criticalRat: 0,
    defense: 0,
    juqi: 0,
    fanshiRat: 0,
    
    ctor: function(type) {
        this.type = type;
        this.cardInfo = conf.Param.cardList[type];
        this.lvExp = this.cardInfo.getFieldValueForLv(this.level, __CardConf.LV_EXP);
        this.hp = this.cardInfo.getFieldValueForLv(this.level, __CardConf.HP);
        this.attack = this.cardInfo.getFieldValueForLv(this.level, __CardConf.ATTACK);
        this.criticalRat = this.cardInfo.getFieldValueForLv(this.level, __CardConf.CRITIC_ATTACK);
        this.defense = this.cardInfo.getFieldValueForLv(this.level, __CardConf.DEFENSE);
        this.juqi = this.cardInfo.getFieldValueForLv(this.level, __CardConf.JUQI);
        this.fanshiRat = this.cardInfo.getFieldValueForLv(this.level, __CardConf.FANSHI);
    }
    ,
    flush: function() {
        var db = cc.UserDefault.getInstance();
        db.setStringForKey(this.type+'_'+this.level.toString(), this.level);
    }
    ,
    loadFromDB: function() {
        var db = cc.UserDefault.getInstance();
        this.level = db.getStringForKey(this.type+'_'+this.level.toString());
        this.hp = this.cardInfo.getFieldValueForLv(this.level, __CardConf.HP);
        this.attack = this.cardInfo.getFieldValueForLv(this.level, __CardConf.ATTACK);
        this.criticalRat = this.cardInfo.getFieldValueForLv(this.level, __CardConf.CRITIC_ATTACK);
        this.fanshiRat = this.cardInfo.getFieldValueForLv(this.level, __CardConf.FANSHI);
        this.defense = this.cardInfo.getFieldValueForLv(this.level, __CardConf.DEFENSE);
        this.juqi = this.cardInfo.getFieldValueForLv(this.level, __CardConf.JUQI);
    }
});

cd.PlayerCard = cd.Card.extend({
    lvExp: 0,   // exp for current level  
    
    ctor: function(type) {
        this._super(type);
    }
    ,
    flush: function() {
        this._super();
        var db = cc.UserDefault.getInstance();
        db.setStringForKey(this.type+'_'+this.lvExp.toString(), this.lvExp);
    }
    ,
    loadFromDB: function() {
        this._super();
        var db = cc.UserDefault.getInstance();
        this.lvExp = db.getStringForKey(this.type+'_'+this.lvExp.toString());
    }
    ,
    // logic function
    gainExp: function() {
        
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