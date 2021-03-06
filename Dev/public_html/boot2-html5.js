var gMainScene;
var gPlayer;
var gMap;
var gBattleField;

var CCBMainScene = cc.Scene.extend({
    ctor:function () {
        this._super();

        gMainScene = this;
        cc.BuilderReader.setResolutionScale(1);
        cc.UserDefault.getInstance().purgeInstanceUserDefault();

        var nodeContrler = this.pushCCBLayer(UI.WINDOW_MAIN_LAYER_ID);
        this.setPosition(cc.p(0, 0));
        
        gMap = new AreaMap();
        
        gPlayer = new Player();
        gPlayer.gainCard('C_TangSangzang');
        gPlayer.gainCard('C_SunWukong');

        gPlayer.gainProp('P_Xiantao', 100);
        gPlayer.gainProp('P_Huanhundan', 100);

        gBattleField = new BattleField();
    }
});
