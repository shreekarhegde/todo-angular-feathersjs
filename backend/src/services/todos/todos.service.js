/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable quotes */
// Initializes the `todos` service on path `/todos`
// eslint-disable-next-line quotes
const createService = require("feathers-mongoose");
const createModel = require("../../models/todos.model");
const hooks = require("./todos.hooks");

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get("paginate");

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use("todos", createService(options, { multi: true }));
  // Get our initialized service so that we can register hooks

  const todoService = app.service("todos");

  todoService.hooks(hooks);
};
