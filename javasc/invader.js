function Invader(k,l) {
	this.image = new Image();
	var randomInvader = Math.floor(Math.random() * 16) + 1;
	this.image.src = `img/invaders/invader${randomInvader}.png`;
	this.x = 30 + (40*k);
  	this.y = 30 + (40*l);
	this.dx = 1.5 + 0.1*level;
	this.dy = 15;
}

Invader.prototype = {
	move: function() {
		if (this.x >= canvas.width-20 || this.x <= 20) { 
			this.dx *= -1;
			this.speed *= -1;
			this.y = this.y + this.dy;
		}
		this.x = this.x + this.dx;
		if (this.y >= scene[0].y-40){
			isend = 1;
			var x = scene.length;
			for(var m=1; m<x; m++){
   				scene.splice(1,1);
    		}
		}
	},

	draw: function() {
		ctx.save()
	    ctx.translate(this.x, this.y)
	    ctx.scale(this.size,this.size)
	    ctx.drawImage(this.image,-20,-20,40,40)
	    ctx.restore()
	}
}