import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(
    file: Express.Multer.File,
    folder = 'english-vocab/vocabularies',
  ): Promise<UploadApiResponse> {
    const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    return cloudinary.uploader.upload(dataUri, {
      folder,
      resource_type: 'image',
    });
  }

  async deleteImage(publicId: string) {
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    });
  }
}