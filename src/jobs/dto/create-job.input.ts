import { InputType, Field, ID } from '@nestjs/graphql';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateBy,
  IsArray,
} from 'class-validator';

@InputType()
export class CreateJobInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  jobTitle!: string;

  @Field()
  @IsDate()
  dateStart!: Date;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @ValidateBy({
    validator: {
      validate: (value, args) => {
        if (!value) return true;

        const object = args?.object as CreateJobInput;
        return value >= object.dateStart;
      },
      defaultMessage: () =>
        "End date of the job cannot be lesser than it's start date",
    },
    name: 'test',
  })
  @IsOptional()
  dateEnd?: Date | null;

  @Field()
  @IsString()
  achievements!: string;

  @Field(() => ID)
  @IsUUID()
  profileId!: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills?: string[] | null;
}
