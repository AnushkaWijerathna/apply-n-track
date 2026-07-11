import mongoose, { Schema, Document } from "mongoose";

export interface IColumn extends Document {
  name: string;
  boardId: mongoose.Types.ObjectId;
  order: number; // Order of columns in the board, so wish list is default no. 1
  jobApplications: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const columnSchema: Schema = new Schema<IColumn>(
  {
    name: {
      type: String,
      required: true,
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      /* Reference to the Board model*/
      ref: "Board",
      required: true,
      index: true,
    },

    order: {
      type: Number,
      required: true,
      default: 0,
    },
    jobApplications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobApplication",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Column ||
  mongoose.model<IColumn>("Column", columnSchema);
