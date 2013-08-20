var gMainScene;
var gPlayer;
var gWorldMap;
var CCBMainScene = cc.Scene.extend({
    ctor:function () {
        this._super();

//        cc.UserDefault.getInstance();
//        cc.UserDefault.purgeInstanceUserDefault();
        cc.BuilderReader.setResolutionScale(1);

        this.pushCCBLayer(UI.MAIN_LAYER_ID);
        this.setPosition(cc.p(0, 0));
        gMainScene = this;
        
        // test
        gPlayer = new Player();
//        gPlayer.gainCard(conf.TANGSANZANG);
//        gPlayer.gainCard(conf.SUNWUKONG);
//
//        gPlayer.gainProp(conf.PROP_XIANTAO, 100);
//        gPlayer.gainProp(conf.PROP_PANTAO);
//        gPlayer.flush();
    }
});
