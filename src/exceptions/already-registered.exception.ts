import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationErrorMessages } from 'constants/validation-error-messages';

export class AlreadyRegisteredException extends HttpException {
  constructor() {
    const { USER_ALREADY_REGISTERED } = ValidationErrorMessages;
    super(USER_ALREADY_REGISTERED, HttpStatus.CONFLICT);
  }
}
