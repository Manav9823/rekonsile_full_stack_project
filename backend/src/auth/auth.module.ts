/* eslint-disable prettier/prettier */
// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtCustomModule } from '../jwt/jwt-custom.module';

@Module({
  imports: [JwtCustomModule],
  controllers: [AuthController],
})
export class AuthModule {}
