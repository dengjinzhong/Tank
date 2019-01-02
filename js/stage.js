var Stage = function(context, l) {
	this.ctx = context;
	this.cxt.fillStyle = "#7f7f7f";
	this.drawHeight = 15;
	this.level = l;
	this.temp = 0;
	this.dir = 1; //中间切换的方向， 1：合上， 2： 展开
	this.isReady = false;
	this.levelNum = new Num(context);

	this.init = function(level) {
		this.dir = 1;
		this.isReady = false;
		this.level = level;
		this.temp = 0;
	};

	this.draw = function() {
		if (this.dir === 1) {

			// temp = 15 * 15 灰色屏幕已经画完
			if (this.temp === 225) {
				//78,14为STAGE字样在图片资源中的宽和高， 194,208位canvas中的位置
				this.ctx.drawImage(
					RESOURCE_IMAGE,
					POS["stageLevel"][0], POS["stageLevel"][1],
					78, 14,
					194, 208,
					78, 14
				);
				//14为数字的宽和高， 308,208位canvas中的位置
				this.levelNum.draw(this.level, 308, 208);
				
				//绘制地图，调用main里面的方法
				initMap();
			}
		}
	}
}
