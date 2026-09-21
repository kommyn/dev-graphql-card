import { ID, ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Profile {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;
}
