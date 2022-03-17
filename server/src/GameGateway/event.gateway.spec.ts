import { Test, TestingModule } from "@nestjs/testing";
import { GameGateway } from "./event.gateway";

describe('GameGateway', () => {
	let gateway: GameGateway;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [GameGateway],
		}).compile();

		gateway = module.get<GameGateway>(GameGateway);
	});

	it('should be define', () => {
		expect(gateway).toBeDefined();
	});
});