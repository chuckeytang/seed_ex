var Player = cc.Class.extend({
    _cardPackage: new Array(),   //[<CardID, CardObject, CardNum>, <CardID, CardObject, CardNum>]
    _propPackage: new Array(),   //[<name>, <prop>, <piled number>]
    _fabaoPackage: new Array(),  //4 categories, each includes [<name>, <prop>, <piled number>]
    _fragPackage: new Array(),   //[<name>, <prop>, <piled number>]
    _curZone: 0,
    _curLevel: 0,

    playingZone: 0,
    playingLevel: 0,
    
    ctor: function(){
        this.loadFromDB();
    }
    ,    
    flush: function() {
        var db = cc.UserDefault.getInstance();
        var cardTypes = "";
        for(var i=0; i<this._cardPackage.length; i++) {
            if (!(this._cardPackage[i][1] instanceof cd.PlayerCard)) {
                cc.log("invalid player card");
                continue;
            }
            this._cardPackage[i][1].flush();
            cardTypes += (this._cardPackage[i][1].type + '_' + this._cardPackage[i][2] + '|');
        }
        cardTypes = cardTypes.slice(0, cardTypes.length-1);

        var propNames = "";
        for(var i=0; i<this._propPackage.length; i++) {
            propNames += (this._propPackage[i][0] + '|');
            this._propPackage[i][1].flush();
            db.setStringForKey('player_'+this._propPackage[i][0], this._propPackage[i][2]);
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

    equipProp: function(propID) {
        if(IsNull(this._propPackage[propID])){
            return "prop not exist";
        }
        this._propPackage[propID][Player.PROP_NUM_INDEX]--;
        if(this._propPackage[propID][Player.PROP_NUM_INDEX] === 0) {
            delete this._propPackage[propID];
        }
        return new pp[propID.substring(2)](propID);
    },

    getCardPackage: function() {
        return this._cardPackage;
    },

    getPropPackage: function() {
        return this._propPackage;
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