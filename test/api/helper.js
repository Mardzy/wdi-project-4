process.env.NODE_ENV = 'test';
//chai is an assertion library
const chai = require('chai');

global.should = chai.should();
global.expect = chai.expect;

//for testing api calls
const supertest = require('supertest');
const app = require('../../index');
global.api = supertest(app);
