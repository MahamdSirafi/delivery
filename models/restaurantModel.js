const mongoose = require("mongoose");
const Prodeuct = require("./productModel");
const AppError = require("../utils/appError");
const restaurantSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A restaurant must have a owner"],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
    },
    imageCover: {
      type: String,
      required: [true, "A restaurant must have a cover image"],
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: mongoose.Schema.ObjectId,
      ref: "Location",
      required: [true, "restaurant must have a Location."],
    },
    // location: {
    //   type: {
    //     type: String,
    //     default: "Point",
    //     enum: ["Point"],
    //   },
    //   coordinates: [Number], //[Longitude,Latitude]
    //   region: {
    //     type: String,
    //     required: [true, "A location must have a region"],
    //   },
    //   street: {
    //     type: String,
    //     required: [true, "A location must have a street"],
    //   },
    // },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  }
  // ,{collection:"ll"}
);
// restaurantSchema.index({ location: "2dsphere" });
restaurantSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    try {
      console.log(doc);
      await Prodeuct.deleteMany({ restaurant: doc._id });
    } catch (error) {
      return next(new AppError("error deleting prodeuct", 500));
    }
  }
});
// restaurantSchema.pre("find", async function (next) {
//   this.populate({
//     path: "location",
//     select: "-__v -_id",
//   });
//   next();
// });
const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
