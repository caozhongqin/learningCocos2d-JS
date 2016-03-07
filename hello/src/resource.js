var res = {
    HelloWorld_png : "res/HelloWorld.png",
    bg : "bg.jpg",
    item2 : "res/item_2.png",
    item3 : "res/item_3.png",
    bgMusic : "res/sounds/bgWelcome.mp3",

    startGame : "res/images/ch07/startgame.png",
    startGame2 : "res/images/ch07/startgame2.png",
    startGame3 : "res/images/ch07/startgame3.png",

    fontTnt : "res/images/ch07/font.fnt",

    candys : "res/candy.plist",
    candysPng : "res/candy.png",

    sky : "res/images/ch12/sky.jpg",
    hill : "res/images/ch12/hill.png",
    buildings : "res/images/ch12/buildings.png",
    trees : "res/images/ch12/trees.png",
};

var grossiniPngs = [
    "res/images/ch11/DemoPlayer/Comet.plist",
    "res/images/ch11/DemoPlayer/DemoPlayer.ExportJson",
    "res/images/ch11/DemoPlayer/DemoPlayer0.plist",
    "res/images/ch11/DemoPlayer/DemoPlayer0.png",
    "res/images/ch11/DemoPlayer/DemoPlayer1.plist",
    "res/images/ch11/DemoPlayer/DemoPlayer1.png",

    "res/images/ch11/dragonbones/skeleton.plist",
    "res/images/ch11/dragonbones/skeleton.png",
    "res/images/ch11/dragonbones/skeleton.xml"
];
for(var i=1;i<=14;i++){
    grossiniPngs.push("res/images/ch11/grossini_dance_"+(i<10?"0"+i:i)+".png");
}

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
g_resources = g_resources.concat(grossiniPngs);
