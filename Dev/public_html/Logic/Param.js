var conf = conf || {};

conf.MAP_PARAM = 'map';
conf.MONSTER_CARD_PARAM = 'monster_card'; 


conf.TANGSANZANG = 'TangSangzang';
conf.SUNWUKONG = 'SunWukong';
conf.ZHUBAJIE = 'ZhuBajie';
conf.BAILONGMA = 'BaiLongma';
conf.LIUBOXIN = 'LiuBoxin';
conf.WUKONGLIUYI = 'WukongLiuyi';
conf.GUICHENGXIANG = 'GuiChengxiang';
conf.LINGXUZI = 'LingXuzi';
conf.HEIXIONGJING = 'HeiXiongjing';
conf.HUXIANFENG = 'HuXianfeng';
conf.HUANGFENGGUAI = 'HuangFengguai';
conf.PUTONG_ATTACK = 'PutongAttack';
conf.PUTONG_RECOVER = 'PutongRecover';
conf.PUTONG_AGILE = 'PutongAgile';
conf.PUTONG_DEFENSE = 'PutongDefense';
conf.JINGYING_ATTACK = 'JingyingAttack';
conf.JINGYING_RECOVER = 'JingyingRecover';
conf.JINGYING_AGILE = 'JingyingAgile';
conf.JINGYING_DEFENSE = 'JingyingDefense';
conf.BOSS_ATTACK = 'BossAttack';
conf.BOSS_RECOVER = 'BossRecover';
conf.BOSS_AGILE = 'BossAgile';
conf.BOSS_DEFENSE = 'BossDefense';

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

__CardConf = cc.Class.extend({
    cardName: null,
    cardInfo: new Array(),
    colMapping: new Array(),
    ctor: function(name){
        this.cardName = name;
        this.cardInfo = CSV.csvToArray(cc.FileUtils.getInstance().getTextFileData('Resources/Conf/Card/'+name+'.csv'), true);
        for(var i=0; i<this.cardInfo[0].length; i++) {
            this.colMapping[this.cardInfo[0][i]]=i;
        }
    }
    ,
    getFieldValueForLv: function(level, field) {
        return this.cardInfo[level][this.colMapping[field]];
    }
});

__CardConf.EXP = 'Exp';
__CardConf.LV_EXP = 'LvExp';
__CardConf.HP = 'Hp';
__CardConf.ATTACK = 'Attack';
__CardConf.CRITIC_ATTACK = 'CriticAtt';
__CardConf.FANSHI = 'Fanshi';
__CardConf.DEFENSE = 'Defense';
__CardConf.JUQI = 'Juqi';

__MonsterCardConf = cc.Class.extend({    
    monsterInfo: new Array(),
    colMapping: new Array(),
    ctor: function(){
        var monArray = CSV.csvToArray(cc.FileUtils.getInstance().getTextFileData('Resources/Conf/monster_card.csv'), true);
        for(var i=0; i<monArray[0].length; i++) {
            this.colMapping[monArray[0][i]]=i;
        }
        
        for(var i=1; i<monArray.length; i++) {
            this.monsterInfo[monArray[i][this.colMapping[this.NAME]]] = monArray[i];
        }
    }
    ,
    getMonsterType: function(name){
        return this.monsterInfo[name][this.colMapping[this.NAME]];
    }
});

__MonsterCardConf.NAME = 'Name';
__MonsterCardConf.DESC = 'Desc';
__MonsterCardConf.TYPE = 'Type';

__LevelConf = cc.Class.extend({
    levelInfo: new Array(),
    cotr: function(levelInfo) {
        this.levelInfo = levelInfo;
    }
    ,
    getFieldValue: function(field) {
        return this.levelInfo[this.colMapping[field]];
    }
});

__ZoneConf = cc.Class.extend({
    zoneID: 0,
    levelCnt: 0,
    ctor: function(zoneID, levelCnt) {
        this.zoneID = zoneID;
        this.levelCnt = levelCnt;
    }
});

__MapConf = cc.Class.extend({
    mapInfo: new Array(),
    colMapping: new Array(),
    zoneList: new Array(),
    ctor: function(){
        this.mapInfo = CSV.csvToArray(cc.FileUtils.getInstance().getTextFileData('Resources/Conf/map.csv'), true);
        for(var i=0; i<this.mapInfo[0].length; i++) {
            this.colMapping[this.mapInfo[0][i]]=i;
        }
        
        var levelCnt = 0;
        var zoneID = 0;
        for(var i=1; i<this.mapInfo.length; i++) {
            if(this.mapInfo[i][this.colMapping[this.ZONE_ID]] === zoneID) {
                levelCnt++;
            }
            else if(this.mapInfo[i][this.colMapping[this.ZONE_ID]] > zoneID) {
                this.zoneInfo[zoneID] = new __ZoneConf(zoneID, levelCnt);
                levelCnt=1;
                zoneID = this.mapInfo[i][this.colMapping[this.ZONE_ID]];
            }
        }
        this.zoneList[zoneID] = new __ZoneConf(zoneID, levelCnt);
    }
    ,
    getZoneInfo: function(zoneID) {
        return this.zoneInfo[zoneID];
    }
    ,
    getLevelInfo: function(zone, level) {
        return new __LevelConf(this.cardInfo[getAbsoluteLevel(zone,level)]);
    }
    ,
    getFieldValueForLevel: function(zone, level, field) {
        return this.cardInfo[getAbsoluteLevel(zone,level)][this.colMapping[field]];
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

__MapConf.ID = 'ID';
__MapConf.ZONE_ID = 'ZoneID';
__MapConf.LEVEL_ID = 'LevelID';
__MapConf.LEVEL_DESC = 'LevelDesc';
__MapConf.MAX_HUNLI = 'MaxHunli';
__MapConf.TYPE = 'Type';
__MapConf.ZONE_CD = 'CD';
__MapConf.SCORE_1_REWARD = 'Score1Reward';
__MapConf.SCORE_2_REWARD = 'Score2Reward';
__MapConf.SCORE_3_REWARD = 'Score3Reward';
__MapConf.SCORE_4_REWARD = 'Score4Reward';
__MapConf.FIGHT_MON1 = 'FightMon1';
__MapConf.FIGHT_MON2 = 'FightMon2';
__MapConf.FIGHT_MON3 = 'FightMon3';
__MapConf.FIGHT_PLAYER_NUM1 = 'FightPlayerNum1';
__MapConf.FIGHT_PLAYER_NUM2 = 'FightPlayerNum2';
__MapConf.FIGHT_PLAYER_NUM3 = 'FightPlayerNum3';
__MapConf.DROP_ITEM1 = 'DropItem1';
__MapConf.DROP_ITEM2 = 'DropItem2';
__MapConf.DROP_ITEM3 = 'DropItem3';
__MapConf.JUQING = 'JuQing';
__MapConf.BRANCH_LEFT = 'BranchLeft';
__MapConf.BRANCH_RIGHT = 'BranchRight';
__MapConf.BRANCH_TOP = 'BranchTop';
__MapConf.BRANCH_BOTTOM = 'BranchBottom';
    
__Param = cc.Class.extend({
    mapConf: new __MapConf(),
    monsterCardConf: new __MonsterCardConf(),
    cardList: new Array(),
    
    ctor: function() {

        for(var i=0; i<conf.card_type.length; i++) {
            this.cardList[conf.card_type[i]] = new __CardConf(conf.card_type[i]);
        }
        
        // special treatment for monsters in level
    }
});

conf.Param = new __Param;

var Window = Window || {};