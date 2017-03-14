/** ******************************************************** *
 *  NOTE THAT THE IO VAR IS IMPORTED FROM CODE ON THE SERVER
 *  ******************************************************** */
var SOCKET = io.connect("http://76.28.150.193:8888");

SOCKET.on("load", function (data) {
    // the "main" code begins here
    console.log(data); // test print to make sure that data is being received properly
    var rects = data.data.circle;
    var balls = data.data.background;
    // clear game engine's entities list of balls and rects
    // for (var k = 0; k < gameEngine.entities.length; k++) {
    //     var ent = gameEngine.entities[k];
    //     if (ent instanceof Circle || ent instanceof Background) ent.removeFromWorld = true;
    // }
    gameEngine.entities = [];
    gameEngine.balls = [];
    gameEngine.rects = [];
    // add rectangles
    for (var i = 0; i < rects.length; i++) {
        var curr = rects[i];
        var r = new Circle(gameEngine, curr.x,  curr.colidBottomY, curr.colidTopY, curr.startTopY, curr.startX, curr.startBottomY, curr.goingUp,
                            curr.goingDown, curr.speedDown, curr.downGravity, curr.velocityUpY, curr.switchGravity);

            // curr.velocityDown, curr.velocityUp,
            // curr.colidBottomY, curr.colidTopY, curr.startTopY, curr.startX, curr.startBottomY, curr.goingUp, 
            // curr.goingDown, curr.speedDown, curr.speedDown, curr.speedTop, curr.downEvalution, curr.speed, 
            // curr.switchGravity);
        // var r = new Circle(gameEngine, curr.x, curr.y, curr.radius);
        gameEngine.entities.push(r);
        // gameEngine.rects.push(r);
    }
    // add billiard balls
    for (var j = 0; j < balls.length; j++) {
        var curr = balls[j];
        // var b = new Background(gameEngine, curr.spritesheet);
        // gameEngine.entities.push(b);
        // gameEngine.balls.push(b);
    }
});

// for saving & loading game state
var GAME_DATA = {studentname: "Mohib Kohi", statename: "HW2State"};

var saveGameState = function () {
    GAME_DATA.data = {};
    GAME_DATA.data.circle = [];
    GAME_DATA.data.background = [];

    for (var i = 0, j = 0, k = 0, len = gameEngine.entities.length; i++) {
        var ent = gameEngine.entities[i];
        if (ent instanceof Circle) {
            GAME_DATA.data.circle[j++] = {x: ent.x, colidBottomY: ent.colidBottomY, colidTopY: ent.colidTopY,
                                        startTopY: ent.startTopY, startX: ent.startX, startBottomY: ent.startBottomY, goingUp: ent.goingUp, 
                                        goingDown: ent.goingDown, speedTop: ent.speedTop, downGravity: ent.downGravity, velocityDownY: ent.velocityDownY,
                                        velocityUpY: ent.velocityUpY, switchGravity: ent.switchGravity};

                    //                     game, x, colidBottomY, colidTopY, startTopY, startX, startBottomY, goingUp,
                    // goingDown, speedDown, speedTop, downGravity, velocityDownY, velocityUpY, switchGravity) 
        } else if (ent instanceof Background) {
            GAME_DATA.data.background[k++] = {spritesheet: ent.spritesheet};
        }
    }
    SOCKET.emit("save", GAME_DATA);
};

var loadGameState = function () {
    SOCKET.emit("load", {studentname: "Mohib Kohi", statename: "HW2State"});
};
