const mongoose = require("mongoose");

// @schema model for create User
const Schema = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
};

// @set collection name and Schema
const CollectionName = "Author";
const UserSchema = mongoose.Schema(Schema);

// @check if User exisits or Not
UserSchema.pre("save", (next) => {
  Author.find({ email: this.email }, (err, docs) => {
    if (!docs.length) {
      next();
    } else {
      next(new Error("User exsits"));
    }
  });
});

const Author = mongoose.model(CollectionName, UserSchema);

module.exports = Author;
