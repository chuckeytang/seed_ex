/**
 * Created with JetBrains WebStorm.
 * User: chemaoxian
 * Date: 13-7-24
 * Time: 下午1:40
 * To change this template use File | Settings | File Templates.
 */

var UICloneTool = cc.Class.extend({
    ctor : function () {
       // this._super();
        this.init();
    },

    init: function() {
       // this._super();
    },

    CloneSprite : function (sprite) {
        "use strict";
        if (!sprite) {
            cc.log("CloneSprite occur an null src sprite");
            return null;
        }

         var des_sprite = cc.Sprite.createWithTexture(sprite.getTexture());
         des_sprite.setPosition(sprite.getPosition());
         des_sprite.setAnchorPoint(sprite.getAnchorPoint());
         des_sprite.setContentSize(sprite.getContentSize());
         des_sprite.setScale(sprite.getScale());
         des_sprite.setTag(sprite.getTag());
         des_sprite.setOpacity(sprite.getOpacity());
         des_sprite.setTag(sprite.getTag());
      //  if(des_sprite.getTag() < 0)
      //       cc.log("error tag in CloneSprite");

        return des_sprite;
    },

    CloneLableTTF : function(label) {
        "use strict";
        var des_label_ttf = cc.LabelTTF.create();
        des_label_ttf.setPosition(label.getPosition());
        des_label_ttf.setAnchorPoint(label.getAnchorPoint());
        des_label_ttf.setContentSize(label.getContentSize());
        des_label_ttf.setFontSize(label.getFontSize());
        des_label_ttf.setFontName(label.getFontName());
        des_label_ttf.setColor(label.getColor());
        des_label_ttf.setOpacity(label.getOpacity());
        des_label_ttf.setHorizontalAlignment(label.getHorizontalAlignment());
        des_label_ttf.setVerticalAlignment(label.getVerticalAlignment());
        des_label_ttf.setDimensions(label.getDimensions());
        des_label_ttf.setString(label.getString());
        des_label_ttf.setTag(label.getTag());

        return des_label_ttf;
    },

     CloneLabelBMFont : function(src) {
        "use strict";
        var des = cc.LabelBMFont.create();
        des.setPosition(src.getPosition());
        des.setAnchorPoint(src.getAnchorPoint());
        des.setScale(src.getScale());
        des.setContentSize(src.getContentSize());
        des.setFntFile(src.getFntFile());
        des.setOpacity(src.getOpacity());
        des.setColor(src.getColor);
        des.setString(src.getString());
        des.setTag(src.getTag());

        return des;
    },

     CloneMenu : function(src) {
        "use strict";
        var desChilds = [];
        var childs = src.getChildren();
        for(var i=0; i<childs.length; ++i) {
           var menuItem = this.CloneMenuItemImage(childs[i]);
            desChilds.push(menuItem);
        }
        var des = new cc.Menu;
        des.initWithArray(desChilds);
        des.setPosition(src.getPosition());
        des.setAnchorPoint(src.getAnchorPoint());
        des.setScale(src.getScale());
        des.setContentSize(src.getContentSize());
        des.setTag(src.getTag());

        return des;
    },

      CloneNode : function(src) {
        "use strict";
        var des = cc.Node.create();
        des.setPosition(src.getPosition());
        des.setAnchorPoint(src.getAnchorPoint());
        des.setScale(src.getScale());
        des.setContentSize(src.getContentSize());
        des.setTag(src.getTag());

        return des;
    },

    getSpriteFrameFromSprite : function(sprite) {
        "use strict";
        return cc.SpriteFrame.createWithTexture(sprite.getTexture(), sprite.getTextureRect());
    } ,

    CloneMenuItemImage : function(src, owner, callback) {
        "use strict";
        var src_normal_sprite = src.getNormalImage();
        var src_select_sprite = src.getSelectedImage();
        var src_disable_sprite = src.getDisabledImage();

        if (!src_normal_sprite) {
             throw "MenuItemImage normal img not exist";
        }

       if (!src_select_sprite) {
             throw "MenuItemImage select img not exist";
        }

        if (!src_disable_sprite) {
             throw "CloneMenuItemImage Error : MenuItemImage disable img not exist";
        }

        var des = cc.MenuItemSprite.create(this.CloneSprite(src_normal_sprite),
                                            this.CloneSprite(src_select_sprite),
                                            this.CloneSprite(src_disable_sprite));

        des.setPosition(src.getPosition());
        des.setAnchorPoint(src.getAnchorPoint());
        des.setTag(src.getTag());
        des.setEnabled(true);
        des.setZOrder(src.getZOrder());
        des.setTarget(src.getSelector(), src.getListener());
        return des;
    },

    callBack : function() {
        "use strict";
        cc.log("menu effect");
    },

    CloneNodeGraph : function(node) {
        "use strict";
        var des_node = null;
        if(node instanceof cc.Sprite) {
            des_node = this.CloneSprite(node);
        }
        else if(node instanceof cc.MenuItemImage) {
            des_node = this.CloneMenuItemImage(node);
        }
        else if(node instanceof cc.LabelBMFont) {
            des_node = this.CloneLabelBMFont(node);
        }
        else if(node instanceof cc.LabelTTF) {
            des_node = this.CloneLableTTF(node);
        }
        else if(node instanceof cc.Menu) {
            des_node = this.CloneMenu(node);
        }
        else if(node instanceof cc.Node) {
            des_node = this.CloneNode(node);
        }
        else {
            cc.log("this type can not clone");
        }

        if (des_node && node.getChildrenCount())
        {
              var childrens = node.getChildren();
              for(var i=0; i<childrens.length; ++i) {
                  var child_node =  this.CloneNodeGraph(childrens[i]);
                  if(child_node)   {
                      des_node.addChild(child_node);
                  }
              }
        }

        return des_node;
    },

    ChangeChildSpriteTexture : function(node, childTag,filename) {
         var sprite = node.getChildByTag(childTag);
         if(!sprite) {
             cc.log("tag = " + childTag + "not exist");
             return false;
         }

        var texture = cc.TextureCache.getInstance().addImage(filename);
        if (!texture || !sprite.setTexture) {
            cc.log("filename = " + filename + " texture set failed");
            return false;
        }

        sprite.setTexture(texture);
        return true;

    },

    ChangeChildLabelText : function(node,childTag,txt) {
         var label = node.getChildByTag(childTag);
         if(!label || !label.setString) {
             cc.log("set label faild  tag = " + childTag);
             return false;
         }

        label.setString(txt);
        return true;
    }
});

var globalUITool = new UICloneTool;

var DumpNoFunction = function(obj) {
    for (var p  in obj) {
        if (typeof obj=='function')
            continue;
        else
            cc.log(p.toString());
    }
}