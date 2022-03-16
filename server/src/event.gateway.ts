import {SubscribeMessage} from '@nestjs/websockets';
import { MessageBody } from '@nestjs/websockets';
import '@nestjs/websockets';

@WebsocketGateway(1337, {cors: {origin: '*',}})

@SubscribeMessage('events')
handleEvent(@MessageBody() data: string): string{
	return data;
}
