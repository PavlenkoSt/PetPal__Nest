import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';

import { ChatMessages } from './schemas/chat-messages.schema';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';
import { PaginationDto } from 'src/utilts/dto/PaginationDto';
import {
  DEFAULT_PAGE_LENGTH,
  DEFAULT_PAGE_NUMBER,
} from 'src/utilts/constants/pagination.contants';

@Injectable()
export class ChatMessagesRepository {
  constructor(
    @InjectModel(ChatMessages.name)
    private readonly chatMessagesModel: PaginateModel<Model<ChatMessages>>,
  ) {}

  create(dto: CreateChatMessageDto) {
    return this.chatMessagesModel.create(dto);
  }

  edit(dto: UpdateChatMessageDto) {
    return this.chatMessagesModel.findOneAndUpdate(
      { author: dto.author, chatId: dto.chatId },
      { text: dto.text },
      { new: true },
    );
  }

  delete(id: string) {
    return this.chatMessagesModel.findByIdAndDelete(id);
  }

  async getMessages(chatId: string, paginationObj: PaginationDto) {
    const options = {
      page: paginationObj.pageNumber || DEFAULT_PAGE_NUMBER,
      limit: paginationObj.pageLength || DEFAULT_PAGE_LENGTH,
    };

    const res = await this.chatMessagesModel.paginate(
      {
        chatId: new ObjectId(chatId),
      },
      {
        ...options,
        populate: {
          path: 'author',
          select: {
            passwordHash: false,
            pets: false,
          },
        },
      },
    );

    return res;
  }
}
