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

  describe('Test GET /api/v1/meals', () => {
    test('should return a 200 status and all olympians', () => {
      return request(app).get('/api/v1/olympians').then(response => {
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(3)
      })
    })
  })

})
