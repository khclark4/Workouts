
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
      day: {
        type: Date,
        default: () => new Date()
      },
      exercises: [
        {
          type: {
            type: String,
            trim: true,
            required: "Enter an exercise type"
          },
          name: {
            type: String,
            trim: true,
            required: "What is the exercise called?"
          },
          duration: {
            type: Number,
            required: "How long did the exercise last? (Minutes)"
          },
          weight: {
            type: Number
          },
          reps: {
            type: Number
          },
          sets: {
            type: Number
          },
          distance: {
            type: Number
          }
        }
      ]
    },
    {
      toJSON: {
        // include any virtual properties when data is requested
        virtuals: true
      }
    }
  );
  
  // adds a dynamically-created property to schema
  workoutSchema.virtual("totalDuration").get(function () {
    // "reduce" array of exercises down to just the sum of their durations
    return this.exercises.reduce((total, exercise) => {
      return total + exercise.duration;
    }, 0);
  });
  
  const Workout = mongoose.model("Workout", workoutSchema);
  
module.exports = Workout;