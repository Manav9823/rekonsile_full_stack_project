/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoggingService } from 'src/logging/logging.service';
require('dotenv').config()

// Secret key for JWT signing
const JWT_SECRET = process.env.JWT_SECRET;

@Injectable()
export class AuthService {
  private users = []; // Array to store users

  constructor(private readonly jwtService: JwtService) {}
  logger = new LoggingService()

  async signup(username: string, password: string): Promise<string> {
    // console.log(username)
    // console.log(password)
    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
        this.logger.error('Invalid credentials')
        return 'invalid'
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: this.users.length + 1, username, password: hashedPassword };
    // console.log(user)
    this.users.push(user);
    return 'successful'
  }

  async login(username: string, password: string) {
    // console.log(username)
    // console.log(password)
    const user = this.users.find(u => u.username === username);
    // console.log(user)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      this.logger.error('Invalid credentials')
      return ('Invalid credentials');
    }
    const accessToken = jwt.sign({ username: username }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ username: username }, JWT_SECRET, { expiresIn: '1h' });
    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    return new Promise ((resolve) => {
        jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
            if (err) {
              this.logger.error('Invalid refresh token')
              resolve ('Invalid refrest token')
            }
    
            if (typeof decoded === 'string') {
                return { message: 'Invalid refresh token' };
            }
            const accessToken = jwt.sign({ username: decoded.username }, JWT_SECRET, { expiresIn: '15m' });
            const refreshToken = jwt.sign({ username: decoded.username }, JWT_SECRET, { expiresIn: '1 hr' });
            resolve ({accessToken, refreshToken})
        });
    })
  }
}
