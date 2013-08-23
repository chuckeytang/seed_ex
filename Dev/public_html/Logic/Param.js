var conf = conf || {};

conf.MAP_PARAM = 'map';
conf.MONSTER_CARD_PARAM = 'monster_card'; 


conf.TANGSANZANG = 'C_TangSangzang';
conf.SUNWUKONG = 'C_SunWukong';
conf.ZHUBAJIE = 'C_ZhuBajie';
conf.BAILONGMA = 'C_BaiLongma';
conf.LIUBOXIN = 'C_LiuBoxin';
conf.WUKONGLIUYI = 'C_WukongLiuyi';
conf.GUICHENGXIANG = 'C_GuiChengxiang';
conf.LINGXUZI = 'C_LingXuzi';
conf.HEIXIONGJING = 'C_HeiXiongjing';
conf.HUXIANFENG = 'C_HuXianfeng';
conf.HUANGFENGGUAI = 'C_HuangFengguai';
conf.PUTONG_ATTACK = 'C_PutongAttack';
conf.PUTONG_RECOVER = 'C_PutongRecover';
conf.PUTONG_AGILE = 'C_PutongAgile';
conf.PUTONG_DEFENSE = 'C_PutongDefense';
conf.JINGYING_ATTACK = 'C_JingyingAttack';
conf.JINGYING_RECOVER = 'C_JingyingRecover';
conf.JINGYING_AGILE = 'C_JingyingAgile';
conf.JINGYING_DEFENSE = 'C_JingyingDefense';
conf.BOSS_ATTACK = 'C_BossAttack';
conf.BOSS_RECOVER = 'C_BossRecover';
conf.BOSS_AGILE = 'C_BossAgile';
conf.BOSS_DEFENSE = 'C_BossDefense';

conf.PROP_XIANTAO = "Xiantao";
conf.PROP_PANTAO = "Pantao";
conf.PROP_HUANHUNDAN = "Huanhundan";

conf.card_type = [
    conf.TANGSANZANG,
    conf.SUNWUKONG,
    conf.ZHUBAJIE,
    conf.BAILONGMA,
    conf.LIUBOXIN,
    conf.WUKONGLIUYI,
    conf.GUICHENGXIANG,
    conf.LINGXUZI,
    conf.HEIXIONGJING,
    conf.HUXIANFENG,
    conf.HUANGFENGGUAI,
    conf.PUTONG_ATTACK,
    conf.PUTONG_RECOVER,
    conf.PUTONG_AGILE,
    conf.PUTONG_DEFENSE,
    conf.JINGYING_ATTACK,
    conf.JINGYING_RECOVER,
    conf.JINGYING_AGILE,
    conf.JINGYING_DEFENSE,
    conf.BOSS_ATTACK,
    conf.BOSS_RECOVER,
    conf.BOSS_AGILE,
    conf.BOSS_DEFENSE
];

__ComonCardConf = cc.Class.extend({
    allCardInfo: new Array(),
    _colMapping: new Array(),
    ctor: function(){
        this.allCardInfo = CSV.csvToArray(cc.FileUtils.getInstance().getTextFileData('Resources/Conf/Card/CardConf.csv'), true);
        for(var i=0; i<this.cardLevelInfo[0].length; i++) {
            this._colMapping[this.cardLevelInfo[0][i]]=i;
        }
    }
    ,
    getInfoForCardID: function(cardID) {
        return this.allCardInfo[cardID];
    }
    ,
    getFieldValueForCardID: function(cardID, field) {
        return this.allCardInfo[cardID][this._colMapping[field]];
    }
});

__ComonCardConf.CARD_ID = 'CardID';
__ComonCardConf.CARD_NAME = 'CardName';
__ComonCardConf.ABSORB_CARD_CD = 'AbsorbCardCD';
__ComonCardConf.FABAO_TYPE_1 = 'FabaoType1';
__ComonCardConf.FABAO_TYPE_2 = 'FabaoType2';
__ComonCardConf.FABAO_TYPE_3 = 'FabaoType3';
__ComonCardConf.STAR_0_1_Card_NUM = 'Star0_1CardNum';
__ComonCardConf.STAR_1_2_Card_NUM = 'Star1_2CardNum';
__ComonCardConf.STAR_2_3_Card_NUM = 'Star2_3CardNum';
__ComonCardConf.STAR_3_4_Card_NUM = 'Star3_4CardNum';
__ComonCardConf.STAR_4_5_Card_NUM = 'Star4_5CardNum';
conf.commonCardConf = new __ComonCardConf();

OneCardConf = cc.Class.extend({
    cardID: null,
    cardName: null,
    absorbCardCD: null,
    fabaoType1: null,
    fabaoType2: null,
    fabaoType3: null,
    star0_1CardNum: null,
    star1_2CardNum: null,
    star2_3CardNum: null,
    star3_4CardNum: null,
    star4_5CardNum: null,
    cardLevelInfo: new Array(),
    _colMapping: new Array(),
    ctor: function(ID){
        this.cardID = ID;
        this.cardLevelInfo = CSV.csvToArray(cc.FileUtils.getInstance().getTextFileData('Resources/Conf/Card/'+ID+'.csv'), true);
        for(var i=0; i<this.cardLevelInfo[0].length; i++) {
            this._colMapping[this.cardLevelInfo[0][i]]=i;
        }
        
        this.cardName = conf.commonCardConf.getFieldValueForCardID(ID, __ComonCardConf.CARD_NAME);
        this.absorbCardCD = conf.commonCardConf.getFieldValueForCardID(ID, __ComonCardConf.ABSORB_CARD_CD);
        this.fabaoType1 = conf.commonCardConf.getFieldValueForCardID(ID, __ComonCardConf.FABAO_TYPE_1);
        this.fabaoType2 = conf.commonCardConf.getFieldValueForCardID(ID, __ComonCardConf.FABAO_TYPE_2);
        this.fabaoType3 = conf.commonCardConf.getFieldValueForCardID(ID, __ComonCardConf.FABAO_TYPE_3);
        this.star0_1CardNum = conf.commonCardConf.getFieldValueForCardID(ID, __ComonCardConf.STAR_0_1_Card_NUM);
        this.star1_2CardNum = conf.commonCardConf.getFieldValueForCardID(ID, __ComonCardConf.STAR_1_2_Card_NUM);
        this.star2_3CardNum = conf.commonCardConf.getFieldValueForCardID(ID, __ComonCardConf.STAR_2_3_Card_NUM);
        this.star3_4CardNum = conf.commonCardConf.getFieldValueForCardID(ID, __ComonCardConf.STAR_3_4_Card_NUM);
        this.star4_5CardNum = conf.commonCardConf.getFieldValueForCardID(ID, __ComonCardConf.STAR_4_5_Card_NUM);
    }
    ,
    getExpForLv: function(level) {
        return this.cardLevelInfo[level][this._colMapping[OneCardConf.EXP]];
    }
    ,
    getLvExpForLv: function(level) {
        return this.cardLevelInfo[level][this._colMapping[OneCardConf.LV_EXP]];
    }
    ,
    getHpForLv: function(level) {
        return this.cardLevelInfo[level][this._colMapping[OneCardConf.HP]];
    }
    ,
    getAttackForLv: function(level) {
        return this.cardLevelInfo[level][this._colMapping[OneCardConf.ATTACK]];
    }
    ,
    getCriticAttackForLv: function(level) {
        return this.cardLevelInfo[level][this._colMapping[OneCardConf.CRITIC_ATTACK]];
    }
    ,
    getFanshiRatForLv: function(level) {
        return this.cardLevelInfo[level][this._colMapping[OneCardConf.FANSHI]];
    }
    ,
    getDefenseForLv: function(level) {
        return this.cardLevelInfo[level][this._colMapping[OneCardConf.DEFENSE]];
    }
    ,
    getJuqiForLv: function(level) {
        return this.cardLevelInfo[level][this._colMapping[OneCardConf.JUQI]];
    }    
});

OneCardConf.EXP = 'Exp';
OneCardConf.LV_EXP = 'LvExp';
OneCardConf.HP = 'Hp';
OneCardConf.ATTACK = 'Attack';
OneCardConf.CRITIC_ATTACK = 'CriticAtt';
OneCardConf.FANSHI = 'Fanshi';
OneCardConf.DEFENSE = 'Defense';
OneCardConf.JUQI = 'Juqi';

MonsterCardConf = cc.Class.extend({    
    monsterInfo: new Array(),
    _colMapping: new Array(),
    ctor: function(){
        this.monsterInfo = CSV.csvToArray(cc.FileUtils.getInstance().getTextFileData('Resources/Conf/monster_card.csv'), true);
        for(var i=0; i<this.monsterInfo[0].length; i++) {
            this._colMapping[this.monsterInfo[0][i]]=i;
        }
    }
    ,
    getMonsterType: function(monID){
        return this.monsterInfo[monID][this._colMapping[MonsterCardConf.TYPE]];
    }
    ,
    getMonsterName: function(monID){
        return this.monsterInfo[monID][this._colMapping[MonsterCardConf.NAME]];
    }
});
MonsterCardConf.MONSTER_ID = 'MonsterID';
MonsterCardConf.NAME = 'Name';
MonsterCardConf.TYPE = 'Type';


__CommonFabaoConf = cc.Class.extend({
    fabaoInfo: new Array(),
    _colMapping: new Array(),
    ctor: function() {
        this.fabaoInfo = CSV.csvToArray(cc.FileUtils.getInstance().getTextFileData('Resources/Conf/FabaoConf.csv'), true);
        for(var i=0; i<this.fabaoInfo[0].length; i++) {
            this._colMapping[this.fabaoInfo[0][i]]=i;
        }
    }
    ,
    getFragNum: function(fabaoID) {
        return this.fabaoInfo[fabaoID][this._colMapping[__CommonFabaoConf.FRAG_NUM]];
    }
    ,
    getFabaoType: function(fabaoID) {
        return this.fabaoInfo[fabaoID][this._colMapping[__CommonFabaoConf.FABAO_TYPE]];
    }
    ,
    getRecoverCDRound: function(fabaoID) {
        return this.fabaoInfo[fabaoID][this._colMapping[__CommonFabaoConf.RECOVER_CD_ROUND]];
    }
    ,
    getAbsorbFragCD: function(fabaoID) {
        return this.fabaoInfo[fabaoID][this._colMapping[__CommonFabaoConf.ABSORB_FRAG_CD]];
    }
    ,
    getLevel0To1AbsorbNum: function(fabaoID) {
        return this.fabaoInfo[fabaoID][this._colMapping[__CommonFabaoConf.LEVEL_0_1_NUM]];
    }
    ,
    getLevel1To2AbsorbNum: function(fabaoID) {
        return this.fabaoInfo[fabaoID][this._colMapping[__CommonFabaoConf.LEVEL_1_2_NUM]];
    }
    ,
    getLeve20To3AbsorbNum: function(fabaoID) {
        return this.fabaoInfo[fabaoID][this._colMapping[__CommonFabaoConf.LEVEL_2_3_NUM]];
    }
    ,
    getLevel3To4AbsorbNum: function(fabaoID) {
        return this.fabaoInfo[fabaoID][this._colMapping[__CommonFabaoConf.LEVEL_3_4_NUM]];
    }
    ,
    getLevel4To5AbsorbNum: function(fabaoID) {
        return this.fabaoInfo[fabaoID][this._colMapping[__CommonFabaoConf.LEVEL_4_5_NUM]];
    }
    ,
    getSkill1ID: function(fabaoID) {
        return this.fabaoInfo[fabaoID][this._colMapping[__CommonFabaoConf.SKILL1]];
    }
    ,
    getSkill2ID: function(fabaoID) {
        return this.fabaoInfo[fabaoID][this._colMapping[__CommonFabaoConf.SKILL2]];
    }
});
__CommonFabaoConf.FABAO_ID = 'FabaoID';
__CommonFabaoConf.FRAG_NUM = 'FragNum';
__CommonFabaoConf.FABAO_TYPE = 'Type';
__CommonFabaoConf.RECOVER_CD_ROUND = 'RecoverCDRound';
__CommonFabaoConf.ABSORB_FRAG_CD = 'AbsorbCD';
__CommonFabaoConf.LEVEL_0_1_NUM = 'Level0_1Num';
__CommonFabaoConf.LEVEL_1_2_NUM = 'Level1_2Num';
__CommonFabaoConf.LEVEL_2_3_NUM = 'Level2_3Num';
__CommonFabaoConf.LEVEL_3_4_NUM = 'Level3_4Num';
__CommonFabaoConf.LEVEL_4_5_NUM = 'Level4_5Num';
__CommonFabaoConf.SKILL1 = 'Skill1';
__CommonFabaoConf.SKILL2 = 'Skill2';

conf.commonFabaoConf = new __CommonFabaoConf();

__SkillConf = cc.Class.extend({
    _colMapping: new Array(),
    _maxCommonLength: 6,
    skillID: null,
    skillInfo: new Array(),
    buffCount: null,
    ctor: function(ID) {
        this.skillInfo = CSV.csvToArray(cc.FileUtils.getInstance().getTextFileData('Resources/Conf/'+ID+'.csv'), true);
        for(var i=0; i<_maxCommonLength; i++) {
            this._colMapping[this.skillInfo[0][i]]=i;
        }
        this.buffCount = this.skillInfo.length-_maxCommonLength;
    }
    ,
    getBuffCount: function(){
        return this.buffCount;
    }
    ,
    getBuffType: function(index) {
        if(index < 0 || index >= this.getBuffCount())
            return null;
        return this.skillInfo[0][index+this._maxCommonLength];
    }
    ,
    getBuffForLv: function(buffID, lv) {
        return this.skillInfo[lv][buffID];
    }
});
__SkillConf.LEVEL = 'Level';
__SkillConf.NAME = 'Name';
__SkillConf.CARD_LEVEL_NEED = 'CardLevelNeed';
__SkillConf.SKILL_TYPE = 'Type';
__SkillConf.BUFF_ROUND = 'BuffRound';
__SkillConf.DEBUFF_ROUND = 'DebufRound';

OneFabaoConf = cc.Class.extend({
    fabaoID: null,
    fragNum: null,
    fabaoType: null,
    recoverCDRound: null,
    absorbCD: null,
    level01Num: null,
    level12Num: null,
    level23Num: null,
    level34Num: null,
    level45Num: null,
    skill1: null,
    skill2: null,
    ctor: function(ID) {
        this.fabaoID = ID;
        
        this.fragNum = conf.commonFabaoConf.getFieldValueForCardID(ID, __CommonFabaoConf.FRAG_NUM);
        this.fabaoType = conf.commonFabaoConf.getFieldValueForCardID(ID, __CommonFabaoConf.FABAO_TYPE);
        this.recoverCDRound = conf.commonFabaoConf.getFieldValueForCardID(ID, __CommonFabaoConf.RECOVER_CD_ROUND);
        this.absorbCD = conf.commonFabaoConf.getFieldValueForCardID(ID, __CommonFabaoConf.ABSORB_FRAG_CD);
        this.level01Num = conf.commonFabaoConf.getFieldValueForCardID(ID, __CommonFabaoConf.LEVEL_0_1_NUM);
        this.level12Num = conf.commonFabaoConf.getFieldValueForCardID(ID, __CommonFabaoConf.LEVEL_1_2_NUM);
        this.level23Num = conf.commonFabaoConf.getFieldValueForCardID(ID, __CommonFabaoConf.LEVEL_2_3_NUM);
        this.level34Num = conf.commonFabaoConf.getFieldValueForCardID(ID, __CommonFabaoConf.LEVEL_3_4_NUM);
        this.level45Num = conf.commonFabaoConf.getFieldValueForCardID(ID, __CommonFabaoConf.LEVEL_4_5_NUM);
        this.level34Num = conf.commonFabaoConf.getFieldValueForCardID(ID, __CommonFabaoConf.LEVEL_3_4_NUM);
        this.level45Num = conf.commonFabaoConf.getFieldValueForCardID(ID, __CommonFabaoConf.LEVEL_4_5_NUM);
        
        this.skill1 = new __SkillConf(conf.commonFabaoConf.getFieldValueForCardID(ID, __CommonFabaoConf.SKILL1));
        this.skill2 = new __SkillConf(conf.commonFabaoConf.getFieldValueForCardID(ID, __CommonFabaoConf.SKILL2));
    }
});

__ZoneConf = cc.Class.extend({
    zoneID: null,
    levelCnt: null,
    ctor: function(zoneID, levelCnt) {
        this.zoneID = zoneID;
        this.levelCnt = levelCnt;
    }
});

MapConf = cc.Class.extend({
    _colMapping: new Array(),
    mapInfo: new Array(),
    zoneInfo: new Array(),
    ctor: function(){
        this.mapInfo = CSV.csvToArray(cc.FileUtils.getInstance().getTextFileData('Resources/Conf/map.csv'), true);
        for(var i=0; i<this.mapInfo[0].length; i++) {
            this._colMapping[this.mapInfo[0][i]]=i;
        }
        
        var levelCnt = 0;
        var zoneID = 0;
        for(var i=1; i<this.mapInfo.length; i++) {
            if(this.mapInfo[i][this._colMapping[this.ZONE_ID]] === zoneID) {
                levelCnt++;
            }
            else if(this.mapInfo[i][this._colMapping[this.ZONE_ID]] > zoneID) {
                this.zoneInfo['Zone'+zoneID] = new __ZoneConf(zoneID, levelCnt);
                levelCnt=1;
                zoneID = this.mapInfo[i][this._colMapping[this.ZONE_ID]];
            }
        }
        this.zoneInfo['Zone'+zoneID] = new __ZoneConf(zoneID, levelCnt);
    }
    ,
    getZoneInfo: function(zoneID) {
        return this.zoneInfo['Zone'+zoneID];
    }
    ,
    getLevelInfo: function(zone, level) {
        return this.mapInfo[getAbsoluteLevel(zone,level)];
    }
    ,
    getFieldValueForLevel: function(zone, level, field) {
        return this.mapInfo[getAbsoluteLevel(zone,level)][this._colMapping[field]];
    }
    ,
    getAbsoluteLevel: function(zone, level) {
        var totalLevel = 0;
        for(var i=0; i<this.zoneInfo.length && i<zone; i++) {
            totalLevel += this.zoneInfo['Zone'+i];
        }
        totalLevel += (level-1);
    }
});

MapConf.ID = 'ID';
MapConf.ZONE_ID = 'ZoneID';
MapConf.LEVEL_ID = 'LevelID';
MapConf.LEVEL_DESC = 'LevelDesc';
MapConf.MAX_HUNLI = 'MaxHunli';
MapConf.TYPE = 'Type';
MapConf.FIGHT_MON1 = 'FightMon1';
MapConf.FIGHT_MON2 = 'FightMon2';
MapConf.FIGHT_MON3 = 'FightMon3';
MapConf.FIGHT_PLAYER_NUM1 = 'FightPlayerNum1';
MapConf.FIGHT_PLAYER_NUM2 = 'FightPlayerNum2';
MapConf.FIGHT_PLAYER_NUM3 = 'FightPlayerNum3';
MapConf.DROP_ITEM1 = 'DropItem1';
MapConf.DROP_ITEM2 = 'DropItem2';
MapConf.DROP_ITEM3 = 'DropItem3';
MapConf.JUQING = 'JuQing';
MapConf.BRANCH_LEFT = 'BranchLeft';
MapConf.BRANCH_RIGHT = 'BranchRight';
MapConf.BRANCH_TOP = 'BranchTop';
MapConf.BRANCH_BOTTOM = 'BranchBottom';
    
MonsterConf = cc.Class.extend({
    _colMapping: new Array(),
    monsterInfo: null,
});

__Param = cc.Class.extend({
    mapConf: new MapConf(),
    monsterCardConf: new MonsterCardConf(),
    cardList: new Array(),
    
    ctor: function() {

        for(var i=0; i<conf.card_type.length; i++) {
            this.cardList[conf.card_type[i]] = new OneCardConf(conf.card_type[i]);
        }
        
        // special treatment for monsters in level
    }
});

conf.Param = new __Param;
