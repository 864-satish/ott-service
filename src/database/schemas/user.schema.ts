import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  username: string;

  @Prop({ type: [String], default: [] })
  favoriteGenres: string[];

  @Prop({ type: [String], default: [] })
  dislikedGenres: string[];

  @Prop({ type: [{ contentId: String, watchedOn: Date, rating: Number }], default: [] })
  watchHistory: Array<{ contentId: string; watchedOn: Date; rating?: number }>;
}

export const UserSchema = SchemaFactory.createForClass(User);
