import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // console.log('Log');
    // console.debug('Debug');
    // console.info('info');
    console.warn('Warn');
    console.error('Error');

    return 'Hola, bola!';
  }
}
