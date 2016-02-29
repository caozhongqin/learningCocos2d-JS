/**
 * Created by Administrator on 2016/2/29.
 */

var Chapter07Scene = cc.Scene.extend({
    onEnter:function(){
        this._super();

        var layerGradient = new cc.LayerGradient(cc.color(255, 0, 0), cc.color(0, 0, 255));
        this.addChild(layerGradient, 0);

        //this.addChild(new MenuItemSpriteLayer());
        //this.addChild(new MenuItemFontLayer());
        //this.addChild(new MenuItemToggleLayer());
        //this.addChild(new MenuLayer());
        this.addChild(new TTFLayer());
    }
});

var MenuItemSpriteLayer = cc.Layer.extend({
    ctor:function(){
        this._super();

        var test = function() {
            var normal = new cc.Sprite(res.startGame);
            var selected = new cc.Sprite(res.startGame2);
            var disable = new cc.Sprite(res.startGame3);
            var menuSprite = new cc.MenuItemSprite(normal, selected, disable, this.startGame, this);
            var menu = new cc.Menu(menuSprite);
            this.addChild(menu, 1);

            //menuSprite.setEnabled(false);
            menuSprite.setEnabled(true);
        };
        //test.call(this);

        var test2 = function() {
            var menuImage = new cc.MenuItemImage(res.startGame, res.startGame2, res.startGame3, this.startGame, this);
            var menu = new cc.Menu(menuImage);
            this.addChild(menu, 1);

            //menuImage.setEnabled(false);
            menuImage.setEnabled(true);
        };
        test2.call(this);

        return true;
    },
    startGame:function(){
        trace("this is MenuItemSpriteLayer?", this instanceof MenuItemSpriteLayer);
    }
});

var MenuItemFontLayer = cc.Layer.extend({
    ctor:function(){
        this._super();

        var test = function() {
            var menuFont = new cc.MenuItemFont("START GAME", this.startGame, this);
            menuFont.fontSize = 32;
            menuFont.fontName = "Arial";
            var menu = new cc.Menu(menuFont);
            this.addChild(menu);
        };
        //test.call(this);

        var test2 = function() {
            var label = new cc.LabelTTF("START GAME", "Arial", 32);
            var item = new cc.MenuItemLabel(label, this.startGame, this);
            var menu = new cc.Menu(item);
            this.addChild(menu);
        };
        //test2.call(this);

        var test3 = function() {
            var label = new cc.LabelBMFont("START GAME", res.fontTnt);
            var item = new cc.MenuItemLabel(label, this.startGame, this);
            var menu = new cc.Menu(item);
            this.addChild(menu);
        };
        test3.call(this);

        return true;
    },
    startGame:function(){
        trace("start game button clicked");
    }
});

var MenuItemToggleLayer = cc.Layer.extend({
    musicIsOpen:false,
    ctor:function(){
        this._super();

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(23);

        var on = new cc.MenuItemFont("ON");
        var off = new cc.MenuItemFont("OFF");
        var item = new cc.MenuItemToggle(off, on, this.toggleMusic, this);
        var menu = new cc.Menu(item);
        this.addChild(menu);

        return true;
    },
    toggleMusic:function(){
        if(this.musicIsOpen){
            this.musicIsOpen = false;
            trace("music is "+(this.musicIsOpen?"open":"close"));

            this.closeMusic();
        }else{
            this.musicIsOpen = true;
            trace("music is "+(this.musicIsOpen?"open":"close"));

            this.openMusic();
        }
    },
    openMusic:function(){
        cc.audioEngine.setMusicVolume(0.1);
        cc.audioEngine.playMusic(res.bgMusic, true);
        this.schedule(this.incrMusicVolume, 0.2);
    },
    closeMusic:function(){
        this.schedule(this.decrMusicVolume, 0.2);
    },
    incrMusicVolume:function(){
        if(cc.audioEngine.getMusicVolume() < 1){
            cc.audioEngine.setMusicVolume(cc.audioEngine.getMusicVolume()+0.1);
            trace("incrMusicVolume 0.1 now is "+cc.audioEngine.getMusicVolume());
        }else{
            this.unschedule(this.incrMusicVolume);
            trace("unschedule(this.incrMusicVolume)");
        }
    },
    decrMusicVolume:function(){
        if(cc.audioEngine.getMusicVolume() > 0){
            cc.audioEngine.setMusicVolume(cc.audioEngine.getMusicVolume()-0.1);
            trace("decrMusicVolume 0.1 now is "+cc.audioEngine.getMusicVolume());
        }else{
            cc.audioEngine.stopMusic();
            this.unschedule(this.decrMusicVolume);
            trace("unschedule(this.decrMusicVolume)");
        }
    },
});

var MenuLayer = cc.Layer.extend({
    ctor:function(){
        this._super();

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(24);

        var one = new cc.MenuItemFont("one", this.clickHandler);
        var two = new cc.MenuItemFont("two", this.clickHandler);
        var three = new cc.MenuItemFont("three", this.clickHandler);
        var four = new cc.MenuItemFont("four", this.clickHandler);
        var five = new cc.MenuItemFont("five", this.clickHandler);
        var six = new cc.MenuItemFont("six", this.clickHandler);
        var menu = new cc.Menu(one, two, three, four, five, six);

        //menu.alignItemsVertically();
        menu.alignItemsVerticallyWithPadding(50);
        this.addChild(menu, 1)

        return true;
    },
    clickHandler:function(){

    }
});

var TTFLayer = cc.Layer.extend({
    ctor:function(){
        this._super();

        var size = cc.director.getWinSize();
        var aboutText = new cc.LabelTTF("About the game ... ", "Arial", 30,
            cc.size(350, 200), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        aboutText.x = size.width/2;
        aboutText.y = size.height/2;
        aboutText.color = cc.color(0, 255, 0);
        this.addChild(aboutText);

        return true;
    }
});