import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationErrorMessages } from 'constants/validation-error-messages';

export class UserNotFoundOrPasswordDoesNotMatchException extends HttpException {
  constructor() {
    const { USER_NOT_FOUND_OR_PASSWORD_DOES_NOT_MATCH } = ValidationErrorMessages;
    super(USER_NOT_FOUND_OR_PASSWORD_DOES_NOT_MATCH, HttpStatus.CONFLICT);
  }
}
