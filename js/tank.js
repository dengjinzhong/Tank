/*坦克类*/
var Tank = function() {
	this.x = 0;
	this.y = 0;
	this.size = 32; //坦克的大小
	this.dir = UP; // 方向0： 上
	this.speed = 1; //坦克的速度
	this.frame = 0; //控制敌方坦克切换方向的时间
	this.hit = false; //是否碰到墙或者坦克
	this.isAI = false; //是否自动
	this.isShooting = false; //子弹是否在运行中
	this.bullet = null;  //子弹
	this.shootRate = 0.6; //射击的概率
	this.isDestroyed = false;
	this.tempX = 0;
	this.tempY = 0;
	 
	this.move = function() {
		//如果是AI坦克，在一定时间或者碰撞之后切换方法
		
		if(this.isAI && emenyStopTime > 0) {
			return;
		}
	} 
}

/**
  *菜单选择坦克
  */

var SelectTank = function() {
	this.ys = [250, 281]; //两个Y坐标，分别对应1P和2P
	this.x = 140;
	this.size = 27;
}

SelectTank.prototype = new Tank();
