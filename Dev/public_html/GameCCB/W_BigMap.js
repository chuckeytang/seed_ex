var Window_BigMap = MoveView.extend({
    _curZone: null,
    ctor:function() {
        "use strict";
        this._super();
    },

    onLoadCCB: function() {
        "use strict";
        this.setUpdateEnabled(true);

        // init zone info
        for(var i=1; NotNull(this['zone'+i]); i++) {
            if(i <= gPlayer.getCurZone()) {
                // player has already come to this zone
                this['zone'+i].setEnabled(true);
            }
            else {
                // Unknown area for player
                this['zone'+i].setEnabled(false);
            }
        }

        // init map moving property
        MoveView.prototype.onLoadCCB.call(this);
        var screenSize = cc.EGLView.getInstance().getFrameSize();
        this.init(MoveView.HORIZONTAL, screenSize, this.map);
        this.moveForwardSteps = 1;
        this.moveBackSteps = 1;
        if(NotNull(this['zone'+gPlayer.getCurZone()])) {
            this._curZone = this['zone'+gPlayer.getCurZone()];

            if(this._curZone.getPosition().x > screenSize.width) {
                this.setCurMoveStep(-1);
            }
            else if(this._curZone.getPosition().y < 0) {
                this.setCurMoveStep(1);
            }
        }

    },

    onZoneClick: function(btn) {
        for(var i=1; NotNull(this['zone'+i]); i++) {
            if(btn === this['zone'+i]) {
                gPlayer.playingZone = i;
                this._switchMenuID = UI.WINDOW_SMALL_MAP;
                break;
            }
        }
    }

});

