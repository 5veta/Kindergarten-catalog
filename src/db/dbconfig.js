import dotenv from 'dotenv';
dotenv.config();

const { Pool } = require('pg');

export const pool = new Pool({
  host: 'localhost',
  database:process.env.DATABASE,
  user:process.env.USER_CLIENT,
  password:process.env.PASSW,  
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});


export const pooladm = new Pool({
  host: 'localhost',
  database:process.env.DATABASE,
  user:process.env.USER_ADM,
  password:process.env.PASSW_ADM,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});