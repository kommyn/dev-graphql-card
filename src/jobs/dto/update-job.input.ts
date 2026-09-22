import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsDate,
  ValidateIf,
  IsOptional,
} from 'class-validator';

@InputType()
export class UpdateJobInput {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((_, value) => value !== undefined)
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((_, value) => value !== undefined)
  jobTitle?: string;

  @Field({ nullable: true })
  @IsDate()
  @ValidateIf((_, value) => value !== undefined)
  dateStart?: Date;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  dateEnd?: Date;

  @Field({ nullable: true })
  @IsString()
  @ValidateIf((_, value) => value !== undefined)
  achievements?: string;
}
