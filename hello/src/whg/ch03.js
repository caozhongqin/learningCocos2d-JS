/**
 * Created by Administrator on 2016/2/28.
 */

var Chapter03Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layerGradient = new cc.LayerGradient(cc.color(255, 0, 0), cc.color(0, 0, 255));
        this.addChild(layerGradient, 0);

        var bg = new cc.LayerColor(cc.color(100, 100, 100), 200, 200);
        bg.x = 100;
        bg.y = 100;
        this.addChild(bg, 1);

        var ball = new cc.Sprite(res.item2);
        //var size = cc.director.getWinSize();
        //ball.x = size.width / 2;
        //ball.y = size.height / 2;
        ball.x = 100;
        ball.y = 300;
        this.addChild(ball, 2);

        var ball2 = new cc.Sprite(res.item3);
        ball2.x = 100;
        ball2.y = 100;
        bg.addChild(ball2, 1);

        var ball3 = new cc.Sprite(res.item3);
        ball.addChild(ball3, 1);

        this.scheduleOnce(function(){
            cc.director.runScene(new cc.TransitionFade(2, new Chapter03SecondScene()));
        }, 5);
    }
});


var Chapter03SecondScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new cc.LayerGradient(cc.color(128, 0, 0), cc.color(0, 0, 128));
        this.addChild(layer);

        this.scheduleOnce(function(){
            cc.director.runScene(new cc.TransitionTurnOffTiles(2, new Chapter03Scene()));
        }, 5);
    }
});