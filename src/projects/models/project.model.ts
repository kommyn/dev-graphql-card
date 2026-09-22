import { ID, ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  link?: string;

  @Field()
  createdAt!: Date;

  profileId!: string;
}
