var Skill = cc.Class.extend({
    _skillConf: null,
    ctor: function(skillConf) {
        this,_skillConf = skillConf;
    },

    getSkillID: function() {
        return this._skillConf.getSkillID();
    }
});