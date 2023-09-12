function Ship() {
	this.shipFrames = [];
    for (let i = 1; i <= 11; i++) {
        const image = new Image();
        image.src = `img/player/ship${i}.png`;
        this.shipFrames.push(image);
    }
	this.image = this.shipFrames[0]
	this.frameIndex = 0;
	this.animationSpeed = 0.1;
	this.x = 400;
	this.y = 470;
	this.dx = 10;
	this.i = 0;
}

Ship.prototype = {
	move: function() {
		if ((behave.isDown(behave.RIGHT) || behave.isDown(behave.RIGHTARROW)) && this.x <= (canvas.width-30)){
			this.x = this.x + this.dx;
			this.animate();
		}
		if ((behave.isDown(behave.LEFT) || behave.isDown(behave.LEFTARROW)) && this.x >= (0+30)){
			this.x = this.x - this.dx;
			this.animate();
		}
		if(behave.isDown(behave.SHOOT)){
			if(projectile==null){
				var shoot = new Audio();
				shoot.src="sound/shot.wav";
				shoot.play();
				shoot.volume = 0.3;
    			projectile = new Projectile();
    		}
		}
	},	

	animate: function() {
        this.frameIndex += this.animationSpeed;
        if (this.frameIndex >= this.shipFrames.length) {
            this.frameIndex = 0;
        }
        this.image = this.shipFrames[Math.floor(this.frameIndex)];
    },

	draw: function(dt) {
		ctx.save()
	    ctx.translate(this.x, this.y)
	    ctx.scale(this.size,this.size)
	    ctx.drawImage(this.image,-20,-20,40,40)
	    ctx.restore()
	}
}