/**
 * Created by Administrator on 2016/3/3.
 */

var GameLayer = cc.Layer.extend({

    candyPanel:null,
    gameUI:null,

    score:0,
    level:0,
    steps:0,
    limitStep:0,
    targetScore:0,

    moving:false,

    ctor:function(){
        this._super();

        this._initBg();
        this._initCandyPanel();
        this._initCandy();
        this._initGameUI();
        this._initGameUIData();
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
        var clippingPanel = new cc.ClippingNode();  //加入一层遮罩节点
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
        clippingPanel.stencil = stencil;    //设置遮罩节点的裁剪矩形范围
    },

    _initCandy:function(){
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

    _initGameUIData:function(){
        this.steps = 0;
        this.level = Storage.getCurrentLevel();
        this.score = Storage.getCurrentScore();
        this.limitStep = Constant.levels[this.level-1].limitStep;
        this.targetScore = Constant.levels[this.level-1].targetScore;
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
        //trace("column="+column,"row="+row);
        if(this.moving){
            return;
        }

        var joinCandys = [this.candy[column][row]];
        var index = 0;
        var pushIntoCandys = function(element){
            if(joinCandys.indexOf(element) < 0){
                joinCandys.push(element);
            }
        };

        while(index < joinCandys.length){
            var candy = joinCandys[index];
            if(this._checkCandyExist(candy.column-1, candy.row)
                && this.candy[candy.column-1][candy.row].type == candy.type){
                pushIntoCandys(this.candy[candy.column-1][candy.row]);
            }
            if(this._checkCandyExist(candy.column+1, candy.row)
                && this.candy[candy.column+1][candy.row].type == candy.type){
                pushIntoCandys(this.candy[candy.column+1][candy.row]);
            }
            if(this._checkCandyExist(candy.column, candy.row-1)
                && this.candy[candy.column][candy.row-1].type == candy.type){
                pushIntoCandys(this.candy[candy.column][candy.row-1]);
            }
            if(this._checkCandyExist(candy.column, candy.row+1)
                && this.candy[candy.column][candy.row+1].type == candy.type){
                pushIntoCandys(this.candy[candy.column][candy.row+1]);
            }
            index++;
        }

        if(joinCandys.length <= 1){
            return;
        }

        this.steps++;
        this.moving = true;

        for(var i=0;i<joinCandys.length;i++){
            var candy = joinCandys[i];
            this.candyPanel.removeChild(candy);
            this.candy[candy.column][candy.row] = null;
        }

        this.score += joinCandys.length * joinCandys.length;
        cc.audioEngine.playEffect(res.scoreMp3, false);

        this._generateNewCandy();
        this._checkSuccessOrFail();
    },

    _checkCandyExist:function(column, row){
        //return this.candy[column] && this.candy[column][row];
        //return this.candy[column][row] != null;

        if(column >= 0 && column < Constant.CANDY_SIZE && row >= 0 && row < Constant.CANDY_SIZE){
            return true;
        }
        return false;
    },

    _generateNewCandy:function(){
        var maxTime = 0;
        for(var i=0;i<Constant.CANDY_SIZE;i++){
            var missCount = 0;
            for(var j=0;j<this.candy[i].length;j++){
                var candy = this.candy[i][j];
                if(!candy){
                    candy = Candy.createRandomType(i, Constant.CANDY_SIZE+missCount);
                    this.candyPanel.addChild(candy);
                    candy.x = candy.column*Constant.CANDY_WIDTH + Constant.CANDY_WIDTH/2;
                    candy.y = candy.row*Constant.CANDY_WIDTH + Constant.CANDY_WIDTH/2;
                    this.candy[i][candy.row] = candy;
                    missCount++;
                }else{
                    var fallLength = missCount;
                    if(fallLength > 0){
                        var duration = Math.sqrt(2*fallLength/Constant.FALL_ACCELERATION);
                        if(duration > maxTime){
                            maxTime = duration;
                        }
                        var fall = cc.moveTo(duration, candy.x, candy.y-Constant.CANDY_WIDTH*fallLength).easing(cc.easeIn(2));
                        candy.runAction(fall);
                        candy.row -= fallLength;    //下移行数，即掉落下来补充已经被消除的元素
                        this.candy[i][j] = null;    //因为已经把当前元素下移了，所以当前元素置为空null
                        this.candy[i][candy.row] = candy;
                    }
                }
            }

            //移除超出地图的临时元素位置
            for(var j=this.candy[i].length; j>=Constant.CANDY_SIZE;j--){
                this.candy[i].splice(j, 1);
            }
        }

        this.scheduleOnce(this._finishCandyFall.bind(this), maxTime);
    },

    _finishCandyFall:function(){
        this.moving = false;
        cc.audioEngine.playEffect(res.fallMp3, false);
    },

    _checkSuccessOrFail:function(){
        if(this.score > this.targetScore){
            this.gameUI.showSuccess();
            this.score += (this.limitStep-this.steps) * 30;

            Storage.setCurrentLevel(this.level+1);
            Storage.setCurrentScore(this.score);

            this.scheduleOnce(function(){
                cc.director.runScene(new GameScene());
            }, 3);
        }else if(this.steps >= this.limitStep){
            this.gameUI.showFail();

            Storage.setCurrentLevel(this.level);
            Storage.setCurrentScore(0);

            this.scheduleOnce(function(){
                cc.director.runScene(new GameScene());
            }, 3);
        }
    }

});