import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Register {
  @Field(() => String)
  id: string;

  @Field(() => String)
  username: number;

  @Field(() => String)
  login: string;

  @Field(() => String)
  createdAt: string;
}
