var pp = pp || {};

pp.Prop = cc.Class.extend({
    _id: null,
    ctor: function(ID){
        this._id = ID;
    }
    ,    
    flush: function() {

    }
    ,
    loadFromDB: function() {

    },

    getPropID: function() {
        return this._id;
    }
    ,
    use: function(card){

    }
});

pp.Xiantao = pp.Prop.extend({
    ctor: function(ID){
        this._super(ID);
    }
    ,
    use: function(card){

    }
}); 

pp.Pantao = pp.Prop.extend({
    ctor: function(ID){
        this._super(ID);
    }
    ,
    use: function(card){

    }
}); 

pp.Huanhundan = pp.Prop.extend({
    ctor: function(ID){
        this._super(ID);
    }
    ,
    use: function(card){

    }
});


pp.FabaoFrag = pp.Prop.extend({
    ctor: function(ID){
        this._super(ID);
    }
    ,
    use: function(card){

    }
});
