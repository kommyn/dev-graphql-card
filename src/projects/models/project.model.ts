import { ID, ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field(() => String, { nullable: true })
  link!: string | null;

  @Field(() => String, { nullable: true })
  achievements!: string | null;

  @Field()
  createdAt!: Date;

  profileId!: string;
}
