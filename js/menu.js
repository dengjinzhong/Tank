/*
 游戏开始菜单
*/

var Menu = function(context) {
	this.ctx = context;
	this.x = 0;
	this.y = SCREEN_HEIGHT;
	this.selectTank = new SelectTank();
	this.playNum = 1;
	this.times = 0;

	/*
	 画菜单
	*/
	this.draw = function() {
		this.times++;
		var temp = 0;
		if (parseInt(this.times / 6) % 2 === 0) {
			temp = 0;
		} else {
			temp = this.selectTank.size;
		}
		if (this.y <= 0) {
			this.y = 0;
		} else {
			this.y -= 5;
		}
		this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
		this.ctx.save();        //拷贝画布
		//画背景
		this.ctx.drawImage(MENU_IMAGE, this.x, this.y);
		//画选择坦克
		this.ctx.drawImage(
		    RESOURCE_IMAGE,
			POS["selectTank"][0], POS["selectTank"][1] + temp,                 //裁剪坐标
			this.selectTank.size, this.selectTank.size,                        //裁剪大小
			this.selectTank.x, this.y + this.selectTank.ys[this.playNum - 1],  //图像坐标
			this.selectTank.size, this.selectTank.size                         //图像大小
		);
	    this.ctx.restore();  //弹出图形状态并恢复
		
	}
	
	/**
	 * 选择坦克上下移动
	 */
	this.next = function(n) {
		this.playNum += n;
		if(this.playNum > 2) {
			this.playNum = 1;
		}else if(this.playNum < 1){
			this.playNum = 2;
		}
	}
}
