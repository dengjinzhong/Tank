var Map = function(wCtx, gCtx) {
	this.level = 1;
	this.mapLevel = null;
	this.wallCtx = wCtx;
	this.grassCtx = gCtx;

	this.offsetX = 32; //主游戏区的x偏移量
	this.offsetY = 16; //主游戏区的y偏移量
	this.wTileCount = 26;
	this.HTileCount = 26;
	this.tileSize = 16;
	this.homeSize = 32;
	// this.num = new Num(this.wallCtx);
	this.mapWidth = 416;
	this.maoHeight = 416;

	this.setMapLevel = function(level) {
		this.level = level;
		var tempMap = eval("map" + this.level);
		this.mapLevel = new Array();
		for (var i = 0; i < tempMap.length; i++) {
			this.mapLevel[i] = new Array();
			for (var j = 0; j < tempMap[i].length; j++) {
				this.mapLevel[i][j] = tempMap[i][j];
			}
		}
	};

	/**
	 * 绘制地图
	 */

	this.draw = function() {
		this.wallCtx.fillStyle = "#7f7f7f";
		this.wallCtx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
		this.wallCtx.fillStyle = "#000";
		this.wallCtx.fillRect(this.offsetX, this.offsetY, this.mapWidth, this.mapHeight); //主游戏区

		this.grassCtx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

		for (var i = 0; i < this.HTileCount; i++) {
			for (var j = 0; j < this.wTileCount; j++) {
				if (
					this.mapLevel[i][j] === WALL ||
					this.mapLevel[i][j] === GRID ||
					this.mapLevel[i][j] === WATER ||
					this.mapLevel[i][j] === ICE
				) {
					this.wallCtx.drawImage(
						RESOURCE_IMAGE,
						this.tileSize * (this.mapLevel[i][j] - 1) + POS["map"][0], POS["map"][1],
						this.tileSize, this.tileSize,
						j * this.tileSize + this.offsetX, i * this.tileSize + this.offsetY,
						this.tileSize, this.tileSize
					);
				} else if (this.mapLevel[i][j] == GRASS) {
					this.grassCtx.drawImage(
						RESOURCE_IMAGE,
						this.tileSize * (this.mapLevel[i][j] - 1) + POS["map"][0], POS["map"][1],
						this.tileSize, this.tileSize,
						j * this.tileSize + this.offsetX, i * this.tileSize + this.offsetY, 
						this.tileSize, this.tileSize
					);
				}else if(this.mapLevel[i][j] == HOME) {
					this.wallCtx.drawImage(
						RESOURCE_IMAGE,
						POS["home"][0], POS["home"][1], 
						this.homeSize, this.homeSize, 
						j*this.tileSize + this.offsetX, i*this.tileSize + this.offsetY, 
						this.homeSize, this.homeSize
					);
				}
			}
		}
		
// 		this.drawNoChange();
// 		this.drawEnemyNum(maxEnemy);
// 		this.drawLevel();
// 		this.drawLives(0,1);
// 		this.drawLives(0,2);
	}
}
