/* eslint-disable prettier/prettier */
// jwt.module.ts
import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key', // Change this to a secure secret key
      signOptions: { expiresIn: '1d' }, // Token expiration time
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class JwtCustomModule {}
