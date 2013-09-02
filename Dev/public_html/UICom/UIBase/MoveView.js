var MoveView = cc.CCBLayer.extend({
    _isMoving: false,
    _curMoveStep: 0,
    _moveType: null,
    _moveSize: null,
    _movableObj: null,
    moveForwardSteps: 1,
    moveBackSteps: 1,
    ctor: function(){
        this._moveType = MoveView.HORIZONTAL;
        this._moveSize = new cc.Size(100,100);
    },

    init: function(_moveType, size, moveObj) {
        this.setMoveType(_moveType);
        this.setMoveSize(size);
        this._movableObj = moveObj;
    },

    setMoveType:function(type) {
        if(type !== MoveView.VERTICAL
        || type !== MoveView.HORIZONTAL ) {
            cc.log("wrong move type");
            return false;
        }

        this._moveType = type;
    },

    setCurMoveStep: function(curStep) {
        this._curMoveStep = curStep;
        if(this._moveType === MoveView.HORIZONTAL) {
            this._movableObj.setPosition(cc.p(this._curMoveStep*this._moveSize.width, 0));
        }
    },

    setMoveSize: function(size) {
        this._moveSize = size;
    },

    onTouchesBegan:function (touches, event) {
        return true;
    },

    onTouchesMoved:function (touches, event) {
        if(this._isMoving)
            return;

        var delta = cc.pSub(touches[0].getLocation(),touches[0].getPreviousLocation());
        if(this._moveType === MoveView.HORIZONTAL) {
            var xAxisLen = cc.pDot(delta, cc.p(1,0));
            var moveAction;
            if(xAxisLen>5 && this._curMoveStep < this.moveForwardSteps) {
                // right
                this._isMoving = true;
                this._curMoveStep++;
                moveAction = cc.Sequence.create(cc.EaseIn.create(cc.MoveBy.create(0.3, cc.p(this._moveSize.width, 0)), 0.5), cc.CallFunc.create(this._moveEnd, this));
            }
            else if(xAxisLen<-5 && this._curMoveStep > -this.moveBackSteps)   {
                // left
                this._isMoving = true;
                this._curMoveStep--;
                moveAction = cc.Sequence.create(cc.EaseIn.create(cc.MoveBy.create(0.3, cc.p(-this._moveSize.width, 0)), 0.5), cc.CallFunc.create(this._moveEnd, this));
            }
        }

        if(this._isMoving)
            this._movableObj.runAction(moveAction);
    },

    onTouchesEnded:function (touches, event) {
    },

    _moveEnd: function(){
        this._isMoving = false;
    },

    onLoadCCB: function() {
        "use strict";
        this.setTouchEnabled(true);
    }
});

MoveView.VERTICAL = 'V';
MoveView.HORIZONTAL = 'H';
