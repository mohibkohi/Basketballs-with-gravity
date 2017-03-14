
// GameBoard code below

function distance(a, b) {
    var difX = a.x - b.x;
    var difY = a.y - b.y;
    return Math.sqrt(difX * difX + difY * difY);
};

function Circle(game, x, colidBottomY, colidTopY, startTopY, startX, startBottomY, goingUp,
                    goingDown, speedDown, speedTop, downGravity, velocityDownY, velocityUpY, switchGravity) {
    this.radius = 20;
    // this.colors = ["Red"];

    this.gameEngine = game;
    this.ctx = this.gameEngine.ctx;
    this.colidBottomY = colidBottomY;
    this.colidTopY = colidTopY;

    this.ballImg = ASSET_MANAGER.getAsset("./img/ball.png");
    this.startTopY = startTopY;
    this.startX = x;
    this.startBottomY = startBottomY;

    this.goingUp = goingUp;
    this.goingDown = goingDown;

    this.speedDown  = speedDown;
    this.speedUp = speedTop;

    this.downGravity = downGravity;
    //                         //   x            y 
    Entity.call(this, game, this.startX, this.startTopY);

    this.velocityDown = { x: 0, y: velocityDownY};

    this.velocityUp = { x: 0, y: velocityUpY };

    this.switchGravity = switchGravity;


    console.log("circle = " + this.x+ " " + this.colidBottomY + " " + this.colidTopY + " " + this.startTopY + " " + 
                            this.startX + " " + this.startBottomY+ " " + this.goingUp+ " " +
                            this.goingDown+ " " + this.speedDown+ " " +  this.speedUp+ " " + this.downGravity + " "+
                            this.velocityDown.y+ " " + this.velocityUp.y+ " " +  this.switchGravity);
    this.name = "Circle";
}

Circle.prototype = new Entity();
Circle.prototype.constructor = Circle;

Circle.prototype.collideRight = function () {
    return this.x + this.radius > 800;
};
Circle.prototype.collideLeft = function () {
    return this.x - this.radius < 0;
};
Circle.prototype.collideBottom = function () {
    return this.y + this.radius > 800;
};
Circle.prototype.collideTop = function () {
    return this.y - this.radius < 0;
};

Circle.prototype.collide = function (other) {
    return distance(this, other) < this.radius + other.radius;
};

Circle.prototype.update = function () {
    Entity.prototype.update.call(this);

    if (this.downGravity) {
        // this.x += this.velocityDown.x * 0;
        this.y += this.velocityDown.y * (this.speedDown);

        if (this.collideBottom()) {
            if (this.velocityDown.y > 0){
                this.velocityDown.y = -this.velocityDown.y;
            }

            this.colidBottomY = this.y;
            this.goingUp = true;
            this.startTopY = (this.startTopY + this.colidBottomY ) /2;
        } 

        if(this.startTopY >= (800 - this.radius - 10)) {
            this.velocityDown.y = 0;
            this.speedDown = 0;
            this.goingUp = false;

            var changeDirection = true;
            for (var i = 0; i < this.gameEngine.entities.length; i++) {
                
                if (this.gameEngine.entities[i].name === "Circle") {
                    
                    if(this.gameEngine.entities[i].speedDown != 0) {
                        changeDirection = false;
                    } 
                }
            }
    
            if (changeDirection) {
                this.velocityUp.y = 30;
                var random = Math.round((Math.random() * 1) + 1);
                // if (random < 1 || random > 2) {
                //     console.log("come here");
                // }
                switch (random) {
                case 1:
                    this.speedUp = 0.2;
                    break;
                case 2:
                     this.speedUp = 0.21;
                }
                this.startBottomY = 760;
                this.downGravity = false;
                this.gameEngine.entities.splice(0, 1);
                this.gameEngine.addEntity(new Background(this.gameEngine, ASSET_MANAGER.getAsset("./img/PlatformBackground1.jpg")));
            }
        } else {
            
        }

        if (this.goingUp) {
            if(this.y - 1 < this.startTopY) {
               
                this.velocityDown.y = -this.velocityDown.y;
                this.goingUp = false;
            }
        }

        if ( this.collideTop()) {
           this.velocityDown.y = -this.velocityDown.y;
           this.startTopY = 50;
           this.colidBottomY = 780;
           this.length = 80;
        }

    } else {
        // this.x += this.velocityUp.x * 0;
        if (this.speedUp === undefined) {
            this.speedUp = .02;
        }
        this.y -= this.velocityUp.y * (this.speedUp);


        if (this.collideTop()) {
            this.velocityUp.y = -this.velocityUp.y;
            this.colidTopY = this.y;
            this.goingDown = true;
            this.startBottomY = (this.startBottomY - this.colidTopY ) /2;
        }

        if(this.startBottomY <= (40) || this.y > 780) {

            this.velocityUp.y = 0;
            this.speedUp = 0;
            this.goingDown = false;

            var changeDirection = true;
            for (var i = 0; i < this.gameEngine.entities.length; i++) {
                
                if (this.gameEngine.entities[i].name === "Circle") {
                    
                    if(this.gameEngine.entities[i].speedUp != 0) {
                        changeDirection = false;
                    } 
                }
            }
            if (changeDirection) {
                var random = Math.round((Math.random() * 1) + 1);
                // if (random < 1 || random > 2) {
                //     console.log("come here");
                // }
                switch (random) {
                case 1:
                    this.speedDown = 0.2;
                    break;
                case 2:
                     this.speedDown = 0.21;
                }
                // this.speedDown = 0.2;
                this.velocityDown.y = 30;
                this.downGravity = true;
                this.startTopY = 50;
                this.gameEngine.entities.splice(0, 1);
                this.gameEngine.addEntity(new Background(this.gameEngine, ASSET_MANAGER.getAsset("./img/PlatformBackground.jpg")));
            }
        }

        if (this.goingDown) {
            if(this.y + 1 > this.startBottomY) {
                this.velocityUp.y = -this.velocityUp.y;
                this.goingDown = false;
            }
        }

        if ( this.collideBottom()) {
            if (!this.velocityUp.y < 0) {
                this.velocityUp.y = -this.velocityUp.y;
            }
            this.startBottomY = 760;
            this.colidTopY = 60;
        }
    }
}

function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    this.name = "Background";
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet, this.x, this.y , 1100, 800);
};

Background.prototype.update = function () {
};


Circle.prototype.draw = function () {
    this.ctx.drawImage(this.ballImg, this.x - this.radius, this.y -this.radius, 2 * this.radius, 2 * this.radius);
}

// var friction = 1;
// var acceleration = 10000;
// var maxSpeed = 2000;

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();
var gameEngine = new GameEngine();

var socket = io.connect("http://76.28.150.193:8888");

ASSET_MANAGER.queueDownload("./img/PlatformBackground.jpg");
ASSET_MANAGER.queueDownload("./img/PlatformBackground1.jpg");
ASSET_MANAGER.queueDownload("./img/ball.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    
    // var circle = new Circle(gameEngine);
    gameEngine.init(ctx);
    // gameEngine.addEntity(circle);
    gameEngine.addEntity(new Background(gameEngine, ASSET_MANAGER.getAsset("./img/PlatformBackground.jpg")));

    var startX = 45;
    for (var i = 0; i < 1; i++) {
        circle = new Circle(gameEngine, startX, 60, 60, 40, startX, 
                                760, false, false, 0.2, 0.2, true, 30, 30, false);
        startX += 40;
        gameEngine.addEntity(circle);
    };



    var saveButton = document.getElementById("save").addEventListener("click", function(event) {
        var circleData = {circles: []};
        
        var back = gameEngine.entities[0];
        var background = new Background("", back.spritesheet);
        circleData.circles.push(background);

        for (var i = 1; i < gameEngine.entities.length; i++) {
            var curr = gameEngine.entities[i];

            var circle = new Circle("", curr.x,  curr.colidBottomY, curr.colidTopY, curr.startTopY, 
                            curr.startX, curr.startBottomY, curr.goingUp,
                            curr.goingDown, curr.speedDown,  curr.speedUp, curr.downGravity, 
                            curr.velocityDown.y, curr.velocityUp.y,  curr.switchGravity);

            console.log("save = " + curr.x+ " " + curr.colidBottomY + " " + curr.colidTopY + " " + curr.startTopY + " " + 
                            curr.startX + " " + curr.startBottomY+ " " + curr.goingUp+ " " +
                            curr.goingDown+ " " + curr.speedDown+ " " +  curr.speedUp+ " " + curr.downGravity + " "+
                            curr.velocityDown.y+ " " + curr.velocityUp.y+ " " +  curr.switchGravity);
            circleData.circles.push(circle);

            // (game, x, colidBottomY, colidTopY, startTopY, startX, startBottomY, goingUp,
            //         goingDown, speedDown, speedTop, downGravity, velocityDownY, velocityUpY, switchGravity)
        }
        console.log(circleData);
        //save to server
        socket.emit("save", {studentname: "Mohib Kohi", statename: "Balls dropping thru gravity", data: circleData});
    });

    var loadButton = document.getElementById("load").addEventListener("click", function(event) {
        //tells server to send a load event back to us
        socket.emit("load", { studentname: "Mohib Kohi", statename: "Balls dropping thru gravity"});
    });

    //listens for server load event and data being passed
    socket.on("load", function (data) {
        gameEngine.removeAllEntities();

        console.log(data);
        var circles = data.data.circles;

        // var back = circles[0];
        // var background = new Background(gameEngine, back.spritesheet);
        // gameEngine.addEntity(background);


        for (var i = 1; i < circles.length; i++) {
            var ent = circles[i];

            var x = ent.x;
            var colidBottomY = ent.colidBottomY;
            var colidTopY = ent.colidTopY; 
            var startTopY = ent.startTopY; 
            var startX = ent.startX;
            var startBottomY = ent.startBottomY;
            var goingUp = ent.goingUp; 
            var goingDown = ent.goingDown;
            var speedDown = ent.speedDown;
            var speedTop = ent.speedUp;
            var downGravity = ent.downGravity;
            var velocityDownY = ent.velocityDown.y;
            var velocityUpY=  ent.velocityUp.y;
            var switchGravity= ent.switchGravity;

            var circle = new Circle(gameEngine, x,  colidBottomY, colidTopY, startTopY, 
                            startX, startBottomY, goingUp, goingDown, speedDown, speedTop, downGravity, 
                            velocityDownY, velocityUpY,  switchGravity);

            console.log("Load = " + x+ " " + colidBottomY + " " + colidTopY + " " + startTopY + " " + 
                            startX + " " + startBottomY+ " " + goingUp+ " " +
                            goingDown+ " " + speedDown+ " " +  speedTop+ " " + downGravity + " "+
                            velocityDownY+ " " + velocityUpY+ " " +  switchGravity);

            if (i === 1) {    
                if (downGravity) {
                    gameEngine.addEntity(new Background(gameEngine, ASSET_MANAGER.getAsset("./img/PlatformBackground.jpg")));
                } else {
                    gameEngine.addEntity(new Background(gameEngine, ASSET_MANAGER.getAsset("./img/PlatformBackground1.jpg")));
                }
            }
            gameEngine.addEntity(circle);


        }
    });

    socket.on("connect", function () {
        console.log("Socket connected.")
    });
    

    gameEngine.start();
});
