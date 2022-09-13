const Koa = require('koa');
const random = require('another-random-package');
const Game = require('./modules/game');
const cors = require('@koa/cors');
const localTunnel = require('localtunnel');


const port = process.env.PORT || 3000;
const app = new Koa();
const games = new Map();

async function createGame (player) {
    let gameID = random.randomStringAlphaNumeric(10);
    let game = new Game();
    game.addPlayer(player);
    games.set(gameID, game);
    return gameID;
}

async function Router (ctx,next){
    let gameID,game,playerID;

    await next();
    let method = ctx.request.method;


    switch (method) {
        case "GET":
            playerID = random.randomStringLowerCase(10)
            gameID = await createGame(playerID);
            ctx.body = {gameID,playerID};
            break;
        case "PATCH":
            gameID = ctx.request.headers.id;
            game = games.get(gameID);
            ctx.body = game;
            break;
        case "PUT":
            gameID = ctx.request.headers.game;
            playerID = ctx.request.headers.id;
            let move = ctx.request.headers.index;
            game = games.get(gameID);
            game.makeMove(playerID,move);
            ctx.body = game;
            break;
        case "POST":
            playerID = random.randomStringLowerCase(10);
            games.forEach((game,id)=>{
                if(game.available){
                    game.addPlayer(playerID);
                    gameID = id;
                }
            });
            ctx.body = {gameID,playerID};
            break
        default :
            ctx.body = "default";
            break;
    }
}
(async () => {
        const tunnel = await localTunnel({ port: port, subdomain:"wide-experts-serve" });
        app.use(cors())
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
            console.log("Tunnel URL: ", tunnel.url);
        });
        app.use(Router);
        tunnel.on('close', () => tunnel.close());
    }
)()
