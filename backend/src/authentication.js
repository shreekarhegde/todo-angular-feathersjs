/* eslint-disable no-console */
/* eslint-disable quotes */
const authentication = require("@feathersjs/authentication");
const jwt = require("@feathersjs/authentication-jwt");
const local = require("@feathersjs/authentication-local");
let id = "";
module.exports = function(app) {
  const config = app.get("authentication");

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)

  app.service("authentication").hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies),

        context => {
          context.params.payload = context.params.payload || {};
          Object.assign(context.params.payload, { test: "test" });
        }
      ],
      remove: [authentication.hooks.authenticate("jwt")]
    },
    after: {
      create: [
        context => {
          id = context.params.user._id;
        },
        hook => {
          hook.result["id"] = id;
        }
      ]
    }
  });
};
