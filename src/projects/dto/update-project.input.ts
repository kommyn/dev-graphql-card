import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';

@InputType()
export class UpdateProjectInput {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((_, value) => value !== undefined)
  name?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  link?: string | null;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  achievements?: string | null;
}
