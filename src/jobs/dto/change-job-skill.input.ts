import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class ChangeJobSkillInput {
  @Field(() => ID)
  @IsUUID()
  jobId!: string;

  @Field(() => ID)
  @IsUUID()
  skillId!: string;
}
