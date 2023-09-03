import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Chat } from './schemas/chats.schema';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatsRepository {
  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
  ) {}

  createChat(dto: CreateChatDto) {
    const { userId, withUserId } = dto;

    return this.chatModel.create({
      participants: [new ObjectId(userId), new ObjectId(withUserId)],
    });
  }

  getChatWithUsers(dto: CreateChatDto) {
    const { userId, withUserId } = dto;

    return this.chatModel.findOne({
      participants: {
        $size: 2,
        $in: [new ObjectId(userId), new ObjectId(withUserId)],
      },
    });
  }

  getAllChatByUserId(userId: string) {
    return this.chatModel
      .find({
        participants: {
          $in: [new ObjectId(userId)],
        },
      })
      .populate('participants', { passwordHash: false, pets: false })
      .populate('lastMessage')
      .exec();
  }

  addMessageToChat(chatId: string, messageId: string) {
    return this.chatModel.findByIdAndUpdate(
      chatId,
      {
        lastMessage: messageId,
      },
      { new: true },
    );
  }
}
