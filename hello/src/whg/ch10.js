/**
 * Created by Administrator on 2016/3/7.
 */

var Chapter10Scene = cc.Scene.extend({
    onEnter:function(){
        this._super();

        //var layerGradient = new cc.LayerGradient(cc.color(255, 0, 0), cc.color(0, 0, 255));
        //this.addChild(layerGradient, 0);

        //this.addChild(new BatchNodeLayer(false));
        //this.addChild(new PoolLayer(true));
        this.addChild(new BakeLayer(false));
    }
});

var BatchNodeLayer = cc.Layer.extend({
    ctor:function(needBatchNode){
        this._super();
        this.needBatchNode = needBatchNode;

        cc.spriteFrameCache.addSpriteFrames(res.candys);

        var node = null;
        if(this.needBatchNode){
            node = new cc.SpriteBatchNode(res.candysPng);
            this.addChild(node);
        }else{
            node = this;
        }

        var size = cc.winSize;
        for(var i=0;i<4000;i++){
            var ball = new cc.Sprite("#"+(parseInt(Math.random()*5) + 1)+".png");
            node.addChild(ball, 1);
            ball.x = Math.random() * size.width;
            ball.y = Math.random() * size.height;
            //ball.runAction(cc.rotateBy(1, 360*Math.random(), 360*Math.random()).repeatForever());
        }

        trace("this.needBatchNode="+this.needBatchNode+" !");
        return true;
    }
});

var ReuseSprite = cc.Sprite.extend({
    ctor:function(url){
        this._super(url);
    },
    reuse:function(param){
        //trace("reuse", param);
    },
    unuse:function(){
        //trace("unuse");
    }
});

var PoolLayer = cc.Layer.extend({
    tag:0,
    deleteTag:0,

    ctor:function(needPool){
        this._super();
        this.needPool = needPool;

        cc.spriteFrameCache.addSpriteFrames(res.candys);
        this.scheduleUpdate();

        trace("this.needPool="+this.needPool+" !");
        return true;
    },

    update:function(){
        var size = cc.winSize;
        if(this.tag - this.deleteTag > 500){
            for(var i=0;i<250;i++){
                var ball = this.getChildByTag(this.deleteTag);
                if(this.needPool){
                    cc.pool.putInPool(ball);
                }
                this.removeChild(ball);
                this.deleteTag++;
            }
        }

        var param = "anything";
        for(var i=0;i<250;i++){
            var ball = null;
            if(this.needPool && cc.pool.hasObject(ReuseSprite)){
                ball = cc.pool.getFromPool(ReuseSprite, param);
            }else{
                ball = new ReuseSprite("#"+(parseInt(Math.random()*5) + 1)+".png");
            }
            this.addChild(ball, 1, this.tag);
            this.tag++;
            ball.x = Math.random() * size.width;
            ball.y = Math.random() * size.height;
        }
    }
});

var BakeLayer = cc.Layer.extend({
    ctor:function(needBake){
        this._super();

        this.needBake = needBake;
        cc.spriteFrameCache.addSpriteFrames(res.candys);

        var size = cc.winSize;
        var layer = new cc.Layer();
        this.addChild(layer);
        for(var i=0;i<8000;i++){
            var ball = new cc.Sprite("#"+(parseInt(Math.random()*5) + 1)+".png");
            layer.addChild(ball);
            ball.x = Math.random() * size.width;
            ball.y = Math.random() * size.height;
        }

        if(this.needBake){
            layer.bake();
        }

        return true;
    }
});