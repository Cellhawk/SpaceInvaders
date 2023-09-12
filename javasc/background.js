function Background(){
	this.fps = 60;
	this.canvas = null;
	this.minVelocity = 10;
	this.maxVelocity = 40;
	this.stars = 150;
	this.intervalId = 0;
}

Background.prototype.initialise = function(div) { 

	var self = this;

this.containerDiv = div;
self.width = window.innerWidth;
self.height = window.innerHeight;

window.addEventListener('resize', function resize(event) {
    self.width = window.innerWidth;
    self.height = window.innerHeight;
    self.canvas.width = self.width;
    self.canvas.height = self.height;
    self.draw(); 
});  

  var canvas = document.createElement('canvas');
    div.appendChild(canvas);
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
};

Background.prototype.start = function() {
 
    var stars = [];
    for(var i=0; i<this.stars; i++) {
        stars[i] = new Star(Math.random()*this.width, Math.random()*this.height, Math.random()*3+1,
        (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
	}
    this.stars = stars; 

    var self = this;
	this.intervalId = setInterval(function() {
		self.update();
		self.draw();	
	}, 1000 / this.fps);
};

Background.prototype.update = function() {
    var dt = 1 / this.fps;
    for(var i=0; i<this.stars.length; i++) {
        var star = this.stars[i];
        star.y += dt * star.velocity;
        if(star.y > this.height) {
            this.stars[i] = new Star(Math.random()*this.width, 0, Math.random()*3+1, 
               (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
        }
    }
};

Background.prototype.draw = function() {
    
    var ctx = this.canvas.getContext("2d");
 
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.width, this.height);
 
    ctx.fillStyle = 'white';
    for(var i=0; i<this.stars.length;i++) {
        var star = this.stars[i];
        ctx.fillRect(star.x, star.y, star.size, star.size);
    }
};  

    function Star(x, y, size, velocity) {
    this.x = x;
    this.y = y; 
    this.size = size;
    this.velocity = velocity;
}