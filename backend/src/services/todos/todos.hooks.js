/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
const { authenticate } = require("@feathersjs/authentication").hooks;

const processTodos = require("../../hooks/process-todos");
/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable no-undef */

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [processTodos()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
