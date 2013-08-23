var gMainScene;
var gPlayer;
var gMap;

var CCBMainScene = cc.Scene.extend({
    ctor:function () {
        this._super();

        cc.BuilderReader.setResolutionScale(1);

        var nodeContrler = this.pushCCBLayer(UI.MAIN_LAYER_ID);
        this.setPosition(cc.p(0, 0));
        
        gMainScene = this;
        
        gPlayer = new Player();
    }
});
