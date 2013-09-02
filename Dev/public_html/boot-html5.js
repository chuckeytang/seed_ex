(function () {
    var d = document;
    var c = {
        COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        box2d:false,
        chipmunk:true,
        showFPS:true,
        loadExtension:true,
        frameRate:60,
        tag:'gameCanvas', //the dom element to run cocos2d on
        engineDir:'Engine/cocos2d/',
        //SingleEngineFile:'cocos2d-html5.min.js',
        appFiles:[
           'Engine/Lib/ucsv-1.1.0.js',
           'UICom/UIBase/js_plus.js',
           'UICom/UIBase/jsb_plus.js',
           
           'Logic/Param.js',
           'Logic/Fabao.js',
           'Logic/Card.js',
           'Logic/Prop.js',
           'Logic/Map.js',
           'Logic/Monster.js',
            'Logic/Player.js',
           'UICom/UIBase/MoveView.js',
            'UICom/UIBase/ScrollView.js',
            'UICom/UIBase/UIDefine.js',
           'UICom/UIBase/Utils.js',
           'UICom/Widgets.js',
           'Dialog/Dialog.js',

           'GameCCB/W_BigMap.js',
            'GameCCB/W_CardDetail.js',
            'GameCCB/W_CardManager.js',
            'GameCCB/W_EnterBattleLayer.js',
            'GameCCB/W_FightLayer.js',
            'GameCCB/W_FragCombine.js',
            'GameCCB/W_MainLayer.js',
           'GameCCB/W_SmallMap.js',
           
           'resources-html5.js',
           'boot2-html5.js'
           
            ]

};
    window.addEventListener('DOMContentLoaded', function () {
        //first load engine file if specified
        var s = d.createElement('script');
        /*********Delete this section if you have packed all files into one*******/
        if (c.SingleEngineFile && !c.engineDir) {
            s.src = c.SingleEngineFile;
        }
        else if (c.engineDir && !c.SingleEngineFile) {
            s.src = c.engineDir + 'platform/jsloader.js';
        }
        else {
            alert('You must specify either the single engine file OR the engine directory in "cocos2d.js"');
        }
        /*********Delete this section if you have packed all files into one*******/

            //s.src = 'Packed_Release_File.js'; //IMPORTANT: Un-comment this line if you have packed all files into one

        d.body.appendChild(s);
        document.ccConfig = c;
        s.id = 'cocos2d-html5';
        //else if single file specified, load singlefile
    });
})();
