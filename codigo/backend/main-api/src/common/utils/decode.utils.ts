import { JwtService } from '@nestjs/jwt';

const jwtService = new JwtService();

export function getCustomerIdFromToken(token: string) {
  if (token && token !== '') {
    token = token.replace('Bearer ', '');
    const decodedToken = jwtService.decode(token);
    return decodedToken ? decodedToken['id'] : 0;
  } else {
    return 0;
  }
}

export function getCustomerEmailFromToken(token: string) {
  if (token && token !== '') {
    token = token.replace('Bearer ', '');
    const decodedToken = jwtService.decode(token);
    return decodedToken ? decodedToken['email'] : '';
  } else {
    return '';
  }
}
