/* eslint-disable prettier/prettier */
// auth.controller.ts
import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import {Response} from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() userDto: { username: string; password: string }, @Res() response: Response) {
    const result: string =  await this.authService.signup(userDto.username, userDto.password);
    // console.log(result)
    if(result === 'invalid'){
        return response.status(400).json({ message: 'Invalid login or password format' });
    }   
    return response.status(201).json({ message: 'User created successfully' });
  }

  @Post('login')
  async login(@Body() userDto: { username: string; password: string},@Res() response: Response) {
    const result =  await this.authService.login(userDto.username, userDto.password);
    // console.log(result)
    if(result === 'Invalid credentials'){
        return response.status(403).json({ message: 'Authentication failed' });
    }
    return response.status(200).json(result);
  }

  @Post('refresh')
  async refresh(@Body() refreshDto: { refreshToken: string }, @Res() response: Response) {
    const result = await this.authService.refresh(refreshDto.refreshToken);
    if(result == 'Invalid refrest token')
        return response.status(403).json({ message: 'Invalid refresh token' });
    return response.status(200).json({ result });
  }
}
