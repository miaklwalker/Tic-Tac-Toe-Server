module.exports = class Game {
    constructor() {
        this.state = {
            board:new Array(9).fill(null),
            players:{player1:null,player2:null},
        }
        this.available = true;
        this.turn = 0
    }
    addPlayer(player) {
        if (this.state.players.player1 === null) {
            this.state.players.player1 = player;
        } else if (this.state.players.player2 === null) {
            this.state.players.player2 = player;
            this.available = false;
        }else{
            throw new Error('Game is full');
        }
    }
    get ActivePlayer() {
        return this.turn % 2 === 0 ? this.state.players.player1 : this.state.players.player2;
    }
    verifyMove(player,position) {
        if (this.state.board[position] === null && player === this.ActivePlayer) {
            return true;
        }
        return false;
    }
    makeMove(player,position) {
        if (this.verifyMove(player,position)) {
            this.state.board[position] = this.turn % 2 === 0 ? 'X' : 'O';
            this.turn++;
            return true;
        }
        return false
    }
}