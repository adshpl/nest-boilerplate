import { ArgsType, Field } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { ValidationErrorMessages } from 'constants/validation-error-messages';
import { OnlyLettersOrNumbers } from 'validators/only-numbers-or-letters.validator';
import { StrongPassword } from 'validators/strong-password.validator';

const {
  FIELD_MUST_BE_LONGER_OR_EQUAL_TO_3_CHARACTERS,
  FIELD_SHOULD_CONTAIN_ONLY_LETTERS_OR_NUMBERS,
  PASSWORD_TOO_WEAK,
} = ValidationErrorMessages;

const usernameLengthValidationOptions = {
  message: `username:${FIELD_MUST_BE_LONGER_OR_EQUAL_TO_3_CHARACTERS}`,
};
const usernameOnlyLettersOrNumbersValidationOptions = {
  message: `username:${FIELD_SHOULD_CONTAIN_ONLY_LETTERS_OR_NUMBERS}`,
};
const loginLengthValidationOptions = {
  message: `login:${FIELD_MUST_BE_LONGER_OR_EQUAL_TO_3_CHARACTERS}`,
};
const loginOnyLettersOrNumbersValidationOptions = {
  message: `login:${FIELD_SHOULD_CONTAIN_ONLY_LETTERS_OR_NUMBERS}`,
};
const passwordLengthValidationOptions = {
  message: `password:${FIELD_MUST_BE_LONGER_OR_EQUAL_TO_3_CHARACTERS}`,
};
const passwordStrongValidationOptions = {
  message: PASSWORD_TOO_WEAK,
};

@ArgsType()
export class RegisterArgs {
  @Field(() => String)
  @Length(3, 30, usernameLengthValidationOptions)
  @OnlyLettersOrNumbers(usernameOnlyLettersOrNumbersValidationOptions)
  username?;

  @Field(() => String)
  @Length(3, 30, loginLengthValidationOptions)
  @OnlyLettersOrNumbers(loginOnyLettersOrNumbersValidationOptions)
  login?;

  @Field(() => String)
  @Length(3, 30, passwordLengthValidationOptions)
  @StrongPassword(passwordStrongValidationOptions)
  password?;
}
