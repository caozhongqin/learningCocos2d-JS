/**
 * Created by Administrator on 2016/3/7.
 */

var Chapter12Scene = cc.Scene.extend({
    onEnter:function(){
        this._super();

        //var layerGradient = new cc.LayerGradient(cc.color(255, 0, 0), cc.color(0, 0, 255));
        //this.addChild(layerGradient, 0);

        //this.addChild(new ParallaxLayer());
        this.addChild(new MyParallaxlayer());
    }
});

var ParallaxLayer = cc.Layer.extend({
    ctor:function(){
        this._super();

        var bg = new cc.ParallaxNode();
        var sky = new cc.Sprite(res.sky);
        var hill = new cc.Sprite(res.hill);
        var buildings = new cc.Sprite(res.buildings);
        var trees = new cc.Sprite(res.trees);

        bg.addChild(sky, 1, cc.p(0.1, 0), cc.p(sky.width/2, sky.height/2));
        bg.addChild(hill, 2, cc.p(0.3, 0), cc.p(hill.width/2, hill.height/2));
        bg.addChild(buildings, 3, cc.p(0.5, 0), cc.p(buildings.width/2, buildings.height/2));
        bg.addChild(trees, 4, cc.p(1, 0), cc.p(trees.width/2, trees.height/2));

        var action = cc.moveBy(2, -1000, 0);
        bg.runAction(cc.sequence(action, action.clone().reverse()).repeatForever());
        this.addChild(bg);

        return true;
    }
});

var MyParallaxlayer = cc.Layer.extend({

    _bg1:null,
    _bg2:null,
    _bg3:null,
    _bg4:null,

    speed:5,

    ctor:function(){
        this._super();

        var buildParallaxBackground = function(texture){
            var layer = new cc.Layer();

            var bg = new cc.Sprite(texture);
            bg.x = bg.width/2;
            bg.y = bg.height/2;
            layer.addChild(bg);

            var bg2 = new cc.Sprite(texture);
            bg2.x = bg2.width/2 + bg2.width;
            bg2.y = bg2.height/2;
            layer.addChild(bg2);

            var bg3 = new cc.Sprite(texture);
            bg3.x = bg2.width/2 + 2*bg2.width;
            bg3.y = bg2.height/2;
            layer.addChild(bg3);

            return layer;
        };

        this._bg1 = buildParallaxBackground(res.sky);
        this.addChild(this._bg1);

        this._bg2 = buildParallaxBackground(res.hill);
        this.addChild(this._bg2);

        this._bg3 = buildParallaxBackground(res.buildings);
        this.addChild(this._bg3);

        this._bg4 = buildParallaxBackground(res.trees);
        this.addChild(this._bg4);

        this.scheduleUpdate();

        return true;
    },

    update:function(){
        var size = cc.winSize;
        this._bg1.x -= Math.ceil(this.speed * 0.1);
        if(this._bg1.x < -parseInt(2*size.width)){
            this._bg1.x = -(-parseInt(2*size.width) - this._bg1.x + size.width)+Math.ceil(this.speed * 0.1)*22;
        }

        this._bg2.x -= Math.ceil(this.speed * 0.3);
        if(this._bg2.x < -parseInt(2*size.width)){
            this._bg2.x = -(-parseInt(2*size.width) - this._bg2.x + size.width)+Math.ceil(this.speed * 0.3)*22;
        }

        this._bg3.x -= Math.ceil(this.speed * 0.5);
        if(this._bg3.x < -parseInt(2*size.width)){
            this._bg3.x = -(-parseInt(2*size.width) - this._bg3.x + size.width)+Math.ceil(this.speed * 0.5)*22;
        }

        this._bg4.x -= Math.ceil(this.speed * 1);
        if(this._bg4.x < -parseInt(2*size.width)){
            this._bg4.x = -(-parseInt(2*size.width) - this._bg4.x + size.width)+Math.ceil(this.speed * 1)*22;
        }
    }

});