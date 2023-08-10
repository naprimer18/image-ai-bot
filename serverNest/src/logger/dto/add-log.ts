import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddLogsInput {
  @Field()
  name: string;

  @Field()
  message: string;
}
