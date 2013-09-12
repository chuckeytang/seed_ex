var Player = cc.Class.extend({
    _cardPackage: null,   //[<CardID, CardObject, CardNum>, <CardID, CardObject, CardNum>]
    _propPackage: null,   //[<name>, <prop>, <piled number>]
    _fabaoPackage: null,  //4 categories, each includes [<name>, <prop>, <piled number>]
    _fragPackage: null,   //[<name>, <prop>, <piled number>]

    _battleFieldCards: null,
    _curZone: 0,
    _curLevel: 0,

    playingZone: 0,
    playingLevel: 0,
    
    ctor: function(){
        this.loadFromDB();
        this._cardPackage = new Array();
        this._propPackage = new Array();
        this._fabaoPackage = new Array();
        this._fragPackage = new Array();
        this._battleFieldCards = new Array();
    }
    ,    
    flush: function() {
        var db = cc.UserDefault.getInstance();
        var cardTypes = "";
        for(var id in this._cardPackage) {
            if(id.search('C_') === -1) continue;

            if (!(this._cardPackage[id][Player.CARD_OBJ_INDEX] instanceof cd.PlayerCard)) {
                cc.log("invalid player card");
                continue;
            }
            this._cardPackage[id][Player.CARD_OBJ_INDEX].flush();
            cardTypes += (this._cardPackage[id][Player.CARD_OBJ_INDEX].type + '_' + this._cardPackage[id][Player.CARD_NUM_INDEX] + '|');
        }
        cardTypes = cardTypes.slice(0, cardTypes.length-1);

        var propNames = "";
        for(var id in this._propPackage) {
            if(id.search('P_') === -1) continue;
            
            propNames += (id + '|');
            this._propPackage[id][Player.PROP_OBJ_INDEX].flush();
            db.setStringForKey('player_'+id, this._propPackage[id][Player.PROP_NUM_INDEX]);
        }
        propNames = propNames.slice(0, propNames.length-1);

        db.setStringForKey('player_cards', cardTypes);
        db.setStringForKey('player_props', propNames);
        db.setStringForKey('player_zone', this._curZone);
        db.setStringForKey('player_level', this._curLevel);
    }
    ,
    loadFromDB: function() {
        var str;
        var db = cc.UserDefault.getInstance();
        str = db.getStringForKey('player_cards');
        if(str !== "") {
            var cardTypes = str.split('|');
            for(var i=0; i<cardTypes.length; i++) {
                var cardDatas = cardTypes[i].split('_');    //[<CardID>, <CardNum>]
                var loadcard = new cd.PlayerCard(cardDatas[0]);
                loadcard.loadFromDB();
                this._cardPackage[loadcard.cardID] = [loadcard, cardDatas[1]];
            }
        }
        
        str = db.getStringForKey('player_props');
        if(str !== "") {
            var propNames = str.split('|');
            for(var i=0; i<propNames.length; i++) {
                var num = db.getStringForKey('player_'+propNames[i]);
                this._propPackage[propNames[i]] = [new pp[propNames[i]], num];
            }
        }
        
        this._curZone = this.toValue(db.getStringForKey('player_zone'));
        if(this._curZone === 0) this._curZone = 2;      // test
        this._curLevel = this.toValue(db.getStringForKey('player_level'));
    }
    ,
    getCurZone: function() {
        return this._curZone;
    }
    ,
    getCurLevel: function() {
        return this._curLevel;
    }
    ,
    // logic function
    gainCard: function(cardID) {
        var cardInfo = this._cardPackage[cardID];
        if(NotNull(cardInfo)) {
            cardInfo[Player.CARD_NUM_INDEX]++;
            return;
        }
        var newCard = new cd.PlayerCard(cardID);
        this._cardPackage[newCard.getCardID()] = [newCard, 1];
        
        //ui behavior
        if (gMainScene.getCurCCBController() instanceof Window_FightLayer) {
            var fightWindow = gMainScene.getCurCCBController();
            fightWindow.pumpGainedCard();
        }
    }
    ,
    gainProp: function(propID, num) {
        if(NotNull(this._propPackage[propID])) {
            this._propPackage[propID][2] += num;
        }
        else {
            var prop = new pp[propID.substring(2)](propID);
            if(typeof(num) !== 'number' || num <= 0)
                num = 1;
            this._propPackage[propID] = [prop, num];
        }
    },

    getCardPackage: function() {
        return this._cardPackage;
    },

    getPropPackage: function() {
        return this._propPackage;
    },

    getBattleCards: function() {
        return this._battleFieldCards;
    },

    enterBattleField: function(cardIDs) {
        for(var i=0; i<cardIDs.length; i++) {
             this._equipCard(cardIDs[i]);
        }
        gBattleField.init();
        this.flush();
    },

    leaveBattleField: function() {
        for(var i=0; i<this._battleFieldCards.length; i++) {
            var backCard = this._battleFieldCards[i];
            backCard.onBattle = false;
            delete backCard['prop'];
        }
        gBattleField.release();
    },

    _equipCard: function(cardID) {
        var onBoardCard = this._cardPackage[cardID][Player.CARD_OBJ_INDEX];
        onBoardCard.onBattle = true;
        this._battleFieldCards.push(onBoardCard);
        this._equipPropTo(onBoardCard, cardID.propID);
    },

    _equipPropTo: function(card, propID) {
        if(IsNull(this._propPackage[propID])){
            return "prop not exist";
        }
        this._propPackage[propID][Player.PROP_NUM_INDEX]--;
        if(this._propPackage[propID][Player.PROP_NUM_INDEX] === 0) {
            delete this._propPackage[propID];
        }
        if(NotNull(card.prop)) {
            cc.Assert(false, "card prop has already equipped");
        }
        card.prop = new pp[propID.substring(2)](propID);
    }
});

Player.CARD_OBJ_INDEX = 0;
Player.CARD_NUM_INDEX = 1;

Player.PROP_OBJ_INDEX = 0;
Player.PROP_NUM_INDEX = 1;

Player.FABAO_FOQI = 0;
Player.FABAO_XIANQI = 1;
Player.FABAO_SHAQI = 2;
Player.FABAO_MOQI = 3;