import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveTaskInput {
  @Field()
  id: number;
}
