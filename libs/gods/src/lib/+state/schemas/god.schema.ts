
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GodDocument = God & Document;

@Schema()
export class God {
  @Prop()
  godId!: string;

  @Prop()
  name!: string;

  @Prop()
  title!: string;

  @Prop()
  type!: string;  // Melee, ranged

  @Prop()
  dmgType!: string; // Physical, magical

  @Prop()
  role!: string;

  @Prop()
  latestGod!: boolean;

  @Prop()
  godIcon_URL!: string;

  @Prop()
  godCard_URL!: string;
}

export const GodSchema = SchemaFactory.createForClass(God);