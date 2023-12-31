import { IsString } from 'class-validator';

export class CreateChatMessageDto {
  @IsString()
  text: string;

  @IsString()
  author: string;

  @IsString()
  chatId: string;
}
