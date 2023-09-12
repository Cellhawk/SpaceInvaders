function Button(a,b){
	this.img=new Image();
	this.img.src = 'img/menu/newgame.png';
	this.img.src = 'img/menu/soundon.png';
	this.img.src = 'img/menu/soundoff.png';
	this.img.src = 'img/menu/continuegame.png';

	switch(a) {
    case 0: //newgame
        this.x=canvas.width/4;
        this.y=canvas.height/2;
        break;
    case 1: //pause
        this.x=canvas.width/4;
        this.y=canvas.height/2;
        break;
    case 2: //endgame
		this.x=canvas.width/4;
        this.y=canvas.height/2;
    	break;   
	}
}

Button.prototype = {
	move: function() {
		for(var i=1; i<scene.length; i++){
			if(projectile.y <= scene[i].y+20 && projectile.y >= scene[i].y-20 && projectile.x <= scene[i].x+15 && projectile.x >= scene[i].x-15){
				var expl = new Explosion();
				expl.x = scene[i].x;
				expl.y = scene[i].y;
				explosions.push(expl)
				for(this.y; this.y>=0; this.y--)
					this.x--;
				scene.splice(i,1);
				projectile=null;
				return;
			}
		}
	},

	draw: function() {
		ctx.save()
	    ctx.translate(this.x, this.y)
	    ctx.scale(this.size,this.size)
	    ctx.drawImage(this.newgame,-20,-20,40,40)
	    ctx.restore()
	}
}