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

const populateAuthor = {
  path: 'author',
  select: {
    passwordHash: false,
    pets: false,
  },
};

@Injectable()
export class ChatMessagesRepository {
  constructor(
    @InjectModel(ChatMessages.name)
    private readonly chatMessagesModel: PaginateModel<Model<ChatMessages>>,
  ) {}

  async create(dto: CreateChatMessageDto) {
    const created = await this.chatMessagesModel.create(dto);

    return created.populate(populateAuthor);
  }

  edit(dto: UpdateChatMessageDto) {
    return this.chatMessagesModel
      .findOneAndUpdate(
        { author: dto.author, chatId: dto.chatId },
        { text: dto.text },
        { new: true },
      )
      .select({ author: false });
  }

  delete(id: string, authorId: string) {
    return this.chatMessagesModel
      .findOneAndDelete({
        _id: id,
        author: authorId,
      })
      .select({ author: false });
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
        populate: populateAuthor,
      },
    );

    return res;
  }

  async getNewestMessage(chatId: string) {
    return this.chatMessagesModel
      .findOne({ chatId })
      .sort({
        createdAt: -1,
      })
      .exec();
  }
}
