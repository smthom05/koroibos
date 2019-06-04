const shell = require('shelljs');
const request = require("supertest");
const app = require('./app');
const pry = require('pryjs')

describe('Olympics API', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  });
})
