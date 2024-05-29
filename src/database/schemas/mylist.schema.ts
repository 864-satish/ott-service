import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MyListDocument = MyList & Document;

@Schema()
export class MyListItem {
  @Prop({ required: true })
  contentId: string;

  @Prop({ required: true })
  type: string;

  @Prop({ default: Date.now })
  addedOn: Date;
}

@Schema()
export class MyList {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: [MyListItem], default: [] })
  items: MyListItem[];
}

export const MyListItemSchema = SchemaFactory.createForClass(MyListItem);
export const MyListSchema = SchemaFactory.createForClass(MyList);
