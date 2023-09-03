import { IsString } from 'class-validator';

export class DeleteMessageDto {
  @IsString()
  chatId: string;

  @IsString()
  messageId: string;
}
