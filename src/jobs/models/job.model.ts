import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Job {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  jobTitle!: string;

  @Field()
  dateStart!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  dateEnd!: Date | null;

  @Field()
  achievements!: string;

  @Field()
  createdAt!: Date;

  profileId!: string;
}
