import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from '../entities/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity])],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})

export class ChatModule {}
