import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  ValidateIf,
} from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((_, value) => value !== undefined)
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @ValidateIf((_, value) => value !== undefined)
  description?: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  links?: string[] | null;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills?: string[] | null;
}
