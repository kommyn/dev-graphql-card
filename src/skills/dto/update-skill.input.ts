import { InputType, Field } from '@nestjs/graphql';
import { ValidateIf, IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateSkillInput {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((_, value) => value !== undefined)
  name?: string;
}
