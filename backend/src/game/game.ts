// game class
export class Game{
	gameId: number;
	p1Id: number;
	p2Id: number;
	p1Score: number;
	p2Score: number;

	posted: number;
	
	constructor(gameid: number){
		this.gameId = gameid;
		this.p1Id = 0;
		this.p2Id = 0;
		this.p1Score = 0;
		this.p2Score = 0;
		this.posted = 0;
	}
};


let	update_score = (game_array: Game [], gameId: number, p1sc: number, p2sc: number) => {
	for (let i = 0; i < game_array.length; i++){
		if (game_array[i].gameId === gameId){
			game_array[i].p1Score = p1sc;
			game_array[i].p2Score = p2sc;
		}
	}
}

export default update_score;