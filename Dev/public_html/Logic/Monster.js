var Monster = cc.Class.extend({
    _config: null,
    _level: null,
    _star: 0,
    ctor: function(monID, level, star) {
        this._config = conf.Param.monsterList[monID];
        this._level = level;
        this._star = star;
    },

    getMonsterID: function(){
        return this._config.getMonsterID();
    },

    getLevel: function() {
        return this._level;
    },

    getStar: function() {
        return this._star;
    },

    getMonsterType: function() {
        return this._config.getMonsterType();
    }
});