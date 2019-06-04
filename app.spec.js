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
  afterAll(() => {
    shell.exec('npx sequelize db:seed:undo:all')
    shell.exec('npx sequelize db:migrate:undo:all')
  });

  describe('Test GET /api/v1/olympians', () => {
    test('should return a 200 status and all olympians', () => {
      return request(app).get('/api/v1/olympians').then(response => {
        expect(response.status).toBe(200)
        expect(response.body.olympians.length).toBe(3)
        expect(Object.keys(response.body.olympians[0])).toContain('name')
        expect(Object.keys(response.body.olympians[0])).toContain('team')
        expect(Object.keys(response.body.olympians[0])).toContain('age')
        expect(Object.keys(response.body.olympians[0])).toContain('sport')
        expect(Object.keys(response.body.olympians[0])).toContain('total_medals_won')
      })
    })
  })
})
