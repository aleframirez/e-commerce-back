const { Schema, model } = require("mongoose");

const CategorieSchema = Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  // Para saber el usuario que lo creo.
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Remove __v and status to protect them
CategorieSchema.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject();
  return data;
};

module.exports = model("Categorie", CategorieSchema);
