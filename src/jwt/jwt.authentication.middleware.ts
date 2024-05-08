/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
export class JwtAuthenticationMiddleware implements NestMiddleware {
  logger = new LoggingService()
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        this.logger.error(error)
        return res.status(401).json({ message: 'Invalid token' });
      }
    } else {
      this.logger.error('Missing token')
      return res.status(401).json({ message: 'Missing token' });
    }
    next();
  }
}
