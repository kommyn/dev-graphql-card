import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class ChangeProfileSkillInput {
  @Field(() => ID)
  @IsUUID()
  profileId!: string;

  @Field(() => ID)
  @IsUUID()
  skillId!: string;
}
