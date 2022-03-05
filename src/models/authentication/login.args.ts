import { ArgsType, Field } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { ValidationErrorMessages } from 'constants/validation-error-messages';
import { OnlyLettersOrNumbers } from 'validators/only-numbers-or-letters.validator';

const {
  FIELD_MUST_BE_LONGER_OR_EQUAL_TO_3_CHARACTERS,
  FIELD_SHOULD_CONTAIN_ONLY_LETTERS_OR_NUMBERS,
} = ValidationErrorMessages;

const loginLengthValidationOptions = {
  message: `login:${FIELD_MUST_BE_LONGER_OR_EQUAL_TO_3_CHARACTERS}`,
};
const passwordLengthValidationOptions = {
  message: `password:${FIELD_MUST_BE_LONGER_OR_EQUAL_TO_3_CHARACTERS}`,
};

@ArgsType()
export class LoginArgs {
  @Field(() => String)
  @Length(3, 30, loginLengthValidationOptions)
  @OnlyLettersOrNumbers({
    message: `password:${FIELD_SHOULD_CONTAIN_ONLY_LETTERS_OR_NUMBERS}`,
  })
  login;

  @Field(() => String)
  @Length(3, 30, passwordLengthValidationOptions)
  password;
}
