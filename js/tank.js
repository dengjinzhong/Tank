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

/**
 * 玩家坦克
 * @param context 画坦克的画布
 * @returns
 */
var PlayTank = function(context){
	this.ctx = context;
	this.lives = 3; //生命值
	this.isProtected = true;  //是否受保护
	this.protectedTime = 500; //保护时间
	this.offsetX = 0; //坦克2与坦克1的距离
	this.speed = 2; //坦克的速度
	
	this.draw = function() {
		this.hit = false;
		this.ctx.drawImage(
			RESOURCE_IMAGE,
			POS["player"][0]+this.offsetX+this.dir*this.size,POS["player"][1],
			this.size,this.size,
			this.x,this.y,
			this.size,this.size
		)
		if(this.isProtected){
			var temp = parseInt((500-this.protectedTime)/5)%2;
			this.ctx.drawImage(
				RESOURCE_IMAGE,
				POS["protected"][0],POS["protected"][1]+32*temp,
				32, 32,
				this.x,this.y,
				32, 32
			);
			this.protectedTime--;
			if(this.protectedTime == 0){
				this.isProtected = false;
			}
		}
	}
	
	this.distroy = function(){
		this.isDestroyed = true;
		crackArray.push(new CrackAnimation(CRACK_TYPE_TANK,this.ctx,this));
		PLAYER_DESTROY_AUDIO.play();
	};
	
	this.renascenc = function(player){
		this.lives -- ;
		this.dir = UP;
		this.isProtected = true;
		this.protectedTime = 500;
		this.isDestroyed = false;
		var temp= 0 ;
		if(player == 1){
			temp = 129;
		}else{
			temp = 256;
		}
		this.x = temp + map.offsetX;
		this.y = 385 + map.offsetY;
	};
	
}

PlayTank.prototype = new Tank();
