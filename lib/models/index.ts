//To make dashboard models imports easier, we can create an index.ts file that exports all the models from the models directory.
// This way, we can import the models from a single file instead of importing them individually from their respective files.

import "./board";
import "./column";
import "./job-application";

export { default as Board } from "./board";
export { default as Column } from "./column";
export { default as JobApplication } from "./job-application";
