/**
 * Created with JetBrains WebStorm.
 * User: gww
 * Date: 13-7-20
 * Time: 下午12:11
 * To change this template use File | Settings | File Templates.
 */

var NotNull = function (value) {
    "use strict";
    if (value === null || value === undefined || value === NaN)
        return false;
    return true;
};

var IsNull = function (value) {
    "use strict";
    return !NotNull(value);
};

var MakeObject = function(cls, args) {  
    function _cls(){};
    _cls.prototype = cls.prototype;
    var obj = new _cls();
    //cls.apply(obj, args);
    return obj; 
};

Array.prototype.clone = function () {
    return this.concat();
    //return this.slice(0);
};

Array.prototype.take = function (num) {
    return this.slice(0, num);
};

Array.prototype.same = function () {
    if (IsNull(this[0]))
        return false;
    for (var i = 0; i < this.length; i++) {
        if (i === 0)
            continue;

        if (this[i] !== this[0] || IsNull(this[i]))
            return false;
    }

    return true;
};

Array.prototype.tail = function () {
    "use strict";
    return this[this.length - 1];
};

Array.prototype.clear = function () {
    "use strict";
    return this.length = 0;
};

Array.prototype.trace = function (pre) {
    var str = "num:" + this.length + " [";
    for (var i = 0; i < this.length; i++) {
        str += this[i];
        if (i < this.length - 1)
            str += ",";
    }
    if (NotNull(pre))
        str = pre + "::" + str;

    cc.log(str + "]");
};

var ShowArray = function (arr) {
    var str = "num:" + arr.length + " [";
    for (var i = 0; i < arr.length; i++) {
        str += arr[i];
        if (i < arr.length - 1)
            str += ",";
    }

    return str + "]";
};