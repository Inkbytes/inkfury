// game class
export class Game{
	gameId: number;
	p1Id: number;
	p2Id: number;
	
	constructor(gameid: number, p1id: number, p2id: number){
		this.gameId = gameid;
		this.p1Id = p1id;
		this.p2Id = p2id;
	}

	debug() {
		console.log(`gameId: ${this.gameId}`);
		console.log(`p1Id: ${this.p1Id}`);
		console.log(`p2Id: ${this.p2Id}`);
	}

};