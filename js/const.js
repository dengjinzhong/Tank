/**
 * 静态变量
 */
const SCREEN_WIDTH = 512; //屏幕宽
const SCREEN_HEIGHT = 448; //屏幕高

/*图片资源*/
const MENU_IMAGE = new Image();
MENU_IMAGE.src = "images/menu.gif";
const RESOURCE_IMAGE = new Image();
RESOURCE_IMAGE.src = "images/tankAll.gif";

/*各个图块在图片中的位置*/
const POS = new Array();
POS["selectTank"] = [128,96];
POS["stageLevel"] = [396,96];
POS["num"] = [256,96];
POS["map"] = [0,96];
POS["home"] = [256,0];
POS["score"] = [0,112];
POS["player"] = [0,0];
POS["protected"] = [160,96];
POS["enemyBefore"] = [256,32];
POS["enemy1"] = [0,32];
POS["enemy2"] = [128,32];
POS["enemy3"] = [0,64];
POS["bullet"] = [80,96];
POS["tankBomb"] = [0,160];
POS["bulletBomb"] = [320,0];
POS["over"] = [384,64];
POS["prop"] = [256,110];

/*声音资源*/
const START_AUDIO = new Audio("audio/start.mp3");
const BULLET_DESTROY_AUDIO = new Audio("audio/bulletCrack.mp3");
const TANK_DESTROT_AUDIO = new Audio("audio/tankCrack.mp3");
const PLAYER_DESTROY_AUDIO = new Audio("audio/playerCrack.mp3");
const MOVE_AUDIO = new Audio("audio/move.mp3");
const ATTACK_AUDIO = new Audio("audio/attack.mp3");
const PROP_AUDIO = new Audio("audio/prop.mp3");

/*游戏状态*/
const GAME_STATE_MENU = 0;
const GAME_STATE_INIT = 1;
const GAME_STATE_START = 2;
const GAME_STATE_OVER = 3;
const GAME_STATE_WIN = 4;

/*地图块*/
const WALL = 1;
const GRID = 2;
const GRASS = 3;
const WATER = 4;
const ICE = 5;
const HOME = 9;
const ANOTHREHOME = 8;

/*坦克及子弹的四个方向*/
const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

const ENEMY_LOCATION = [192, 0 , 384]; //相对于主游戏区

/*子弹类型*/
const BULLET_TYPE_PLAYER = 1;
const BULLET_TYPE_ENEMY = 2;

/*爆炸类型*/
const CRACK_TYPE_TANK = "tank";
const CRACK_TYPE_BULLET = "bullet";
 