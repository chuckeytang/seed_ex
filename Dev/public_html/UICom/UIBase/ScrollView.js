/**
 * Created with JetBrains WebStorm.
 * User: chemaoxian
 * Date: 13-7-31
 * Time: 下午5:36
 * To change this template use File | Settings | File Templates.
 */

var ScrollViewContainer = cc.LayerColor.extend({
    scrollItems:null,
    scrollView:null,
    div_size : null,
    menuCallBack : null,
    scollController: null,

    TOUCH_TYPE_BEGIN : 0 ,
    TOUCH_TYPE_MOVE : 1,
    TOUCH_TYPE_END: 2,
    TOUCH_TYPE_CANCLE : 3,

    ctor:function() {
        "use strict";
        this._super();
        cc.associateWithNative(this, cc.LayerColor);
        this.init();

        this.scrollItems = [];
        this.div_size = cc.size(0,0);
    },
            
    InitWithScrollView : function(scrollView, div_size, color4b) {
        "use strict";
        var container = scrollView.getContainer();
        scrollView.setContainer(this);
        this.setAnchorPoint(container.getAnchorPoint());
        this.setPosition(container.getPosition());
        this.setContentSize(scrollView.getViewSize());
        this.scollController = container.controller;

        this.div_size = div_size || cc.size(0,0);

        this.scrollView = scrollView;

        if(color4b) {
            this.setColor(cc.c3b(color4b.r, color4b.g, color4b.b));
            this.setOpacity(color4b.a);
        }
    },
            
    FillWithData: function(data) {

    },

    GetController: function() {
        return this.scollController;
    },
            
    SetMenuCallback : function (callback) {
        "use strict";
        this.menuCallBack = callback;
    },

    ClearAllItem:function() {
        "use strict";
        this.removeAllChildren();
        this.scrollItems.length = 0;
    },

    AddItem : function(item) {
        "use strict";
         if (this.IsContain(item)) {
             cc.log("error : item -> " + item + " is exist");
             return ;
         }

        this.scrollItems.push(item);
        this.addItemToMe(item);
        this.reLayout();
    },

    InsertItemAt : function (item, index) {
        "use strict";
         if(index < 0 || index > this.scrollItems.length)
            throw "the array out of bound";

         if (this.IsContain(item)) {
             cc.log("error : item -> " + item + " is exist");
             return ;
         }

         this.scrollItems.splice(index, 0, item);
         this.addItemToMe(item);
         this.reLayout();
    },

    RemoveItem : function(item) {
        "use strict";
        var index = this.GetItemIndex(item);
        if(index < 0)
            return ;

        this.scrollItems.splice(index,1);
        this.removeItemFromMe(item);
        this.reLayout();
    },

    IsContain : function(item) {
        "use strict";
        for (var i=0; i<this.scrollItems.length; ++i){
            if(item == this.scrollItems[i])
                return true;
        }

        return false;
    },

    RemoveItemAt : function(index) {
        "use strict";

        if(index < 0 || index >= this.scrollItems.length)
            throw "the array out of bound";

        var item = this.GetIndexOf(index);
        this.scrollItems.splice(index, 1);
        this.removeItemFromMe(item);
        this.reLayout();
    },

    GetItemIndex:function(item) {
        "use strict";
         for (var i=0; i<this.scrollItems.length; ++i){
            if(item ==this.scrollItems[i])
            {
                return i;
            }
         }

        return -1;
    },

    GetIndexOf : function(index) {
        "use strict";

         if(index < 0 || index >= this.scrollItems.length)
            throw "the array out of bound";

        return this.scrollItems[index];

    },

    reLayout : function() {
        "use strict";
        return;

         if(this.scrollItems.length <= 0)
                return ;

         var item  =   this.scrollItems[0];
         var itemSize = item.getContentSize();
         var viewSize = this.scrollView.getViewSize();

        var direction = this.scrollView.getDirection();
        if (direction == 1)  {  // 纵向

            var step_y = itemSize.height + this.div_size.height;
            var require_h = step_y * (this.scrollItems.length);
            require_h = require_h > viewSize.height ? require_h :  viewSize.height;
            var pt = cc.p((viewSize.width - itemSize.width) * 0.5, require_h - itemSize.height);
            for(var i=0; i<this.scrollItems.length; ++i) {
                var item = this.scrollItems[i];
                item.setPosition(pt);
                pt.y -= step_y;
            }

            viewSize.height = require_h;
            this.scrollView.setContentSize(viewSize);
        }
        else if( direction == 0) {

            var step_x = itemSize.width + this.div_size.width;
            var require_w = step_x * (this.scrollItems.length);
            //var pt = cc.p(0,(viewSize.height - itemSize.height) * 0.5);
            var pt = cc.p(0, 0);
            for(var i=0; i<this.scrollItems.length; ++i) {
                var item = this.scrollItems[i];
                item.setPosition(pt);
                pt.x += step_x;
            }

            viewSize.width = require_w;
            this.scrollView.setContentSize(viewSize);
        }
    },

    addItemToMe : function(item) {
        "use strict";
        this.scrollView.addChild(item);
    },

    removeItemFromMe : function(item) {
        "use strict";
        item.removeFromParent();
    },

    destroy : function() {
        "use strict";
        this.ClearAllItem();
        this.scrollView.removeFromParent();
        this.menuCallBack = null;
    },

    onEnter : function() {
        "use strict";
         this._super();
         cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, UI.SCROLL_VIEW_PRIORITY, true);
    },

    onExit : function() {
        "use strict";
        this._super();
        cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
    },

    SetContentOffsetTo : function (offsetPt, animated) {
        "use strict";
        this.scrollView.setContentOffset(offsetPt, animated);

    },

    SetContentOffsetInDurationTo : function (offsetPt, duration) {
        "use strict";
        this.scrollView.setContentOffsetInDuration(offsetPt, duration);
    },

     SetContentOffsetBy : function (offsetPt, animated) {
        "use strict";

        var curOffset = this.scrollView.getContentOffset();
        offsetPt  = this.filterWrongDirection(offsetPt);
        offsetPt.x += curOffset.x;
        offsetPt.y += curOffset.y;
        offsetPt = this.roundToFitOffset(offsetPt);
        this.scrollView.setContentOffset(offsetPt, animated);


    },

    SetContentOffsetInDurationBy : function (offsetPt, duration) {
        "use strict";
         var curOffset = this.scrollView.getContentOffset();
        offsetPt  = this.filterWrongDirection(offsetPt);
        offsetPt.x += curOffset.x;
        offsetPt.y += curOffset.y;

        offsetPt = this.roundToFitOffset(offsetPt);
        this.scrollView.setContentOffset(offsetPt, duration);
    },

    filterWrongDirection:function(pt) {
        "use strict";
        var direction = this.scrollView.getDirection();
        if (direction == 1)  {
            pt.x = 0;
        }
        else if(direction == 0){
            pt.y = 0
        }

        return pt;
    },

    roundToFitOffset : function(pt) {
        "use strict";
        var minOffset = this.GetMinContentOffset();
        var maxOffset = this.GetMaxContentOffset();

        pt.x = pt.x > minOffset.x ?  pt.x : minOffset.x;
        pt.y = pt.y > minOffset.y ?  pt.y : minOffset.y;
        pt.x = pt.x < maxOffset.x ?  pt.x : maxOffset.x;
        pt.y = pt.x < maxOffset.y ?  pt.y : maxOffset.y;

        return pt;
    } ,
    GetMaxContentOffset : function (){
        "use strict";
        return this.scrollView.maxContainerOffset();
    },

    GetMinContentOffset : function() {
        "use strict";
        return this.scrollView.minContainerOffset();
    },

     onTouchBegan:function (touch, event) {

      var size = this.scrollView.getViewSize();
      var pt = this.scrollView.convertTouchToNodeSpace(touch);
      if (pt.x <= 0 || pt.y <=0 || pt.x > size.width || pt.y > size.height) {
            return false;
      }

      this.scrollView.onTouchBegan(touch, cc.Node.create());
      this.dispatchToAll(this.TOUCH_TYPE_BEGIN, touch, cc.Node.create());

      return true;
    },

    onTouchMoved:function (touch, event) {
        "use strict";
        this.scrollView.onTouchMoved(touch,  cc.Node.create());
        this.dispatchToAll(this.TOUCH_TYPE_MOVE, touch, cc.Node.create());
    },


    onTouchEnded:function (touch, event) {
        "use strict";
        if(!this.scrollView.isTouchMoved())
        {
            this.dispatchToAll(this.TOUCH_TYPE_END, touch, cc.Node.create());
        }else{
            this.dispatchToAll(this.TOUCH_TYPE_CANCLE, touch, cc.Node.create());
        }

         this.scrollView.onTouchEnded(touch,  cc.Node.create());
    },

    onTouchCancelled:function (touch, event) {
        "use strict";
        this.scrollView.onTouchCancelled(touch, cc.Node.create());
        this.dispatchToAll(this.TOUCH_TYPE_CANCLE, touch, cc.Node.create());
    },

    dispatchToAll : function(touch_type, touch, event) {
         "use strict";

         for(var i=0; i<this.scrollItems.length; ++i) {
             if (this.dispatchTouchEventToItem(touch_type, this.scrollItems[i], touch, event))
                 break;
         }
    },

    dispatchTouchEventToItem : function(touch_type, item, touch, event) {
        if(touch_type === this.TOUCH_TYPE_BEGIN && !item.isVisible())
            return false;
        
        // handle self
        if(this.handleTouchEvent(touch_type, item, touch, event))
            return true;
        
        // handle children
        var childs = item.getChildren();
        for(var i=0; i<childs.length; ++i)  {
            this.dispatchTouchEventToItem(touch_type, childs[i], touch, event);             
          }
    },

    handleTouchEvent : function (touch_type, item, touch, event) {
        "use strict";
        if(!(item instanceof cc.MenuItem)) {
            return false;
        }
        
        if (touch_type === this.TOUCH_TYPE_BEGIN) { //begin touch
            var pt = item.convertTouchToNodeSpace(touch);
            var rc = cc.rect(0,0,item.getContentSize().width, item.getContentSize().height);
            if (cc.rectContainsPoint(rc, pt)) {
                 item.selected();
                 return true;
            }

            return false;
        }

        if (!item.isSelected())
            return false;

        if (touch_type === this.TOUCH_TYPE_MOVE) { // move
            var pt = item.convertTouchToNodeSpace(touch);
            var rc = cc.rect(0,0,item.getContentSize().width, item.getContentSize().height);
            if (cc.rectContainsPoint(rc, pt)) {
                item.selected();
            }
            else {
                item.unselected();
            }
        }
        else if(touch_type === this.TOUCH_TYPE_CANCLE){ // cancle
             item.unselected();
        }
        else {
             item.unselected();
             item.activate();
        }

        return true;
    }
});


ScrollViewContainer.extend = cc.LayerColor.extend;



