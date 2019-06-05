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

// All Olympians Endpoint
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

// Youngest Olympian Endpoint Test
  describe('Test GET /api/v1/olympians?age=youngest', () => {
    test('should return a 200 status and youngest olympians', () => {
      return request(app).get('/api/v1/olympians?age=youngest').then(response => {
        expect(response.status).toBe(200)
        expect(response.body.olympians.length).toBe(1)
        expect(Object.keys(response.body.olympians[0])).toContain('name')
        expect(Object.keys(response.body.olympians[0])).toContain('team')
        expect(Object.keys(response.body.olympians[0])).toContain('age')
        expect(Object.keys(response.body.olympians[0])).toContain('sport')
        expect(Object.keys(response.body.olympians[0])).toContain('total_medals_won')
      })
    })
  })

  // Oldest Olympian Endpoint Test
  describe('Test GET /api/v1/olympians?age=oldest', () => {
    test('should return a 200 status and oldest olympians', () => {
      return request(app).get('/api/v1/olympians?age=oldest').then(response => {
        expect(response.status).toBe(200)
        expect(response.body.olympians.length).toBe(1)
        expect(Object.keys(response.body.olympians[0])).toContain('name')
        expect(Object.keys(response.body.olympians[0])).toContain('team')
        expect(Object.keys(response.body.olympians[0])).toContain('age')
        expect(Object.keys(response.body.olympians[0])).toContain('sport')
        expect(Object.keys(response.body.olympians[0])).toContain('total_medals_won')
      })
    })
  })

// Olympian Stats Endpoint
  describe('Test GET /api/v1/olympian_stats', () => {
    test('should return a 200 status and olympian stats', () => {
      return request(app).get('/api/v1/olympian_stats').then(response => {
        expect(response.status).toBe(200)
        expect(Object.keys(response.body.olympian_stats)).toContain('total_competing_olympians')
        expect(Object.keys(response.body.olympian_stats)).toContain('average_weight')
        expect(Object.keys(response.body.olympian_stats.average_weight)).toContain('unit')
        expect(Object.keys(response.body.olympian_stats.average_weight)).toContain('male_olympians')
        expect(Object.keys(response.body.olympian_stats.average_weight)).toContain('female_olympians')
        expect(Object.keys(response.body.olympian_stats)).toContain('average_age')
      })
    })
  })

  // Events Endpoint
    describe('Test GET /api/v1/events', () => {
      test('should return a 200 status and events', () => {
        return request(app).get('/api/v1/events').then(response => {
          expect(response.status).toBe(200)
          expect(response.body.events.length).toBe(2)
          expect(Object.keys(response.body.events[0])).toContain('sport')
          expect(Object.keys(response.body.events[0])).toContain('events')
        })
      })
    })
})
