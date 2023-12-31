import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  Query,
  Get,
  Param,
  Res,
  Header,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CertificatesService } from './certificates.service';
import { CertificateUploadDto } from './dto/certificate-upload.dto';
import { ICurrentUser, User } from 'src/decorators/user.decorator';
import { CertificatesResponses } from './sertificates.responses';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { Response } from 'express';

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

  @Get('byPetId/:petId')
  @CertificatesResponses.certificates
  getCertificatesByPetId(@Param('petId', IdValidationPipe) petId: string) {
    return this.certificatesService.getAllByPetId(petId);
  }

  @Get(':id')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment')
  @ApiResponse({
    status: 200,
    content: {
      'application/pdf': {
        schema: {
          format: 'binary',
        },
      },
    },
  })
  getCertificate(
    @Param('id', IdValidationPipe) id: string,
    @Res() res: Response,
  ) {
    return this.certificatesService.getById(id, res);
  }

  @Delete(':id')
  deleteCertificate(@Param('id', IdValidationPipe) id: string) {
    return this.certificatesService.deleteById(id);
  }
}
