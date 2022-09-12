const Game = require('../modules/game');

describe('A Game of Tic Tac Toe', () => {
    let game;
    beforeEach(()=>{
        game = new Game();
    })
    it("should track the state of the game in a 9 X 1 array", () => {
        expect(game.state.board).toEqual(new Array(9).fill(null));
    });
    it("should track its current player", () => {
        expect(game.state.players).toEqual({player1: null, player2: null});
    })
    describe("Add Players to the game", () => {
        it("should be able to add a player to the game", () => {
            game.addPlayer("Michael Walker");
            expect(game.state.players.player1).toEqual("Michael Walker");
        })
        it("should be able to add a player to the game", () => {
            game.addPlayer("Michael Walker");
            game.addPlayer("Another player");
            expect(game.state.players.player2).toEqual("Another player");
        })
        it("should not be able to add more than 2 players to the game", () => {
            game.addPlayer("Michael Walker");
            game.addPlayer("Another player");
            expect(() => game.addPlayer("Another player")).toThrow();
        });
        
    })
    describe("making a move", () => {
        it("should be able to make a move", () => {
            game.addPlayer("Michael Walker");
            game.addPlayer("Another player");
            game.makeMove("Michael Walker",0);
            expect(game.state.board[0]).toEqual("X");
        })
        it("should not allow a player to make a move if it is not their turn", () => {
            game.addPlayer("Michael Walker");
            game.addPlayer("Another player");
            game.makeMove("Another player",0);
            expect(game.state.board[0]).toEqual(null);
        })
        it("should not allow a player to make a move if the position is already taken", () => {
            game.addPlayer("Michael Walker");
            game.addPlayer("Another player");
            game.makeMove("Michael Walker",0);
            game.makeMove("Another player",0);
            expect(game.state.board[0]).toEqual("X");
        })
        it("place the correct symbol on the board", () => {
            game.addPlayer("Michael Walker");
            game.addPlayer("Another player");
            game.makeMove("Michael Walker",0);
            game.makeMove("Another player",1);
            expect(game.state.board).toEqual(["X","O",null,null,null,null,null,null,null]);
        })
    })
    describe("verify a move", () => {
        it("should verify a move", () => {
            game.addPlayer("Michael Walker");
            game.addPlayer("Another player");
            expect(game.verifyMove("Michael Walker",0)).toEqual(true);
        })
        it("should not verify a move if it is not the players turn", () => {
            game.addPlayer("Michael Walker");
            game.addPlayer("Another player");
            expect(game.verifyMove("Another player",0)).toEqual(false);
        })
        it("should not verify a move if the position is already taken", () => {
            game.addPlayer("Michael Walker");
            game.addPlayer("Another player");
            game.makeMove("Michael Walker",0);
            expect(game.verifyMove("Another player",0)).toEqual(false);
        })
    })
    describe("get the active player", () => {
        it("should get the active player", () => {
            game.addPlayer("Michael Walker");
            game.addPlayer("Another player");
            expect(game.ActivePlayer).toEqual("Michael Walker");
        })
        it("should get the active player", () => {
            game.addPlayer("Michael Walker");
            game.addPlayer("Another player");
            game.makeMove("Michael Walker",0);
            expect(game.ActivePlayer).toEqual("Another player");
        })
    })

})