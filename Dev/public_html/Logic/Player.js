var Player = cc.Class.extend({
    cardPackage: new Array(),
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
            if (!(this.cardPackage[i] instanceof cd.PlayerCard)) {
                cc.log("invalid player card");
                continue;
            }
            this.cardPackage[i].flush();
            cardTypes += (this.cardPackage[i].type + '|');
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
                var loadcard = new cd.PlayerCard(cardTypes[i]);
                loadcard.loadFromDB();
                this.cardPackage.push(loadcard);
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
    gainCard: function(cardType) {
        if(NotNull(this.cardPackage[cardType])) {
            cc.log("card has already poccessed");
            return;
        }
        this.cardPackage.push(new cd.PlayerCard(cardType));
        
        //ui behavior
        if (gMainScene.getCurCCBLayer() instanceof Window.Window_FightLayer) {
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