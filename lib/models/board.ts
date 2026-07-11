// Dashboard will have a board -> which will have multiple columns -> which will have multiple job
//Indexing makes querries faster
//This is bi-directional refference model, So board store a refference to column and column store a refference to board and also
// each column stores a array of jobApplications and job applications model stores a refference to column and board. This is done to make querries faster

import mongoose, { Schema, Document } from "mongoose";

export interface IBoard extends Document {
  name: string;
  userId: string;
  columns: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const boardSchema: Schema = new Schema<IBoard>(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    columns: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Column",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Board ||
  mongoose.model<IBoard>("Board", boardSchema);
