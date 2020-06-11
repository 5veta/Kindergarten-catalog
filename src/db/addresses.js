import {pool, pooladm} from './dbconfig';


export const selectallcountries=()=>{
    return pool
        .query(`SELECT * FROM countries`)
        .then(result =>result.rows)
        .catch(err => console.error('Error executing query', err.stack));
};
export const selectallregions=()=>{
    return pool.query(`SELECT * FROM regions`)
        .then(result=>result.rows)
        .catch(err=>console.error('Error executing query', err.stack));
};

export const selectallregsdistricts=()=>{
    return pool.query(`SELECT * FROM regiondistricts`)
        .then(result=>result.rows)
        .catch(err=>console.error('Error executing query', err.stack));
};

export const selectalllocations=()=>{
    return pool.query(`SELECT * FROM locations`)
        .then(result=>result.rows)
        .catch(err=>console.error('Error executing query', err.stack));
};

export const selectalltowndistricts=()=>{
  let promise1=pool.query(`SELECT * FROM towndistricts`)
  .then(result=>result.rows)
  .catch(err=>console.error('Error executing query', err.stack));
  return promise1;
};

export const selectallstreets=()=>{
    return pool.query(`SELECT * FROM streets`)
        .then(result=>result.rows)
        .catch(err=>console.error('Error executing query', err.stack));
};

export const selectregionsofcountry=()=>{
    return pool
        .query(`SELECT countries.cid, regions.rid, regions.name FROM countries, regions WHERE regions.cid=countries.cid`)
        .then(result =>result.rows)
        .catch(err => console.error('Error executing query', err.stack));
};

export const selectregiondistsofregion=()=>{
    return pool
        .query(`SELECT regiondistricts.rdid, regions.rid, regiondistricts.name FROM regions, regiondistricts WHERE regions.rid=regiondistricts.rid`)
        .then(result=>result.rows)
        .catch(err => console.error('Error executing query', err.stack));
};

export const selectlocationsofregdist=()=>{
    return pool
        .query(`SELECT regiondistricts.rdid, locations.lid, locations.name, locations.lstatus FROM regiondistricts, locations WHERE regiondistricts.rdid=locations.rdid`)
        .then(result=>result.rows)
        .catch(err => console.error('Error executing query', err.stack));
};

export const selecttowndistrictsoflocation=()=>{
    return pool
        .query(`SELECT towndistricts.tdid, locations.lid, towndistricts.name FROM locations, towndistricts WHERE towndistricts.lid=locations.lid`)
        .then(result=>result.rows)
        .catch(err => console.error('Error executing query', err.stack));
};

export const selectstreetsoftownd=()=>{
    return pool
        .query(`SELECT towndistricts.tdid, streets.sid, streetname, streettype, locations.lid FROM towndistricts, streets, locations WHERE streets.lid=locations.lid AND towndistricts.tdid=streets.tdid`)
        .then(result=>result.rows)
        .catch(err => console.error('Error executing query', err.stack));
};

export const selectstreetsoflocation=()=>{
    return pool
        .query(`SELECT streets.sid, streetname, streettype, locations.lid FROM streets, locations WHERE locations.lid=streets.lid`)
        .then(result=>result.rows)
        .catch(err => console.error('Error executing query', err.stack));
};

export const addcountry=(countryname)=>{
    return pool
        .query(`INSERT INTO countries(name) VALUES('${countryname.country}') ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING cid`)
        .then(result =>result.rows[0].cid)
        .catch(err => console.error('Error executing query', err.stack));
};

export const addregion=(data)=>{
    return pool
        .query(`INSERT INTO regions(name, cid) VALUES('${data.region}', '${data.cid}') ON CONFLICT ON CONSTRAINT cid_name DO UPDATE SET name=EXCLUDED.name RETURNING rid`)
        .then(result =>result.rows[0].rid)
        .catch(err => console.error('Error executing query', err.stack));
};

export const addregdistr=(data)=>{
    return pool
        .query(`INSERT INTO regiondistricts(name, rid) VALUES('${data.regdists}', '${data.rid}') ON CONFLICT ON CONSTRAINT rid_name DO UPDATE SET name=EXCLUDED.name RETURNING rdid`)
        .then(result =>result.rows[0].rdid)
        .catch(err => console.error('Error executing query', err.stack));
};

export const addlocation=(data)=>{
    return pool
        .query(`INSERT INTO locations(name, lstatus, rdid) VALUES('${data.locations}', '${data.stausl}', '${data.rdid}') ON CONFLICT ON CONSTRAINT rdid_name DO UPDATE SET name=EXCLUDED.name, lstatus=EXCLUDED.lstatus RETURNING lid`)
        .then(result =>result.rows[0].lid)
        .catch(err => console.error('Error executing query', err.stack));
};

export const addtowndistr=(data)=>{
    return pool
        .query(`INSERT INTO towndistricts(name, lid) VALUES('${data.towndistr}', '${data.lid}') ON CONFLICT ON CONSTRAINT lid_name DO UPDATE SET name=EXCLUDED.name RETURNING tdid`)
        .then(result =>result.rows[0].tdid)
        .catch(err => console.error('Error executing query', err.stack));
};

export const addstreet=(data)=>{
    return pool
        .query((data.tdid!=='')?`INSERT INTO streets(streetname, streettype, lid, tdid) VALUES('${data.streetname}', '${data.streetype}', '${data.lid}', '${data.tdid}') ON CONFLICT ON CONSTRAINT lid_stname_sttype DO UPDATE SET streetname=EXCLUDED.streetname, streettype=EXCLUDED.streettype RETURNING sid`:`INSERT INTO streets(streetname, streettype, lid) VALUES('${data.streetname}', '${data.streetype}', '${data.lid}') ON CONFLICT ON CONSTRAINT lid_stname_sttype DO UPDATE SET streetname=EXCLUDED.streetname, streettype=EXCLUDED.streettype RETURNING sid`)
        .then(result =>result.rows[0].sid)
        .catch(err => console.error('Error executing query', err.stack));
};

export const selectcountries=()=>{
    return pool
    .query('SELECT countries.name, regions.name, regiondistricts.name, locations.name FROM countries, regions, regiondistricts, locations where regions.cid=countries.cid and regions.rid=regiondistricts.rid and regiondistricts.rdid=locations.rdid')
    .then(result=>result.rows)
    .catch(e =>console.error(e.stack));
};