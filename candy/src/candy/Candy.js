/**
 * Created by Administrator on 2016/3/2.
 */

var Candy = cc.Sprite.extend({

    type:0,
    colume:0,
    row:0,

    ctor:function(type, column, row){
        this._super(res["candy"+(type+1)]);
        this.init(type, column, row);
        return true;
    },

    init:function(type, column, row){
        this.type = type;
        this.column = column;
        this.row = row;
    },

});

Candy.createRandomType = function(column, row){
    return new Candy(parseInt(Math.random()*Constant.CANDY_TYPE_COUNT), column, row);
};