import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { AlertController } from './alert/alert.controller';
import { AlertGateway } from './alert/alert.gateway';
import { ChatGateway } from './chat.gateway';


@Module({
  providers: [ChatService, ChatGateway, AlertGateway],
  controllers: [ChatController, AlertController]
})
export class ChatModule {}
