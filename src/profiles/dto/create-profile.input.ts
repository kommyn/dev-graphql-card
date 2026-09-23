import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field()
  @IsString()
  description!: string;

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
