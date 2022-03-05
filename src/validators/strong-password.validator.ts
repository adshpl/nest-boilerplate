import { registerDecorator } from 'class-validator';

export const StrongPassword = (options) => (object: any, propertyName: string) => {
  registerDecorator({
    name: 'StrongPassword',
    target: object.constructor,
    propertyName,
    options,
    validator: {
      validate(value: string) {
        const regExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!#%*?&]{6,30}$');
        return regExp.test(value);
      },
    },
  });
};
