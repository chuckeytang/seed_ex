var Player = cc.Class.extend({
    cardPackage: new Array(),   //[<CardID, CardObject, CardNum>, <CardID, CardObject, CardNum>]
    propPackage: new Array(),   //0-name, 1-prop, 2-piled number
    curZone: 0,
    curLevel: 0,
    
    ctor: function(){
        this.loadFromDB();
    }
    ,    
    flush: function() {
        var db = cc.UserDefault.getInstance();
        var cardTypes = "";
        for(var i=0; i<this.cardPackage.length; i++) {
            if (!(this.cardPackage[i][1] instanceof cd.PlayerCard)) {
                cc.log("invalid player card");
                continue;
            }
            this.cardPackage[i][1].flush();
            cardTypes += (this.cardPackage[i][1].type + '_' + this.cardPackage[i][2] + '|');
        }
        cardTypes = cardTypes.slice(0, cardTypes.length-1);

        var propNames = "";
        for(var i=0; i<this.propPackage.length; i++) {
            propNames += (this.propPackage[i][0] + '|');
            this.propPackage[i][1].flush();
            db.setStringForKey('player_'+this.propPackage[i][0], this.propPackage[i][2]);
        }
        propNames = propNames.slice(0, propNames.length-1);

        db.setStringForKey('player_cards', cardTypes);
        db.setStringForKey('player_props', propNames);
        db.setStringForKey('player_zone', this.curZone);
        db.setStringForKey('player_level', this.curLevel);
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
                this.cardPackage.push([loadcard.cardID, loadcard, cardDatas[1]]);
            }
        }
        
        str = db.getStringForKey('player_props');
        if(str !== "") {
            var propNames = str.split('|');
            for(var i=0; i<propNames.length; i++) {
                var num = db.getStringForKey('player_'+propNames[i]);
                this.propPackage.push([propNames[i], MakeObject('Pp.'+propNames[i]), num]);
            }
        }
        
        this.curZone = db.getStringForKey('player_zone');
        this.curLevel = db.getStringForKey('player_level');
    }
    ,
    // logic function
    gainCard: function(cardID) {
        var cardInfo = this.cardPackage[cardID];
        if(NotNull(cardInfo)) {
            cardInfo[2]++;
            return;
        }
        var newCard = new cd.PlayerCard(cardID);
        this.cardPackage.push([newCard.cardID, newCard, 1]);
        
        //ui behavior
        if (gMainScene.getCurCCBLayer() instanceof Window_FightLayer) {
            var fightWindow = gMainScene.getCurCCBLayer();
            fightWindow.pumpGainedCard();
        }
    }
    ,
    gainProp: function(propName, num) {
        if(NotNull(this.propPackage[propName])) {
            
        }
        else {
            var prop = new Pp[propName];
            if(typeof(num) !== 'number' || num <= 0)
                num = 1;
            this.propPackage.push([propName, prop, num]);
        }
    }
});