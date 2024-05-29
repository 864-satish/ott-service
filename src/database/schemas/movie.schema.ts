import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  genres: string[];

  @Prop({ required: true })
  releaseDate: Date;

  @Prop({ required: true })
  director: string;

  @Prop({ type: [String], default: [] })
  actors: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
