function Explosion(){
	this.x;
	this.y;
	this.count = 0;
	this.i = 1;
}


Explosion.prototype = {

	draw: function(dt) {
		this.count+=dt;
		ctx.save();
		ctx.translate(this.x, this.y);

		if(this.count<=0.75*this.i){
			ctx.drawImage(images[this.i-1],-20,-20,40,40)
		} else {
			this.i++;
			if(this.i<8){
				ctx.drawImage(images[this.i-1],-20,-20,40,40)
			}
			else{
				var n = explosions.indexOf(this);
				explosions.splice(n,1);
			}

		}
	    ctx.restore();
	}
}