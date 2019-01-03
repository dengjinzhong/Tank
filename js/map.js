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
	this.num = new Num(this.wallCtx);
	this.mapWidth = 416;
	this.mapHeight = 416;

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
		this.wallCtx.fillStyle = "#000000";
		this.wallCtx.fillRect(this.offsetX, this.offsetY, this.mapWidth, this.mapHeight); //主游戏区


		this.grassCtx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
		
		var img = RESOURCE_IMAGE;
		var sx,sy;
		var swidth,sheight;
		var x,y;
		var width,height;

		for (var i = 0; i < this.HTileCount; i++) {
			for (var j = 0; j < this.wTileCount; j++) {
				if (
					this.mapLevel[i][j] === WALL ||
					this.mapLevel[i][j] === GRID ||
					this.mapLevel[i][j] === WATER ||
					this.mapLevel[i][j] === ICE ||
					this.mapLevel[i][j] === GRASS
				) {
					//依次画木墙、铁墙、草地、沼泽、雪地（定位坐标 （0 + 16, 96））
					sx = this.tileSize * (this.mapLevel[i][j] - 1) + POS["map"][0];
					sy = POS["map"][1];
					swidth = sheight = width = height = this.tileSize;
					x = j * this.tileSize + this.offsetX;
					y = i * this.tileSize + this.offsetY;
					this.wallCtx.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
				}else if (this.mapLevel[i][j] == HOME) {
					//巢穴位置（256， 0）
					sx = POS["home"][0];
					sy =  POS["home"][1];
					swidth = sheight = width = height = this.homeSize;
					x = j*this.tileSize + this.offsetX;
					y = i*this.tileSize + this.offsetY;
					this.wallCtx.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
				}
			}
		}
		
		this.drawNoChange();
		this.drawEnemyNum(maxEnemy);
		this.drawLevel();
		this.drawLives(3,1);
		this.drawLives(3,2);
	}
	
	/**
	 * 画固定不变的部分
	 */
	this.drawNoChange = function() {
		this.wallCtx.drawImage(RESOURCE_IMAGE, POS["score"][0], POS["score"][1], 30, 32, 464, 256, 30, 32);//player1
		this.wallCtx.drawImage(RESOURCE_IMAGE, 30 + POS["score"][0], POS["score"][1], 30, 32, 464, 304, 30, 32);//player2
		//30,32旗帜的size, 464, 352旗帜在canvas中位置
		this.wallCtx.drawImage(RESOURCE_IMAGE, 60 + POS["score"][0], POS["score"][1], 30, 32, 464, 352, 32, 30);//画旗帜
	}
	
	/**
	 * 画关卡数
	 */
	this.drawLevel = function() {
		this.num.draw(this.level, 468, 384);
	}
	
	/**
	 * 画右侧敌方坦克数
	 */
	this.drawEnemyNum = function(enemyNum){
		var x = 466;
		var y = 34;
		var enemySize = 16;
		for(var i=1;i<=enemyNum;i++){
			var tempX = x;
			var tempY = y + parseInt((i+1)/2)*enemySize;
			if(i%2 == 0){
				tempX = x  + enemySize;
			}
			this.wallCtx.drawImage(
				RESOURCE_IMAGE,
				92 + POS["score"][0],POS["score"][1],
				14, 14,
				tempX, tempY,
				14, 14
			);
		}
	};
	
	/**
	 * 画右侧方敌方坦克数
	 * @param totolEnemyNum 敌方坦克的总数
	 * @param enemyNum 已出现的敌方坦克数
	 */
	this.clearEnemyNum = function(totolEnemyNum, enemyNum) {
		var x = 466;
		var y = 34 + this.offsetY;
		if(enemyNum <= 0){
			return;
		}
		var enemySize = 16;
		this.wallCtx.fillStyle = "#7f7f7f";
		var tempX = x + (enemyNum % 2) * enemySize;
		var tempY = y + (Math.ceil(totolEnemyNum/2)-1)*enemySize - (parseInt((enemyNum-1)/2))*enemySize;
		this.wallCtx.fillRect(tempX,tempY,14,14);
	}
	
	/**
	 * 画坦克的生命数
	 * @param lives 生命数
	 * @param which 坦克索引， 1、代表玩家1 2、代表玩家2
	 */
	this.drawLives = function(lives, which) {
		var x = 482;
		var y = 272;
		if(which == 2) {
			y = 320;
		}
		this.wallCtx.fillStyle = "#7f7f7f";
		this.wallCtx.fillRect(x, y, this.num.size, this.num.size);
		this.num.draw(lives, x, y);
	}
	
	/**
	 * 更新地图
	 * @param indexArr 需要更新的地图索引数组，二维数组，如[[1,1],[2,2]]
	 * @param target 更新之后的数值
	 */
	this.updateMap = function(indexArr, target) {
		if(indexArr != null && indexArr.length > 0) {
			var indexSize = indexArr.length;
			for (var i = 0; i < indexSize; i++) {
				var index = indexArr[i];
				this.mapLevel[index[0]][index[1]] = target;
				if(target > 0) {
					this.wallCtx.drawImage(
					    RESOURCE_IMAGE,
						this.tileSize*(target-1) + POS["map"][0], POS["map"][1],
						this.tileSize,this.tileSize,index[1]*this.tileSize + this.offsetX, 
						index[0]*this.tileSize + this.offsetY,
						this.tileSize,this.tileSize
					);
				}else {
					this.wallCtx.fillStyle = "#000";
					this.wallCtx.fillRect(
						index[1]*this.tileSize + this.offsetX, index[0]*this.tileSize + this.offsetY,
						this.tileSize,this.tileSize
					);
				}
			}
		}
	}
	
	/**
	 * 巢穴被打后
	 */
	this.homeHit = function(){
		this.wallCtx.drawImage(
			RESOURCE_IMAGE,
			POS["home"][0]+this.homeSize, POS["home"][1], 
			this.homeSize, this.homeSize, 
			12*this.tileSize + this.offsetX, 24*this.tileSize + this.offsetY, 
			this.homeSize, this.homeSize
	    );
	};
}
