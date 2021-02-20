const mongoose = require("mongoose");

// @schema model for create Author
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
const AuthorSchema = mongoose.Schema(Schema);

// @check if User exisits or Not
AuthorSchema.pre("save", (next) => {
  Author.find({ email: this.email }, (err, docs) => {
    if (!docs.length) {
      next();
    } else {
      next(new Error("Author exsits"));
    }
  });
});

const Author = mongoose.model(CollectionName, AuthorSchema);

module.exports = Author;
