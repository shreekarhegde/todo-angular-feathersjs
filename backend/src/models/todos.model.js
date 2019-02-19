/* eslint-disable quotes */
// todos-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const SchemaMongoose = require("mongoose");
  const todos = new Schema(
    {
      caption: { type: String, required: true },
      isCompleted: { type: Boolean, required: true, default: false },
      editing: { type: Boolean, required: true, default: false },
      userID: { type: SchemaMongoose.Types.ObjectId }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model("todos", todos);
};
