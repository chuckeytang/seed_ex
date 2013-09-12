// in charge of the logic of battle and update info of both sides
var BattleTeam = cc.Class.extend({
    _cardList: null,
    ctor: function(cardList) {
        this._cardList = cardList;
    },

    getCard: function(index) {
        return this._cardList[index];
    }
});

var BattleResult = cc.Class.extend({
    
});

var BattleField = cc.Class.extend({
    myTeam: null,     //PlayerCard
    peerTeam: null,   //PlayerCard or MonsterCard

    ctor: function() {
    },

    init: function() {

        this.myTeam = new BattleTeam(gPlayer.getBattleCards());

        var zone = gMap.getZone(gPlayer.playingZone);           //ZoneMap
        var levelNode = zone.getLevel(gPlayer.playingLevel);    //LevelNode
        var enemyList;
        switch(levelNode.getCurChallengeTimes()) {
            case 0: {
                enemyList = levelNode.get1stMons();
            }
                break;
            case 1: {
                enemyList = levelNode.get2ndMons();
            }
                break;
            default: {
                enemyList = levelNode.get3rdMons();
            }
                break;
        }

        this.peerTeam = new BattleTeam(enemyList);
    },
            
    release: function() {
        this.myTeam.clear();
        this.peerTeam.clear();
    },

    // expand strategy panel to player
    prepareRound: function() {
        var fightUI = gMainScene.getCurCCBController();
        if (!(fightUI instanceof Window_FightLayer)) return;

        fightUI.openStrategyPanel();
    },

    roundBegin: function() {
        cc.log('round begin');
    }
});