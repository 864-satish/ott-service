import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TVShowDocument = TVShow & Document;

@Schema()
export class Episode {
  @Prop({ required: true })
  episodeNumber: number;

  @Prop({ required: true })
  seasonNumber: number;

  @Prop({ required: true })
  releaseDate: Date;

  @Prop({ required: true })
  director: string;

  @Prop({ type: [String], default: [] })
  actors: string[];
}

@Schema()
export class TVShow {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  genres: string[];

  @Prop({ type: [Episode], default: [] })
  episodes: Episode[];
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode);
export const TVShowSchema = SchemaFactory.createForClass(TVShow);
