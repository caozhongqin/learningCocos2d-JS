/**
 * Created by Administrator on 2016/3/2.
 */

var GameUI = cc.Layer.extend({

    levelText:null,
    scoreText:null,
    stepText:null,
    gameLayer:null,

    ctor:function(gameLayer){
        this._super();

        this.gameLayer = gameLayer;
        this._initUI();
        this.scheduleUpdate();

        return true;
    },

    _initUI:function(){
        this.levelText = this._initLabelAndText("Level", "1", 100);
        this.scoreText = this._initLabelAndText("Score", "1", 370);
        this.stepText = this._initLabelAndText("Step", "1", 620);
    },

    _initLabelAndText:function(l, t, x){
        var size = cc.director.getWinSize();
        var label = new cc.LabelTTF(l, "Arial", 36);
        label.x = x;
        label.y = size.height - 35;
        label.setColor(cc.color(0, 0, 0));
        this.addChild(label);

        var text = new cc.LabelTTF(t, "Arial", 36);
        text.x = x;
        text.y = size.height - 80;
        text.setColor(cc.color(0, 0, 0));
        this.addChild(text);

        return text;
    },

    update:function(){
        this.levelText.setString(this.gameLayer.level+"");
        this.scoreText.setString(this.gameLayer.score+"");
        this.stepText.setString((this.gameLayer.limitStep - this.gameLayer.steps)+"");
    },

    showMsg:function(s){
        var bg = new cc.LayerColor(cc.color(255, 255, 255), 500);
        this.addChild(bg, 1);

        var size = cc.director.getWinSize();
        bg.x = (size.width - bg.width) / 2;
        bg.y = (size.height - bg.height) / 2;
        var msg = new cc.LabelTTF(s, "Arial", 50);
        msg.setColor(cc.color(0, 0, 0));
        msg.x = 250;
        msg.y = 250;
        bg.addChild(msg);
    },

});