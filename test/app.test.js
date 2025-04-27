const request = require('supertest');
const express = require('express');
const path = require('path');

let app;

// Setup server baru sebelum tiap test
beforeEach(() => {
  app = express();
  app.use(require('cors')());
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
});

describe('GET /', () => {
  it('should respond with HTML content', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/html/);
    expect(response.text).toContain('<!DOCTYPE html>');
  });
});
