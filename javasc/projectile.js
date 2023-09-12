function Projectile() {
	this.x = scene[0].x-1
	this.y = scene[0].y-20
	this.dy = 10
}

Projectile.prototype = {
	move: function() {
			this.y = this.y - this.dy;
			if(this.y<=0){
				projectile=null;
			}
			for(var i=1; i<scene.length; i++){
				if(this.y <= scene[i].y+20 && this.y >= scene[i].y-20 && this.x <= scene[i].x+15 && this.x >= scene[i].x-15){
					var expl = new Explosion();
					expl.x = scene[i].x;
					expl.y = scene[i].y;
					explosions.push(expl)
					scene.splice(i,1);
					projectile=null;
					var explode = new Audio();
					explode.src="sound/explosion.wav";
					explode.play();
					explode.volume = 0.2;
					score+=100;
					return;
				}
			}
		},

	draw: function() {
		ctx.beginPath();
		ctx.fillStyle = "lightblue";
		ctx.rect(this.x,this.y,3,10);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}
}