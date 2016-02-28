/**
 * Created by Administrator on 2016/2/24.
 */

var Chapter04Scene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        //var ballLayer = new BallLayer();
        //var ballLayer = new SimpleActionLayer();
        //var ballLayer = new ComposeActionLayer();
        //var ballLayer = new TrickyActionLayer();
        var ballLayer = new ControlActionLayer();
        this.addChild(ballLayer);
    }
});

var BallLayer = cc.Layer.extend({
    deltaX:1,
    ball:null,
    frame:0,
    bg:null,

    ctor:function(){
        this._super();
        var size = cc.director.getWinSize();
        var ball = new cc.Sprite(res.item2);
        ball.x = 0;
        ball.y = size.height/2;
        this.addChild(ball, 1);
        this.ball = ball;

        this.bg = new cc.DrawNode();
        this.addChild(this.bg);

        this.scheduleUpdate();
        return true;
    },

    update:function(){
        var size = cc.director.getWinSize();
        this.ball.x += this.deltaX;
        if(this.ball.x >= size.width || this.ball.x <= 0){
            this.deltaX *= -1;
        }
        this.ball.y = Math.sin(this.frame/20)*50 + size.height/2;

        this.bg.drawDot(new cc.Point(this.ball.x, this.ball.y), 2, cc.color(255, 0, 0));
        this.frame++;
    }
});

var SimpleActionLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        var size = cc.director.getWinSize();
        var ball = new cc.Sprite(res.item2);
        ball.x = 0;
        ball.y = size.height/2;
        this.addChild(ball, 1);

        //var action = cc.moveTo(2, cc.p(size.width, size.height/2));
        //var action = cc.moveBy(1, cc.p(size.width, 0));
        ball.x = size.width/2;
        //var action = cc.scaleTo(1, 2);
        //ball.runAction(action);

        //ball.scale = 2;
        //var action = cc.scaleTo(2, -2, 2);
        //ball.runAction(action);

        //var action = cc.fadeTo(2, 0);
        //var action = cc.fadeOut(2);

        //ball.opacity = 0;
        //var action = cc.fadeIn(2);

        //var action = cc.blink(2, 4);
        var action = cc.tintTo(2, 100, 0, 0);
        var action2 = cc.tintTo(2, 255, 255, 255);
        ball.runAction(cc.sequence(action, action2));

        return true;
    }
});

var ComposeActionLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        var size = cc.director.getWinSize();
        var ball = new cc.Sprite(res.item2);
        ball.x = 0;
        ball.y = size.height/2;
        this.addChild(ball, 1);

        var test1 = function() {
            var action1 = cc.moveTo(2, cc.p(size.width/2, size.height/2));
            var action2 = cc.scaleTo(1, 2, 2);
            var sequence1 = cc.sequence(action1, action2);

            var action3 = cc.scaleTo(1, 1, 1);
            var sequence2 = cc.sequence(sequence1, action3);
            ball.runAction(sequence2);
        };
        //test1();

        var test2 = function() {
            ball.x = size.width / 2;
            var action1 = cc.scaleTo(1, 2, 2);
            var action2 = cc.scaleTo(1, 1, 1);
            var sequence = cc.sequence(action1, action2);
            var repeat = cc.repeat(sequence, 3);
            //var repeat = cc.repeatForever(sequence);
            ball.runAction(repeat);
        };
        //test2();

        var test3 = function(){
            var action1 = cc.moveTo(2, cc.p(size.width/2, size.height/2));
            var action2 = cc.scaleTo(1, 2, 2);
            var spawn = cc.spawn(action1, action2);
            ball.runAction(spawn);
        };
        //test3();

        var test4 = function(){
            var action1 = cc.moveBy(2, cc.p(size.width/2, 0));
            //var reverse = action1.reverse();
            var reverse = cc.reverseTime(action1);
            ball.runAction(cc.sequence(action1, reverse));
        };
        //test4();

        var test5 = function(){
            var action1 = cc.moveBy(5, cc.p(size.width/2, 0));
            var action2 = cc.scaleBy(1, 2);
            var reserve = action2.reverse();
            var sequence = cc.sequence(action2, cc.delayTime(0.5), reserve);
            var repeat = cc.repeat(sequence, 2);
            var spawn = cc.spawn(action1, repeat);
            ball.runAction(cc.sequence(spawn, cc.spawn(action1.reverse(), repeat)));
        };
        test5();

        return true;
    }
});

var TrickyActionLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        var size = cc.director.getWinSize();
        var ball = new cc.Sprite(res.item2);
        ball.x = 0;
        ball.y = size.height;
        this.addChild(ball, 1);

        var test1 = function() {
            ball.x = size.width/2;
            var action = cc.moveBy(2, 0, -(size.height - ball.height / 2));
            action.easing(cc.easeIn(2));
            var back = action.clone().reverse();
            back.easing(cc.easeBounceIn());
            ball.runAction(cc.sequence(action, back));
        };
        //test1();

        var self = this;
        var test2 = function(){
            ball.y = size.height/2;
            var action = cc.moveBy(3, cc.p(size.width/2, 0));
            ball.runAction(action);
            self.scheduleOnce(function(){
                //ball.stopAction(action);
                ball.pause();
            }, 2);

            self.scheduleOnce(function(){
                ball.resume();
            }, 3);
        };
        test2();
    }
});

var ControlActionLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        var size = cc.director.getWinSize();
        var ball = new cc.Sprite(res.item2);
        ball.x = 0;
        ball.y = size.height/2;
        this.addChild(ball, 1);

        var action = cc.moveBy(1, cc.p(size.width/2, 0));
        var callback = cc.callFunc(this.callback, this, "message");
        var sequence = cc.sequence(action, callback);
        ball.runAction(sequence);

        return true;
    },

    callback:function(nodeExecutingAction, data){
        trace(nodeExecutingAction instanceof  cc.Sprite, data);
        cc.audioEngine.setMusicVolume(0.3);
        cc.audioEngine.playMusic(res.bgMusic, true);
        this.scheduleOnce(function(){
            cc.audioEngine.stopMusic();
        }, 3);
    }
});