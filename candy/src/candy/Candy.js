/**
 * Created by Administrator on 2016/3/2.
 */

var Candy = cc.Sprite.extend({

    type:0,
    colume:0,
    row:0,

    ctor:function(type, column, row){
        //注释掉是因为使用o["name"]访问属性的方式在使用
        //release --advanced发布高级压缩JS时会出错
        //this._super(res["candy"+(type+1)]);

        //利用SpriteSheet缓存到内存后使用#号+图片名称获取
        //this._super("res/"+(type+1)+".png");

        this._super("#"+(type+1)+".png");

        this.init(type, column, row);

        return true;
    },

    init:function(type, column, row){
        this.type = type;
        this.column = column;
        this.row = row;
    },

});

/** @expose */
Candy.createRandomType = function(column, row){
    return new Candy(parseInt(Math.random()*Constant.CANDY_TYPE_COUNT), column, row);
};