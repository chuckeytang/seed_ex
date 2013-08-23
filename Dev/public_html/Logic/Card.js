var cd = cd || {};

cd.Card = cc.Class.extend({
    type: null,
    cardConf: null,

    level: 1,
    lvExp: 0,
    hp: 0,
    attack: 0,
    criticalRat: 0,
    defense: 0,
    juqi: 0,
    fanshiRat: 0,
    fanshi: 0,
    
    ctor: function(type) {
        this.type = type;
        this.cardConf = conf.Param.cardList[type];
        this.lvExp = this.cardConf.getExpForLv();
        this.hp = this.cardConf.getHpForLv();
        this.attack = this.cardConf.getAttackForLv();
        this.criticalRat = this.cardConf.getCriticAttackForLv();
        this.defense = this.cardConf.getDefenseForLv();
        this.juqi = this.cardConf.getJuqiForLv();
        this.fanshiRat = this.cardConf.getFanshiRatForLv();
        this.fanshi = this.attack*this.fanshiRat;
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
        this.hp = this.cardConf.getFieldValueForLv(this.level, OneCardConf.HP);
        this.attack = this.cardConf.getFieldValueForLv(this.level, OneCardConf.ATTACK);
        this.criticalRat = this.cardConf.getFieldValueForLv(this.level, OneCardConf.CRITIC_ATTACK);
        this.fanshiRat = this.cardConf.getFieldValueForLv(this.level, OneCardConf.FANSHI);
        this.defense = this.cardConf.getFieldValueForLv(this.level, OneCardConf.DEFENSE);
        this.juqi = this.cardConf.getFieldValueForLv(this.level, OneCardConf.JUQI);
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