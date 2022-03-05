import { registerDecorator } from 'class-validator';

export const OnlyLettersOrNumbers = (options) => (object: any, propertyName: string) => {
  registerDecorator({
    name: 'OnlyLettersOrNumbers',
    target: object.constructor,
    propertyName,
    options,
    validator: {
      validate(value: string) {
        const regExp = new RegExp('^[\\w.-]{0,19}[0-9a-zA-Z]$');
        return regExp.test(value);
      },
    },
  });
};
