var gMainScene;
var gPlayer;
var gMap;

var CCBMainScene = cc.Scene.extend({
    ctor:function () {
        this._super();

        cc.BuilderReader.setResolutionScale(1);
        //cc.UserDefault.getInstance().purgeInstanceUserDefault();

        var nodeContrler = this.pushCCBLayer(UI.WINDOW_MAIN_LAYER_ID);
        this.setPosition(cc.p(0, 0));
        
        gMainScene = this;
        gMap = new AreaMap();
        
        gPlayer = new Player();
        gPlayer.gainCard('C_TangSangzang');
        gPlayer.gainCard('C_SunWukong');
    }
});
