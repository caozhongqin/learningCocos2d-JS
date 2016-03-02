var GameScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

var GameLayer = cc.Layer.extend({

    candyPanel:null,
    gameUI:null,

    score:0,
    level:0,
    steps:0,
    limitStep:0,
    targetScore:0,

    ctor:function(){
        this._super();

        this._initBg();
        this._initCandyPanel();
        this._initCandy();
        this._initGameUI();
        this._initEventHandler();

        return true;
    },

    _initBg:function(){
        var size = cc.winSize;
        var bg = new cc.Sprite(res.bg);
        bg.x = size.width/2;
        bg.y = size.height/2;
        this.addChild(bg, 1);
    },

    _initCandyPanel:function(){
        var size = cc.winSize;
        var clippingPanel = new cc.ClippingNode();
        this.addChild(clippingPanel, 2);

        this.candyPanel = new cc.Layer();
        this.candyPanel.x = (size.width - Constant.CANDY_WIDTH*Constant.CANDY_SIZE) / 2;
        this.candyPanel.y = (size.height - Constant.CANDY_WIDTH*Constant.CANDY_SIZE) / 2;
        clippingPanel.addChild(this.candyPanel, 1);

        var stencil = new cc.DrawNode();
        stencil.drawRect(
            cc.p(this.candyPanel.x, this.candyPanel.y),
            cc.p(this.candyPanel.x + Constant.CANDY_WIDTH*Constant.CANDY_SIZE, this.candyPanel.y + Constant.CANDY_WIDTH*Constant.CANDY_SIZE),
            cc.color(0, 0, 0), cc.color(0, 0, 0)
        );
        clippingPanel.stencil = stencil;
    },

    _initCandy:function(){
        this.steps = 0;
        this.level = 1;
        this.score = 0;
        this.limitStep = 30;
        this.targetScore = 100;

        this.candy = [];
        for(var i=0;i<Constant.CANDY_SIZE;i++){
            var column = [];
            for(var j=0;j<Constant.CANDY_SIZE;j++){
                var randomCandy = Candy.createRandomType(i, j);
                this.candyPanel.addChild(randomCandy);
                randomCandy.x = i * Constant.CANDY_WIDTH + Constant.CANDY_WIDTH/2;
                randomCandy.y = j * Constant.CANDY_WIDTH + Constant.CANDY_WIDTH/2;
                column.push(randomCandy);
            }
            this.candy.push(column);
        }
    },

    _initGameUI:function(){
        this.gameUI = new GameUI(this);
        this.addChild(this.gameUI, 3);
    },

    _initEventHandler:function(){
        if("touches" in cc.sys.capabilities){
            cc.eventManager.addListener({
                event:cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan:this._onTouchBegan.bind(this)
            }, this.candyPanel);
        }else{
            cc.eventManager.addListener({
                event:cc.EventListener.MOUSE,
                onMouseDown:this._onMouseDown.bind(this)
            }, this.candyPanel);
        }
    },

    _onTouchBegan:function(touch, event){
        var column = Math.floor((touch.getLocation().x - this.candyPanel.x) / Constant.CANDY_WIDTH);
        var row = Math.floor((touch.getLocation().y - this.candyPanel.y) / Constant.CANDY_WIDTH);
        this._popCandy(column, row);
        return true;
    },

    _onMouseDown:function(event){
        var column = Math.floor((event.getLocationX() - this.candyPanel.x) / Constant.CANDY_WIDTH);
        var row = Math.floor((event.getLocationY() - this.candyPanel.y) / Constant.CANDY_WIDTH);
        this._popCandy(column, row);
        return true;
    },

    _popCandy:function(column, row){
        trace("column="+column,"row="+row);
    },

});