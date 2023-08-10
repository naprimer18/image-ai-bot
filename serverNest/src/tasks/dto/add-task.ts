import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddTaskInput {
  @Field()
  name: string;

  @Field()
  message: string;
}
