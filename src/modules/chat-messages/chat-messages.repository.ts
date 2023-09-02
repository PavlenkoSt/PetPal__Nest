import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ChatMessages } from './schemas/chat-messages.schema';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';

@Injectable()
export class ChatMessagesRepository {
  constructor(
    @InjectModel(ChatMessages.name)
    private readonly chatModel: Model<ChatMessages>,
  ) {}

  create(dto: CreateChatMessageDto) {
    return this.chatModel.create(dto);
  }

  edit(dto: UpdateChatMessageDto) {
    return this.chatModel.findOneAndUpdate(
      { author: dto.author, chatId: dto.chatId },
      { text: dto.text },
      { new: true },
    );
  }

  delete(id: string) {
    return this.chatModel.findByIdAndDelete(id);
  }
}
