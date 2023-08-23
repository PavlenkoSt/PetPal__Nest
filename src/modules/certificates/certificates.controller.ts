import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { CertificatesService } from './certificates.service';
import { CertificateUploadDto } from './dto/certificate-upload.dto';
import { ICurrentUser, User } from 'src/decorators/user.decorator';
import { CertificatesResponses } from './sertificates.responses';

@ApiTags('certificates')
@Controller('certificates')
@ApiBearerAuth()
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload certificate',
    type: CertificateUploadDto,
  })
  @UseInterceptors(FileInterceptor('certificate'))
  @CertificatesResponses.certificateCreated
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: 'pdf',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Query('petId') petId: string,
    @User() currentUser: ICurrentUser,
  ) {
    return this.certificatesService.upload(file, petId, currentUser);
  }
}
