import { Field, ID, ObjectType } from '@nestjs/graphql';

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

  @Field({ nullable: true })
  dateEnd?: Date;

  @Field()
  achievements!: string;

  @Field()
  createdAt!: Date;

  profileId!: string;
}
