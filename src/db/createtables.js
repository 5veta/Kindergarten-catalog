import {pool, pooladm} from './dbconfig';

export const createtable=()=>{
    
    pool
    .query(`CREATE TABLE IF NOT EXISTS countries (
            cid serial PRIMARY KEY,
            name text UNIQUE NOT NULL
        )`)
    .then(result =>console.log(`Created table countries ${result}`))
    .catch(err => console.error('Error creating countires table', err.stack));
    
    pool
    .query(`CREATE TABLE IF NOT EXISTS regions (
            rid serial PRIMARY KEY,
            name text NOT NULL,
            cid integer REFERENCES countries ON DELETE RESTRICT ON UPDATE RESTRICT,
            CONSTRAINT cid_name UNIQUE(name, cid)
        )`)
    .then(result =>console.log(`Created table regions ${result}`))
    .catch(err => console.error('Error creating regions table', err.stack));
    
    pool
    .query(`CREATE TABLE IF NOT EXISTS regiondistricts (
            rdid serial PRIMARY KEY,
            name text NOT NULL,
            rid integer REFERENCES regions ON DELETE RESTRICT ON UPDATE RESTRICT,
            CONSTRAINT rid_name UNIQUE(name, rid)
        )`)
    .then(result =>console.log(`Created table regiondistricts ${result}`))
    .catch(err => console.error('Error creating regiondistricts table', err.stack));
    
    pool
    .query(`CREATE TABLE IF NOT EXISTS locations (
            lid serial PRIMARY KEY,
            name text NOT NULL,
            lstatus text,
            rdid integer REFERENCES regiondistricts ON DELETE RESTRICT ON UPDATE RESTRICT,
            CONSTRAINT rdid_name UNIQUE(name, rdid)
        )`)
    .then(result =>console.log(`Created table locations ${result}`))
    .catch(err => console.error('Error creating locations table', err.stack));
    
    pool
    .query(`CREATE TABLE IF NOT EXISTS towndistricts (
            tdid serial PRIMARY KEY,
            name text NOT NULL,
            lid integer REFERENCES locations ON DELETE RESTRICT ON UPDATE RESTRICT,
            CONSTRAINT lid_name UNIQUE(name, lid)
        )`)
    .then(result =>console.log(`Created table towndistricts ${result}`))
    .catch(err => console.error('Error creating towndistricts table', err.stack));
    
    
    pool
    .query(`CREATE TABLE IF NOT EXISTS streets (
            sid serial PRIMARY KEY,
            streetname text,
            streettype text,
            lid integer REFERENCES locations ON DELETE RESTRICT ON UPDATE RESTRICT,
            tdid integer REFERENCES towndistricts ON DELETE RESTRICT ON UPDATE RESTRICT,
            CONSTRAINT lid_stname_sttype UNIQUE(streetname, streettype, lid)
        )`)
    .then(result =>console.log(`Created table streets ${result}`))
    .catch(err => console.error('Error creating streets table', err.stack));
    
    pool
    .query(`CREATE TABLE IF NOT EXISTS kgardens (
            kgid serial PRIMARY KEY,
            name text NOT NULL,
            descr text,
            site text,
            phonen jsonb,
            time jsonb,
            age jsonb,
            price jsonb,
            checked boolean DEFAULT FALSE,
            aid integer REFERENCES addresses ON DELETE RESTRICT ON UPDATE RESTRICT,
            uid integer REFERENCES users ON DELETE RESTRICT ON UPDATE RESTRICT,
            CONSTRAINT name_address UNIQUE(name, aid)
        )`)
    .then(result =>console.log(`Created table kgardens ${result}`))
    .catch(err => console.error('Error creating kgardens table', err.stack));
    
     pool
    .query(`CREATE TABLE IF NOT EXISTS addresses (
            aid serial PRIMARY KEY,
            house text NOT NULL,
            appt text DEFAULT '0',
            floor text DEFAULT '0',
            sid integer REFERENCES streets ON DELETE RESTRICT ON UPDATE RESTRICT,
            CONSTRAINT all_address UNIQUE(house, sid, floor, appt)
        )`)
    .then(result =>console.log(`Created table addresses ${result}`))
    .catch(err => console.error('Error creating addresses table', err.stack));
    
    pool
    .query(`CREATE TABLE IF NOT EXISTS users (
            uid serial PRIMARY KEY,
            email text UNIQUE NOT NULL,
            password text NOT NULL,
            session text UNIQUE
        )`)
    .then(result =>console.log(`Created table users ${result}`))
    .catch(err => console.error('Error creating users table', err.stack));
  
  pool
    .query(`CREATE TABLE IF NOT EXISTS usersadm (
            uid serial PRIMARY KEY,
            email text UNIQUE NOT NULL,
            password text NOT NULL,
            session text UNIQUE
        )`)
    .then(result =>console.log(`Created table users ${result}`))
    .catch(err => console.error('Error creating users table', err.stack));
   
};
