import dotenv from 'dotenv';
dotenv.config();
const { Client } = require('pg');
const client = new Client({
  database:process.env.DATABASE,
  user:process.env.USER_CLIENT,
  password:process.env.PASSW});

   client
  .connect()
  .then(() => console.log('connected to database222!'))
  .catch(err => console.error('connection error', err.stack));



const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  database:process.env.DATABASE,
  user:process.env.USER_CLIENT,
  password:process.env.PASSW,  
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});


const pooladm = new Pool({
  host: 'localhost',
  database:process.env.DATABASE,
  user:process.env.USER_ADM,
  password:process.env.PASSW_ADM,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const changeSession=(email, session)=>{
  let promise=pool
  .query(`UPDATE users SET session='${session}' WHERE email='${email}' RETURNING uid, email `)
  .then(result=>result.rows[0])
  .catch(err=>console.error('Error updating session', err.stack));
  return promise;
};

export const changeASession=(email, session)=>{
  let promise=pooladm
  .query(`UPDATE usersadm SET session='${session}' WHERE email='${email}' RETURNING uid, email `)
  .then(result=>result.rows[0])
  .catch(err=>console.error('Error updating session', err.stack));
  return promise;
};

export const checkUser=(email, password)=>{
  let promise=pool
  .query(`SELECT uid, email FROM users WHERE email='${email}' AND password='${password}'`)
  .then(result=>{return result.rows.length<1?0:result.rows[0];})
  .catch(err=>console.error('Error! Such user does not exist', err.stack));
  return promise;
}; 
export const getUserbyEmail=(email)=>{
  let promise1=pool
   .query(`SELECT uid, email, password FROM users WHERE email='${email}'`)
   .then(result =>{return (result.rows.length<1)?0:result.rows[0];})
   .catch(err => console.error('Error selecting user', err.stack));
   return promise1;
};

export const getAUserbyEmail=(email)=>{
  let promise1=pooladm
   .query(`SELECT uid, email, password FROM usersadm WHERE email='${email}'`)
   .then(result =>{return (result.rows.length<1)?0:result.rows[0];})
   .catch(err => console.error('Error selecting user', err.stack));
   return promise1;
};

export const addUser=(email, password, session)=>{
  let promise1=pool
   .query(`INSERT INTO users(email, password, session) VALUES('${email}', '${password}', '${session}') RETURNING uid, email`)
   .then(result =>{return (result.rows.length<1)?0:result.rows[0];})
   .catch(err => console.error('Error adding user', err.stack));
   return promise1;
};

export const addAddress=(address)=>{
  //console.log(`INSERT INTO addresses(house, appt, floor, sid) VALUES(${address.house}, ${address.appt}, ${address.floor}, ${address.sid}) ON CONFLICT ON CONSTRAINT all_address DO UPDATE SET house=EXCLUDED.house, appt=EXCLUDED.appt, floor=EXCLUDED.floor RETURNING aid`);
  let promise1=pool
   .query(`INSERT INTO addresses(house, appt, floor, sid) VALUES('${address.house}', '${(address.appt===undefined)?0:address.appt}', '${(address.floor===undefined)?0:address.floor}', '${address.sid}') ON CONFLICT ON CONSTRAINT all_address DO UPDATE SET house=EXCLUDED.house, appt=EXCLUDED.appt, floor=EXCLUDED.floor RETURNING aid`)
   .then(result =>result.rows[0].aid)
   .catch(err => console.error('Error executing query', err.stack));
   return promise1;
};
 
export const checkedkgarden=(id)=>{
 let promise1=pooladm
   .query(`UPDATE kgardens SET checked=true WHERE kgid='${id}' RETURNING kgid`)
   .then(result =>result.rows[0].kgid)
   .catch(err => console.error('Error updating check column', err.stack));
   return promise1;
};


export const addKgarden=(name, descr, site, phonen, time, age, price, aid, lessons, uid)=>{
  //console.log(`INSERT INTO kgardens(name, descr, site, phonen, time, age, price, aid) VALUES('${name}', '${descr}', '${site}', '${JSON.stringify(phonen)}', '${JSON.stringify(time)}', '${JSON.stringify(age)}', '${JSON.stringify(price)}', '${aid}') ON CONFLICT ON CONSTRAINT name_address DO UPDATE SET name=EXCLUDED.name, descr=EXCLUDED.descr, site=EXCLUDED.site, phonen=EXCLUDED.phonen, time=EXCLUDED.time, age=EXCLUDED.age, price=EXCLUDED.price RETURNING kgid`);
  let promise1=pool
   .query(`INSERT INTO kgardens(name, descr, site, phonen, time, age, price, aid, lessons, uid) VALUES('${name}', '${descr}', '${site}', '${JSON.stringify(phonen)}', '${JSON.stringify(time)}', '${JSON.stringify(age)}', '${JSON.stringify(price)}', '${aid}', '${JSON.stringify(lessons)}', '${uid}') ON CONFLICT ON CONSTRAINT name_address DO UPDATE SET name=EXCLUDED.name, descr=EXCLUDED.descr, site=EXCLUDED.site, phonen=EXCLUDED.phonen, time=EXCLUDED.time, age=EXCLUDED.age, price=EXCLUDED.price, lessons=EXCLUDED.lessons RETURNING kgid`)
   .then(result =>result.rows[0].kgid)
   .catch(err => console.error('Error executing query', err.stack));
   return promise1;
};

export const selUserID=(login)=>{
  //console.log(`INSERT INTO kgardens(name, descr, site, phonen, time, age, price, aid) VALUES('${name}', '${descr}', '${site}', '${JSON.stringify(phonen)}', '${JSON.stringify(time)}', '${JSON.stringify(age)}', '${JSON.stringify(price)}', '${aid}') ON CONFLICT ON CONSTRAINT name_address DO UPDATE SET name=EXCLUDED.name, descr=EXCLUDED.descr, site=EXCLUDED.site, phonen=EXCLUDED.phonen, time=EXCLUDED.time, age=EXCLUDED.age, price=EXCLUDED.price RETURNING kgid`);
  let promise1=pool
   .query(`SELECT uid FROM users WHERE login='${login}'`)
   .then(result =>result.rows[0].uid)
   .catch(err => console.error('Error executing query', err.stack));
   return promise1;
};


export const selectuserkgs=(id)=>{
  let promise1=pool
   .query(`SELECT kgid, img, name, descr, site, phonen, time, age, price, json_build_object('aid', addresses.aid, 'house',house,'appt', appt,'floor', floor,'sid', sid) as address, lessons, checked, uid FROM kgardens, addresses WHERE kgardens.aid=addresses.aid AND uid='${id}'`)
   .then(result =>result.rows)
   .catch(err => console.error('Error getting kgardens of user', err.stack));
   return promise1;
};

export const selectallkgardens=()=>{
  let promise1=pool
   .query(`SELECT kgid, img, name, descr, site, phonen, time, age, price, json_build_object('aid', addresses.aid, 'house',house,'appt', appt,'floor', floor,'sid', sid) as address, lessons FROM kgardens, addresses WHERE kgardens.aid=addresses.aid AND checked=true`)
   .then(result =>result.rows)
   .catch(err => console.error('Error executing query', err.stack));
   return promise1;
};

export const selectnewkgardens=()=>{
  let promise1=pooladm
   .query(`SELECT kgid, img, name, descr, site, phonen, time, age, price, json_build_object('aid', addresses.aid, 'house',house,'appt', appt,'floor', floor,'sid', sid) as address, lessons, checked, uid FROM kgardens, addresses WHERE kgardens.aid=addresses.aid AND checked=false`)
   .then(result =>result.rows)
   .catch(err => console.error('Error executing query', err.stack));
   return promise1;
};

export const selectallcountries1=()=>{
 let y;
   pool.query(`SELECT * FROM countries`, (err, res) => {
      if (err) {
        throw err;
      }
      //console.log('countries'+JSON.stringify(res.rows));
      y=res.rows;
      
  });
  console.log('y:'+y);
};

export const selectallcountries=()=>{
 
   let promise1=pool
   .query(`SELECT * FROM countries`)
   .then(result =>result.rows)
   .catch(err => console.error('Error executing query', err.stack));
   return promise1;

};
export const selectallregions=()=>{
  let promise1=pool.query(`SELECT * FROM regions`)
  .then(result=>result.rows)
  .catch(err=>console.error('Error executing query', err.stack));
  return promise1;
};

export const selectallregsdistricts=()=>{
  let promise1=pool.query(`SELECT * FROM regiondistricts`)
  .then(result=>result.rows)
  .catch(err=>console.error('Error executing query', err.stack));
  return promise1;
};

export const selectalllocations=()=>{
  let promise1=pool.query(`SELECT * FROM locations`)
  .then(result=>result.rows)
  .catch(err=>console.error('Error executing query', err.stack));
  return promise1;
};

export const selectalltowndistricts=()=>{
  let promise1=pool.query(`SELECT * FROM towndistricts`)
  .then(result=>result.rows)
  .catch(err=>console.error('Error executing query', err.stack));
  return promise1;
};

export const selectallstreets=()=>{
  let promise1=pool.query(`SELECT * FROM streets`)
  .then(result=>result.rows)
  .catch(err=>console.error('Error executing query', err.stack));
  return promise1;
};

export const selectregionsofcountry=()=>{
    let promise1=pool
    .query(`SELECT countries.cid, regions.rid, regions.name FROM countries, regions WHERE regions.cid=countries.cid`)
    .then(result =>result.rows)
    .catch(err => console.error('Error executing query', err.stack));
    return promise1;
};

export const selectregiondistsofregion=()=>{
  let promise1=pool
  .query(`SELECT regiondistricts.rdid, regions.rid, regiondistricts.name FROM regions, regiondistricts WHERE regions.rid=regiondistricts.rid`)
  .then(result=>result.rows)
  .catch(err => console.error('Error executing query', err.stack));
  return promise1;
};

export const selectlocationsofregdist=()=>{
  let promise1=pool
  .query(`SELECT regiondistricts.rdid, locations.lid, locations.name, locations.lstatus FROM regiondistricts, locations WHERE regiondistricts.rdid=locations.rdid`)
  .then(result=>result.rows)
  .catch(err => console.error('Error executing query', err.stack));
  return promise1;
};

export const selecttowndistrictsoflocation=()=>{
  let promise1=pool
  .query(`SELECT towndistricts.tdid, locations.lid, towndistricts.name FROM locations, towndistricts WHERE towndistricts.lid=locations.lid`)
  .then(result=>result.rows)
  .catch(err => console.error('Error executing query', err.stack));
  return promise1;
};

export const selectstreetsoftownd=()=>{
  let promise1=pool
  .query(`SELECT towndistricts.tdid, streets.sid, streetname, streettype, locations.lid FROM towndistricts, streets, locations WHERE streets.lid=locations.lid AND towndistricts.tdid=streets.tdid`)
  .then(result=>result.rows)
  .catch(err => console.error('Error executing query', err.stack));
    return promise1;
};

export const selectstreetsoflocation=()=>{
  let promise1=pool
  .query(`SELECT streets.sid, streetname, streettype, locations.lid FROM streets, locations WHERE locations.lid=streets.lid`)
  .then(result=>result.rows)
  .catch(err => console.error('Error executing query', err.stack));
    return promise1;
};

export const addcountry=(countryname)=>{
    let promise1=pool
    .query(`INSERT INTO countries(name) VALUES('${countryname.country}') ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING cid`)
    .then(result =>result.rows[0].cid)
    .catch(err => console.error('Error executing query', err.stack));
    return promise1;
};

export const addregion=(data)=>{
    let promise1=pool
    .query(`INSERT INTO regions(name, cid) VALUES('${data.region}', '${data.cid}') ON CONFLICT ON CONSTRAINT cid_name DO UPDATE SET name=EXCLUDED.name RETURNING rid`)
    .then(result =>result.rows[0].rid)
    .catch(err => console.error('Error executing query', err.stack));
    return promise1;
};

export const addregdistr=(data)=>{
    let promise1=pool
    .query(`INSERT INTO regiondistricts(name, rid) VALUES('${data.regdists}', '${data.rid}') ON CONFLICT ON CONSTRAINT rid_name DO UPDATE SET name=EXCLUDED.name RETURNING rdid`)
    .then(result =>result.rows[0].rdid)
    .catch(err => console.error('Error executing query', err.stack));
    return promise1;
};

export const addlocation=(data)=>{
    let promise1=pool
    .query(`INSERT INTO locations(name, lstatus, rdid) VALUES('${data.locations}', '${data.stausl}', '${data.rdid}') ON CONFLICT ON CONSTRAINT rdid_name DO UPDATE SET name=EXCLUDED.name, lstatus=EXCLUDED.lstatus RETURNING lid`)
    .then(result =>result.rows[0].lid)
    .catch(err => console.error('Error executing query', err.stack));
    return promise1;
};

export const addtowndistr=(data)=>{
     let promise1=pool
    .query(`INSERT INTO towndistricts(name, lid) VALUES('${data.towndistr}', '${data.lid}') ON CONFLICT ON CONSTRAINT lid_name DO UPDATE SET name=EXCLUDED.name RETURNING tdid`)
    .then(result =>result.rows[0].tdid)
    .catch(err => console.error('Error executing query', err.stack));
    return promise1;
};

export const addstreet=(data)=>{
  let qv;
  qv=`INSERT INTO streets(streetname, streettype, lid, tdid) VALUES('${data.streetname}', '${data.streetype}', '${data.lid}', '${data.tdid}') ON CONFLICT ON CONSTRAINT lid_stname_sttype DO UPDATE SET streetname=EXCLUDED.streetname, streettype=EXCLUDED.streettype RETURNING sid`;
    let promise1=pool
    .query((data.tdid!=='')?`INSERT INTO streets(streetname, streettype, lid, tdid) VALUES('${data.streetname}', '${data.streetype}', '${data.lid}', '${data.tdid}') ON CONFLICT ON CONSTRAINT lid_stname_sttype DO UPDATE SET streetname=EXCLUDED.streetname, streettype=EXCLUDED.streettype RETURNING sid`:`INSERT INTO streets(streetname, streettype, lid) VALUES('${data.streetname}', '${data.streetype}', '${data.lid}') ON CONFLICT ON CONSTRAINT lid_stname_sttype DO UPDATE SET streetname=EXCLUDED.streetname, streettype=EXCLUDED.streettype RETURNING sid`)
    .then(result =>result.rows[0].sid)
    .catch(err => console.error('Error executing query', err.stack));
    return promise1;
};

export const selectcountries=()=>{
    
    return client
    .query('SELECT countries.name, regions.name, regiondistricts.name, locations.name FROM countries, regions, regiondistricts, locations where regions.cid=countries.cid and regions.rid=regiondistricts.rid and regiondistricts.rdid=locations.rdid')
    .then(result=>result.rows)
    .catch(e =>console.error(e.stack));
};


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
