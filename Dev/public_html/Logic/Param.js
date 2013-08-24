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

conf.card_id = [
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
    _allCardInfo: new Array(),
    _colMapping: new Array(),
    _rowMapping: new Array(),
    ctor: function(){
        this._allCardInfo = CSV.csvToArray(cc.FileUtils.getInstance().getTextFileData('Resources/Conf/CardConf.csv'), true);
        for(var i=0; i<this._allCardInfo[0].length; i++) {
            this._colMapping[this._allCardInfo[0][i]]=i;
        }
        for(var i=0; i<this._allCardInfo.length; i++) {
            this._rowMapping[this._allCardInfo[i][0]]=i;
        }
    }
   ,
    getCardID: function(index) {
        return this._allCardInfo[index][0];
    }
    ,
    getCardCount: function() {
        return this._allCardInfo.length;
    }
    ,
    getInfoForCardID: function(cardID) {
        return this._allCardInfo[this._rowMapping[cardID]];
    }
    ,
    getFieldValueForCardID: function(cardID, field) {
        return this._allCardInfo[this._rowMapping[cardID]][this._colMapping[field]];
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
    _cardLevelInfo: new Array(),
    _colMapping: new Array(),
    ctor: function(ID){
        this.cardID = ID;
        this._cardLevelInfo = CSV.csvToArray(cc.FileUtils.getInstance().getTextFileData('Resources/Conf/Card/'+ID+'.csv'), true);
        for(var i=0; i<this._cardLevelInfo[0].length; i++) {
            this._colMapping[this._cardLevelInfo[0][i]]=i;
        }
        
        this.cardName = conf.Param._commonCardConf.getFieldValueForCardID(ID, __ComonCardConf.CARD_NAME);
        this.absorbCardCD = conf.Param._commonCardConf.getFieldValueForCardID(ID, __ComonCardConf.ABSORB_CARD_CD);
        this.fabaoType1 = conf.Param._commonCardConf.getFieldValueForCardID(ID, __ComonCardConf.FABAO_TYPE_1);
        this.fabaoType2 = conf.Param._commonCardConf.getFieldValueForCardID(ID, __ComonCardConf.FABAO_TYPE_2);
        this.fabaoType3 = conf.Param._commonCardConf.getFieldValueForCardID(ID, __ComonCardConf.FABAO_TYPE_3);
        this.star0_1CardNum = conf.Param._commonCardConf.getFieldValueForCardID(ID, __ComonCardConf.STAR_0_1_Card_NUM);
        this.star1_2CardNum = conf.Param._commonCardConf.getFieldValueForCardID(ID, __ComonCardConf.STAR_1_2_Card_NUM);
        this.star2_3CardNum = conf.Param._commonCardConf.getFieldValueForCardID(ID, __ComonCardConf.STAR_2_3_Card_NUM);
        this.star3_4CardNum = conf.Param._commonCardConf.getFieldValueForCardID(ID, __ComonCardConf.STAR_3_4_Card_NUM);
        this.star4_5CardNum = conf.Param._commonCardConf.getFieldValueForCardID(ID, __ComonCardConf.STAR_4_5_Card_NUM);
    }
    ,
    getExpForLv: function(level) {
        return this._cardLevelInfo[level][this._colMapping[OneCardConf.EXP]];
    }
    ,
    getLvExpForLv: function(level) {
        return this._cardLevelInfo[level][this._colMapping[OneCardConf.LV_EXP]];
    }
    ,
    getHpForLv: function(level) {
        return this._cardLevelInfo[level][this._colMapping[OneCardConf.HP]];
    }
    ,
    getAttackForLv: function(level) {
        return this._cardLevelInfo[level][this._colMapping[OneCardConf.ATTACK]];
    }
    ,
    getCriticAttackForLv: function(level) {
        return this._cardLevelInfo[level][this._colMapping[OneCardConf.CRITIC_ATTACK]];
    }
    ,
    getFanshiRatForLv: function(level) {
        return this._cardLevelInfo[level][this._colMapping[OneCardConf.FANSHI]];
    }
    ,
    getDefenseForLv: function(level) {
        return this._cardLevelInfo[level][this._colMapping[OneCardConf.DEFENSE]];
    }
    ,
    getJuqiForLv: function(level) {
        return this._cardLevelInfo[level][this._colMapping[OneCardConf.JUQI]];
    }    
    ,
    getRecoverHPSpeedForLv: function(level) {
        return this._cardLevelInfo[level][this._colMapping[OneCardConf.RECOVER_HP_SPEED]];
    }    
    ,
    getReviveTimeForLv: function(level) {
        return this._cardLevelInfo[level][this._colMapping[OneCardConf.REVIVE_TIME]];
    }    
    ,
    getJuqiExpForLv: function(level) {
        return this._cardLevelInfo[level][this._colMapping[OneCardConf.JUQI_EXP]];
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
OneCardConf.RECOVER_HP_SPEED = 'RecoverHPSpeed';
OneCardConf.REVIVE_TIME = 'ReviveTime';
OneCardConf.JUQI_EXP = 'JuqiExp';

__CommonFabaoConf = cc.Class.extend({
    _fabaoInfo: new Array(),
    _colMapping: new Array(),
    _rowMapping: new Array(),
    ctor: function() {
        this._fabaoInfo = CSV.csvToArray(cc.FileUtils.getInstance().getTextFileData('Resources/Conf/FabaoConf.csv'), true);
        for(var i=0; i<this._fabaoInfo[0].length; i++) {
            this._colMapping[this._fabaoInfo[0][i]]=i;
        }
        for(var i=0; i<this._fabaoInfo.length; i++) {
            this._rowMapping[this._fabaoInfo[i][0]]=i;
        }
    }
    ,
    getFabaoID: function(index) {
        return this._fabaoInfo[index][0];
    }
    ,
    getFabaoCount: function() {
        return this._fabaoInfo.length;
    }
    ,
    getInfoForFabaoID: function(fabaoID) {
        return this._fabaoInfo[this._rowMapping[fabaoID]];
    }
    ,
    getFieldValueForFabaoID: function(fabaoID, field){
        return this._fabaoInfo[this._rowMapping[fabaoID]][this._colMapping[field]];
    }
});
__CommonFabaoConf.FABAO_ID = 'FabaoID';
__CommonFabaoConf.NAME = 'Name';
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

SkillConf = cc.Class.extend({
    _colMapping: new Array(),
    _maxCommonLength: 7,
    _skillID: null,
    _skillInfo: new Array(),
    _buffCount: null,
    ctor: function(ID) {
        if(IsNull(ID) || ID === '')
            return;
        
        this._skillInfo = CSV.csvToArray(cc.FileUtils.getInstance().getTextFileData('Resources/Conf/Skill/'+ID+'.csv'), true);
        for(var i=0; i<this._maxCommonLength; i++) {
            this._colMapping[this._skillInfo[0][i]]=i;
        }
        this._buffCount = this._skillInfo.length-this._maxCommonLength;
    }
    ,
    getSkillID: function() {
        return this._skillID;
    }
    ,
    getSkillNameForLv: function(level) {
        return this._skillInfo[level][this._colMapping[SkillConf.NAME]];
    }
    ,
    getCardLevelNeedForLv: function(level) {
        return this._skillInfo[level][this._colMapping[SkillConf.CARD_LEVEL_NEED]];
    }
    ,
    getSkillTypeForLv: function(level) {
        return this._skillInfo[level][this._colMapping[SkillConf.SKILL_TYPE]];
    }
    ,
    getRecoverCDRoundForLv: function(level) {
        return this._skillInfo[level][this._colMapping[SkillConf.RECOVER_CD_ROUND]];
    }
    ,
    getBuffRoundForLv: function(level) {
        return this._skillInfo[level][this._colMapping[SkillConf.BUFF_ROUND]];
    }
    ,
    getDebufRoundForLv: function(level) {
        return this._skillInfo[level][this._colMapping[SkillConf.DEBUFF_ROUND]];
    }
    ,
    getBuffCount: function(){
        return this._buffCount;
    }
    ,
    getBuffType: function(index) {
        if(index < 0 || index >= this.getBuffCount())
            return null;
        return this._skillInfo[0][index+this._maxCommonLength];
    }
    ,
    getBuffForLv: function(buffID, lv) {
        return this._skillInfo[lv][buffID];
    }
});
SkillConf.LEVEL = 'Level';
SkillConf.NAME = 'Name';
SkillConf.CARD_LEVEL_NEED = 'CardLevelNeed';
SkillConf.SKILL_TYPE = 'Type';
SkillConf.RECOVER_CD_ROUND = 'RecoverCDRound';
SkillConf.BUFF_ROUND = 'BuffRound';
SkillConf.DEBUFF_ROUND = 'DebufRound';

OneFabaoConf = cc.Class.extend({
    _fabaoID: null,
    _name: null,
    _fragNum: null,
    _fabaoType: null,
    _recoverCDRound: null,
    _absorbCD: null,
    _level01Num: null,
    _level12Num: null,
    _level23Num: null,
    _level34Num: null,
    _level45Num: null,
    _skill1: null,
    _skill2: null,
    ctor: function(ID) {
        this._fabaoID = ID;
        
        this._fragNum = conf.Param._commonFabaoConf.getFieldValueForFabaoID(ID, __CommonFabaoConf.FRAG_NUM);
        this._name = conf.Param._commonFabaoConf.getFieldValueForFabaoID(ID, __CommonFabaoConf.NAME);
        this._fabaoType = conf.Param._commonFabaoConf.getFieldValueForFabaoID(ID, __CommonFabaoConf.FABAO_TYPE);
        this._recoverCDRound = conf.Param._commonFabaoConf.getFieldValueForFabaoID(ID, __CommonFabaoConf.RECOVER_CD_ROUND);
        this._absorbCD = conf.Param._commonFabaoConf.getFieldValueForFabaoID(ID, __CommonFabaoConf.ABSORB_FRAG_CD);
        this._level01Num = conf.Param._commonFabaoConf.getFieldValueForFabaoID(ID, __CommonFabaoConf.LEVEL_0_1_NUM);
        this._level12Num = conf.Param._commonFabaoConf.getFieldValueForFabaoID(ID, __CommonFabaoConf.LEVEL_1_2_NUM);
        this._level23Num = conf.Param._commonFabaoConf.getFieldValueForFabaoID(ID, __CommonFabaoConf.LEVEL_2_3_NUM);
        this._level34Num = conf.Param._commonFabaoConf.getFieldValueForFabaoID(ID, __CommonFabaoConf.LEVEL_3_4_NUM);
        this._level45Num = conf.Param._commonFabaoConf.getFieldValueForFabaoID(ID, __CommonFabaoConf.LEVEL_4_5_NUM);
        
        this._skill1 = new SkillConf(conf.Param._commonFabaoConf.getFieldValueForFabaoID(ID, __CommonFabaoConf.SKILL1));
        this._skill2 = new SkillConf(conf.Param._commonFabaoConf.getFieldValueForFabaoID(ID, __CommonFabaoConf.SKILL2));
    }
    ,
    getFabaoID: function() {
        return this._fabaoID;
    }
    ,
    getFragNum: function() {
        return this._fragNum;
    }
    ,
    getFabaoType: function() {
        return this._fabaoType;
    }
    ,
    getRecoverCDRound: function(_fabaoID) {
        return this._recoverCDRound;
    }
    ,
    getAbsorbFragCD: function(_fabaoID) {
        return this._absorbCD;
    }
    ,
    getLevel0To1AbsorbNum: function(_fabaoID) {
        return this._level01Num;
    }
    ,
    getLevel1To2AbsorbNum: function(_fabaoID) {
        return this._level12Num;
    }
    ,
    getLeve20To3AbsorbNum: function(_fabaoID) {
        return this._level23Num;
    }
    ,
    getLevel3To4AbsorbNum: function(_fabaoID) {
        return this._level34Num;
    }
    ,
    getLevel4To5AbsorbNum: function(_fabaoID) {
        return this._level45Num;
    }
    ,
    getSkill1ID: function(_fabaoID) {
        return this._skill1;
    }
    ,
    getSkill2ID: function(_fabaoID) {
        return this._skill2;
    }
});

    
__CommonMonsterConf = cc.Class.extend({
    _colMapping: new Array(),
    _rowMapping: new Array(),
    _monsterInfo: new Array(),
    ctor: function() {
        this._monsterInfo = CSV.csvToArray(cc.FileUtils.getInstance().getTextFileData('Resources/Conf/MonsterCard.csv'), true);
        for(var i=0; i<this._monsterInfo[0].length; i++) {
            this._colMapping[this._monsterInfo[0][i]]=i;
        }
        for(var i=0; i<this._monsterInfo.length; i++) {
            this._rowMapping[this._monsterInfo[i][0]]=i;
        }
    }
    ,
    getMonsterID: function(index) {
        return this._monsterInfo[index][0];
    }
    ,
    getMonsterCount: function() {
        return this._monsterInfo.length;
    }
    ,
    getInfoForMonsterID: function(monsterID) {
        return this._monsterInfo[this._rowMapping[monsterID]];
    }
    ,
    getFieldValueForMonID: function(monsterID, field){
        return this._monsterInfo[this._rowMapping[monsterID]][this._colMapping[field]];
    }    
});
__CommonMonsterConf.MONSTER_ID = 'MonsterID';
__CommonMonsterConf.MONSTER_NAME = 'Name';
__CommonMonsterConf.MONSTER_TYPE = 'Type';
__CommonMonsterConf.FABAO_TAKEN_1 = 'FabaoTaken1';
__CommonMonsterConf.FABAO_TAKEN_2 = 'FabaoTaken2';
__CommonMonsterConf.FABAO_TAKEN_3 = 'FabaoTaken3';

OneMonsterConf = cc.Class.extend({
    _colMapping: new Array(),
    _monsterID: null,
    _monsterName: null,
    _fabaoTaken1: null,
    _fabaoTaken2: null,
    _fabaoTaken3: null,
    _monsterInfo: null,
    _monsterCardInfo: null,
    _fragNum: 8,
    ctor: function(ID){
        this._monsterID = ID;
        this._monsterInfo = CSV.csvToArray(cc.FileUtils.getInstance().getTextFileData('Resources/Conf/Monster/'+ID+'.csv'), true);
        for(var i=0; i<this._monsterInfo[0].length; i++) {
            this._colMapping[this._monsterInfo[0][i]]=i;
        }
        this._monsterName = conf.Param._commonMonsterConf.getFieldValueForMonID(ID, __CommonMonsterConf.MONSTER_NAME);
        this._monsterCardInfo = conf.Param.cardList[conf.Param._commonMonsterConf.getFieldValueForMonID(ID, __CommonMonsterConf.MONSTER_TYPE)];
        this._fabaoTaken1 = conf.Param._commonMonsterConf.getFieldValueForMonID(ID, __CommonMonsterConf.FABAO_TAKEN_1);
        this._fabaoTaken2 = conf.Param._commonMonsterConf.getFieldValueForMonID(ID, __CommonMonsterConf.FABAO_TAKEN_2);
        this._fabaoTaken3 = conf.Param._commonMonsterConf.getFieldValueForMonID(ID, __CommonMonsterConf.FABAO_TAKEN_3);
    }
    ,
    getMonsterID: function() {
        return this._monsterID;
    }
    , 
    getMonsterName: function() {
        return this._monsterName;
    }
    ,
    getFabaoTaken1: function() {
        
    }
    ,
    getHpForLv: function(level) {
        return this._monsterCardInfo.getHpForLv(level);
    }
    ,
    getAttackForLv: function(level) {
        return this._monsterCardInfo.getAttackForLv(level);
    }
    ,
    getCriticAttackForLv: function(level) {
        return this._monsterCardInfo.getCriticAttackForLv(level);
    }
    ,
    getFanshiRatForLv: function(level) {
        return this._monsterCardInfo.getFanshiRatForLv(level);
    }
    ,
    getDefenseForLv: function(level) {
        return this._monsterCardInfo.getDefenseForLv(level);
    }
    ,
    getJuqiForLv: function(level) {
        return this._monsterCardInfo.getJuqiForLv(level);
    }
    ,
    getCardDropForLv: function(level) {
        return this._monsterInfo[level][this._colMapping[OneMonsterConf.CARD_DROP]];
    }
    ,
    getExpDropForLv: function(level) {
        return this._monsterInfo[level][this._colMapping[OneMonsterConf.EXP_DROP]];
    }
    ,
    getXianliDropForLv: function(level) {
        return this._monsterInfo[level][this._colMapping[OneMonsterConf.XIANLI_DROP]];
    }
    ,
    getCoinDropForLv: function(level) {
        return this._monsterInfo[level][this._colMapping[OneMonsterConf.COIN_DROP]];
    }
    ,
    getXiantaoDropForLv: function(level) {
        return this._monsterInfo[level][this._colMapping[OneMonsterConf.XIANTAO_DROP]];
    }
    ,
    getPantaoDropForLv: function(level) {
        return this._monsterInfo[level][this._colMapping[OneMonsterConf.PANTAO_DROP]];
    }
    ,
    getRenshengguoDropForLv: function(level) {
        return this._monsterInfo[level][this._colMapping[OneMonsterConf.RENSHENGGUO_DROP]];
    }
    ,
    getHuanhundanDropForLv: function(level) {
        return this._monsterInfo[level][this._colMapping[OneMonsterConf.HUANHUNDAN_DROP]];
    }
    ,
    getLuckyCharmDropForLv: function(level) {
        return this._monsterInfo[level][this._colMapping[OneMonsterConf.LUCKY_CHARM_DROP]];
    }
    ,
    getFeverCharmDropForLv: function(level) {
        return this._monsterInfo[level][this._colMapping[OneMonsterConf.FEVER_CHARM_DROP]];
    }
    ,
    getFriendCharmDropForLv: function(level) {
        return this._monsterInfo[level][this._colMapping[OneMonsterConf.FRIEND_CHARM_DROP]];
    }
    ,
    getYuanbaoDropForLv: function(level) {
        return this._monsterInfo[level][this._colMapping[OneMonsterConf.YUANBAO_DROP]];
    }
    ,
    getSuipianID: function(index) {
        if(index < 0 || index >= this._fragNum)
            return null;
        return this._monsterInfo[0][index+this._fragNum];
    }
    ,
    getSuipianDropForLv: function(suipianID, lv) {
        return this._skillInfo[lv][suipianID];
    }
});

OneMonsterConf.LEVEL = 'Level';
OneMonsterConf.CARD_DROP = 'CardDrop';
OneMonsterConf.EXP_DROP = 'ExpDrop';
OneMonsterConf.XIANLI_DROP = 'XianliDrop';
OneMonsterConf.COIN_DROP = 'CoinDrop';
OneMonsterConf.XIANTAO_DROP = 'XiantaoDrop';
OneMonsterConf.PANTAO_DROP = 'PantaoDrop';
OneMonsterConf.RENSHENGGUO_DROP = 'RenshengguoDrop';
OneMonsterConf.HUANHUNDAN_DROP = 'HuanhundanDrop';
OneMonsterConf.LUCKY_CHARM_DROP = 'LuckyCharmDrop';
OneMonsterConf.FEVER_CHARM_DROP = 'FeverCharmDrop';
OneMonsterConf.FRIEND_CHARM_DROP = 'FriendCharmDrop';
OneMonsterConf.YUANBAO_DROP = 'YuanbaoDrop';

LevelConf = cc.Class.extend({
    _absoluteLevelID: null,
    _belongZone: null,
    _thisLevelID: null,
    _levelDesc: null,
    _maxSoulCollect: null,
    _levelType: null,
    _nextFightCD: null,
    _score1Reward: null,
    _score2Reward: null,
    _score3Reward: null,
    _score4Reward: null,
    _1stFightMonList: null,
    _2ndFightMonList: null,
    _3rdFightMonList: null,
    _1stFightCardNum: null,
    _2ndFightCardNum: null,
    _3rdFightCardNum: null,
    _storyDropItem1: null,
    _storyDropItem2: null,
    _storyDropItem3: null,
    _hasStory: null,
    _leftLevel: null,
    _rightLevel: null,
    _topLevel: null,
    _bottomLevel: null,
    ctor: function(levelInfo, colMapping){
        this._absoluteLevelID = levelInfo[colMapping[MapConf.ID]];
        this._belongZone = levelInfo[colMapping[MapConf.ZONE_ID]];
        this._thisLevelID = levelInfo[colMapping[MapConf.LEVEL_ID]];
        this._levelDesc = levelInfo[colMapping[MapConf.LEVEL_DESC]];
        this._maxSoulCollect = levelInfo[colMapping[MapConf.MAX_HUNLI]];
        this._levelType = levelInfo[colMapping[MapConf.TYPE]];
        this._nextFightCD = levelInfo[colMapping[MapConf.NEXT_FIGHT_CD]];
        this._score1Reward = levelInfo[colMapping[MapConf.SCORE_1_REWARD]];
        this._score2Reward = levelInfo[colMapping[MapConf.SCORE_2_REWARD]];
        this._score3Reward = levelInfo[colMapping[MapConf.SCORE_3_REWARD]];
        this._score4Reward = levelInfo[colMapping[MapConf.SCORE_4_REWARD]];
        this._1stFightCardNum = levelInfo[colMapping[MapConf.FIGHT_CARD_NUM1]];
        this._2ndFightCardNum = levelInfo[colMapping[MapConf.FIGHT_CARD_NUM2]];
        this._3rdFightCardNum = levelInfo[colMapping[MapConf.FIGHT_CARD_NUM3]];
        this._storyDropItem1 = levelInfo[colMapping[MapConf.DROP_ITEM1]];
        this._storyDropItem2 = levelInfo[colMapping[MapConf.DROP_ITEM2]];
        this._storyDropItem3 = levelInfo[colMapping[MapConf.DROP_ITEM3]];
        this._hasStory = levelInfo[colMapping[MapConf.JUQING]];
        this._leftLevel = levelInfo[colMapping[MapConf.BRANCH_LEFT]];
        this._rightLevel = levelInfo[colMapping[MapConf.BRANCH_RIGHT]];
        this._topLevel = levelInfo[colMapping[MapConf.BRANCH_TOP]];
        this._bottomLevel = levelInfo[colMapping[MapConf.BRANCH_BOTTOM]];
        
        var fight1Mons = levelInfo[colMapping[MapConf.FIGHT_MON1]].split('|');
        for(var i=0; i<fight1Mons.length; i++) {
            var monParams = fight1Mons[i].split('_');
            var monsterInfo = conf.Param.monsterList[monParams[0]];
            this._1stFightMonList.push([monsterInfo.getMonsterID(), monsterInfo, monParams[1], monParams[2]]);
        }

        var fight2Mons = levelInfo[colMapping[MapConf.FIGHT_MON2]].split('|');
        for(var i=0; i<fight2Mons.length; i++) {
            var monParams = fight2Mons[i].split('_');
            var monsterInfo = conf.Param.monsterList[monParams[0]];
            this._2ndFightMonList.push([monsterInfo.getMonsterID(), monsterInfo, monParams[1], monParams[2]]);
        }

        var fight3Mons = levelInfo[colMapping[MapConf.FIGHT_MON3]].split('|');
        for(var i=0; i<fight3Mons.length; i++) {
            var monParams = fight3Mons[i].split('_');
            var monsterInfo = conf.Param.monsterList[monParams[0]];
            this._3rdFightMonList.push([monsterInfo.getMonsterID(), monsterInfo, monParams[1], monParams[2]]);
        }
    }
    ,
    convertToAbsoluteLevelID: function() {
        return this._absoluteLevelID;
    }
    ,
    getBelongZone: function() {
        return this._belongZone;
    }
    ,
    getThisLevelID: function() {
        return this._thisLevelID;
    }
    ,
    getLevelDesc: function() {
        return this._levelDesc;
    }
    ,
    getMaxSoulCollect: function() {
        return this._maxSoulCollect;
    }
    ,
    getLevelType: function() {
        return this._levelType;
    }
    ,
    getNextFightCD: function() {
        return this._nextFightCD;
    }
    ,
    getScore1Reward: function() {
        return this._score1Reward;
    }
    ,
    getScore2Reward: function() {
        return this._score2Reward;
    }
    ,
    getScore3Reward: function() {
        return this._score3Reward;
    }
    ,
    getScore4Reward: function() {
        return this._score4Reward;
    }
    ,
    get1stFightCardNum: function() {
        return this._1stFightCardNum;
    }
    ,
    get2ndFightCardNum: function() {
        return this._2ndFightCardNum;
    }
    ,
    get3rdFightCardNum: function() {
        return this._3rdFightCardNum;
    }
    ,
    getStoryDropItem1: function() {
        return this._storyDropItem1;
    }
    ,
    getStoryDropItem2: function() {
        return this._storyDropItem2;
    }
    ,
    getStoryDropItem3: function() {
        return this._storyDropItem3;
    }
    ,
    getHasStory: function() {
        return this._hasStory;
    }
    ,
    getLeftLevel: function() {
        return this._leftLevel;
    }
    ,
    getRightLevel: function() {
        return this._rightLevel;
    }
    ,
    getTopLevel: function() {
        return this._topLevel;
    }
    ,
    getBottomLevel: function() {
        return this._bottomLevel;
    }
    ,
    get1stFightMonList: function() {
        return this._1stFightMonList;
    }
    ,
    get2ndFightMonList: function() {
        return this._2ndFightMonList;
    }
    ,
    get3rdFightMonList: function() {
        return this._3rdFightMonList;
    }
});

ZoneConf = cc.Class.extend({
    _zoneID: null,
    _levelCnt: null,
    _LevelList: new Array(),
    ctor: function(_zoneID, _levelCnt, rawLevelInfoList, colMapping) {
        this._zoneID = _zoneID;
        this._levelCnt = _levelCnt;
        for(var i=0; i<rawLevelInfoList.length; i++) {
            this._LevelList.push(new LevelConf(rawLevelInfoList[i], colMapping));
        }
    }
    ,
    getZoneID: function() {
        return this._zoneID;
    }
    ,
    getLevelCnt: function() {
        return this._levelCnt;
    }
    ,
    getLevelList: function() {
        return this._LevelList;
    }
});

MapConf = cc.Class.extend({
    _colMapping: new Array(),
    _zoneList: new Array(),
    ctor: function(){
        var rawMapInfo = CSV.csvToArray(cc.FileUtils.getInstance().getTextFileData('Resources/Conf/Map.csv'), true);
        for(var i=0; i<rawMapInfo[0].length; i++) {
            this._colMapping[rawMapInfo[0][i]]=i;
        }
        
        // init zone info
        var levelCnt = 0;
        var zoneID = 0;
        var levelInfoList = new Array();
        for(var i=1; i<rawMapInfo.length; i++) {
            if(rawMapInfo[i][this._colMapping[this.ZONE_ID]] === zoneID) {
                levelInfoList.push(rawMapInfo[i-1]);
                levelCnt++;
            }
            else if(rawMapInfo[i][this._colMapping[this.ZONE_ID]] > zoneID) {
                this._zoneList[zoneID] = new ZoneConf(zoneID, levelCnt, levelInfoList.clone(), this._colMapping);
                levelInfoList.clear();
                zoneID = rawMapInfo[i][this._colMapping[this.ZONE_ID]];
                i--;
            }
        }
        this._zoneList[zoneID] = new ZoneConf(zoneID, levelCnt, levelInfoList.clone(), this._colMapping);
    }
    ,
    getZoneInfo: function(zoneID) {
        return this._zoneList[zoneID];
    }
    ,
    convertToAbsoluteLevel: function(zone, level) {
        var totalLevel = 0;
        for(var i=0; i<this._zoneList.length && i<zone; i++) {
            totalLevel += this._zoneList[i].getLevelCnt();
        }
        totalLevel += level;
        return totalLevel;
    }
    ,
    convertToZoneLevel: function(zone, abLevel) {
        var relativeLevel = 0;
        for(var i=0; i<this._zoneList.length && i<zone; i++) {
            if(abLevel <= this._zoneList[i].getLevelCnt()) {
                relativeLevel =  abLevel;
                break;
            }
            else
                abLevel -= this._zoneList[i].getLevelCnt();
        }
        return relativeLevel;
    }
});

MapConf.ID = 'ID';
MapConf.ZONE_ID = 'ZoneID';
MapConf.LEVEL_ID = 'LevelID';
MapConf.LEVEL_DESC = 'LevelDesc';
MapConf.MAX_HUNLI = 'MaxHunli';
MapConf.TYPE = 'Type';
MapConf.NEXT_FIGHT_CD = 'CD';
MapConf.SCORE_1_REWARD = 'Score1Reward';
MapConf.SCORE_2_REWARD = 'Score2Reward';
MapConf.SCORE_3_REWARD = 'Score3Reward';
MapConf.SCORE_4_REWARD = 'Score4Reward';
MapConf.FIGHT_MON1 = 'FightMon1';
MapConf.FIGHT_MON2 = 'FightMon2';
MapConf.FIGHT_MON3 = 'FightMon3';
MapConf.FIGHT_CARD_NUM1 = 'FightCardNum1';
MapConf.FIGHT_CARD_NUM2 = 'FightCardNum2';
MapConf.FIGHT_CARD_NUM3 = 'FightCardNum3';
MapConf.DROP_ITEM1 = 'DropItem1';
MapConf.DROP_ITEM2 = 'DropItem2';
MapConf.DROP_ITEM3 = 'DropItem3';
MapConf.JUQING = 'JuQing';
MapConf.BRANCH_LEFT = 'BranchLeft';
MapConf.BRANCH_RIGHT = 'BranchRight';
MapConf.BRANCH_TOP = 'BranchTop';
MapConf.BRANCH_BOTTOM = 'BranchBottom';

__Param = cc.Class.extend({
    _commonCardConf : new __ComonCardConf(),
    _commonFabaoConf : new __CommonFabaoConf(),
    _commonMonsterConf: new __CommonMonsterConf(),

    cardList: new Array(),
    monsterList: new Array(),
    fabaoList: new Array(),
    mapConf: null,
    
    ctor: function() {

    }
    ,
    init: function() {

        for (var i=1; i<this._commonCardConf.getCardCount(); i++) {
            this.cardList[this._commonCardConf.getCardID(i)] = new OneCardConf(this._commonCardConf.getCardID(i));
        }

        for (var i=1; i<this._commonMonsterConf.getMonsterCount(); i++) {
            this.monsterList[this._commonMonsterConf.getMonsterID(i)] = new OneMonsterConf(this._commonMonsterConf.getMonsterID(i));
        }

        for (var i=1; i<this._commonFabaoConf.getFabaoCount(); i++) {
            this.fabaoList[this._commonFabaoConf.getFabaoID(i)] = new OneFabaoConf(this._commonFabaoConf.getFabaoID(i));
        }

        this._mapConf = new MapConf();
    }
});

conf.Param = new __Param;
conf.Param.init();
