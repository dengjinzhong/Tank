var ctx, //2d画布
	wallCtx, //地图画布
	grassCtx, //草地画布
	tankCtx, //坦克画布
	overCtx; //结束画布

var menu = null; //菜单
var stage = null; //舞台
var map = null; //地图
var player1 = null; //玩家1
var player2 = null; //玩家2
var prop = null;
var enemyArray = []; //敌方坦克
var bulletArray = []; //子弹数组
var keys = []; //记录按下的按键
var crackArray = []; //爆炸数组

var gameState = GAME_STATE_MENU; //默认菜单状态
var level = 1;
var maxEnemy = 20; //敌方坦克总数
var maxAppearEnemy = 5; //屏幕上一起出现的最大数
var appearEnemy = 0; //已出现的敌方坦克
var mainframe = 0;
var isGameOver = false;
var overX = 176;
var overY = 384;
var emenyStopTime = 0;
var homeProtectedTime = -1;
var propTime = 300;

$(document).ready(function() {
	initScreen();
	initObject();

	// setInterval(gameLoop, 20);
})

/*界面初始化*/
function initScreen() {
	var canvas = $("#stageCanvas");
	ctx = canvas[0].getContext("2d");
	canvas.attr({
		"width": SCREEN_WIDTH,
		"height": SCREEN_HEIGHT
	});

	wallCtx = $("#wallCanvas")[0].getContext("2d");
	grassCtx = $("#grassCanvas")[0].getContext("2d");
	tankCtx = $("#tankCanvas")[0].getContext("2d");
	overCtx = $("#overCanvas")[0].getContext("2d");

	$("#wallCanvas").attr({
		"width": SCREEN_WIDTH,
		"height": SCREEN_HEIGHT
	});
	$("#grassCanvas").attr({
		"width": SCREEN_WIDTH,
		"height": SCREEN_HEIGHT
	});
	$("#tankCanvas").attr({
		"width": SCREEN_WIDTH,
		"height": SCREEN_HEIGHT
	});
	$("#overCanvas").attr({
		"width": SCREEN_WIDTH,
		"height": SCREEN_HEIGHT
	});

	$('#canvasDiv').css({
		"width": SCREEN_WIDTH,
		"height": SCREEN_HEIGHT,
		"background-color": "#000000"
	})
}

function initObject() {
	// menu = new Menu(ctx);
	var map = new Map(wallCtx, grassCtx);
	map.setMapLevel(level);
	map.draw();
}

function gameLoop() {
	switch (gameState) {
		case GAME_STATE_MENU:
			menu.draw();
			break;
	}
}

$(document).keydown(function(e) {
	switch(gameState) {
		case GAME_STATE_MENU: 
		    if(e.keyCode === keyboard.ENTER) {
				gameState = GAME_STATE_INIT;
				//只有一个玩家
				if(menu.playNum === 1) {
					
				}
			}else {
				var n = 0;
				if(e.keyCode === keyboard.DOWN) {
					n = 1;
				}else if (e.keyCode === keyboard.UP) {
					n = -1;
				}
				menu.next(n);
			}
			break;
// 		case GAME_STATE_START:
// 		    if(!keys.contain(e.keyCode)) {
// 				key.push(e.keyCode);
// 			}
// 			//射击
// 			if(e.keyCode === keyboard.SPACE && player1.lives > 0) {
// 				
// 			}
	}
})


function initMap() {
	map.setMapLevel(level);
	map.draw();
	drawLives();
}
