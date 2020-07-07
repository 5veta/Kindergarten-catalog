import {pool, pooladm} from './dbconfig';

 
export const checkedkgarden=(id)=>{
    return pooladm
        .query(`UPDATE kgardens SET checked=true WHERE kgid='${id}' RETURNING kgid`)
        .then(result =>result.rows[0].kgid)
        .catch(err => console.error('Error updating check column', err.stack));
};

export const deletekindergarden=(id)=>{
    return pooladm
        .query(`DELETE FROM kgardens WHERE kgid='${id}'`)
        .catch(err => console.error('Error deleting kidsgarden', err.stack));
};

export const updateIMGofKG=(kgid, imgname)=>{
    return pool
        .query(`UPDATE kgardens SET img='${imgname}' WHERE kgid='${kgid}' RETURNING kgid, img`)
        .then(result =>result.rows[0])
        .catch(err => console.error('Error updating img', err.stack));
};

export const addKgarden=(name, descr, site, phonen, time, age, price, aid, lessons, uid)=>{
    return pool
       .query(`INSERT INTO kgardens(name, descr, site, phonen, time, age, price, aid, lessons, uid) VALUES('${name}', '${descr}', '${site}', '${JSON.stringify(phonen)}', '${JSON.stringify(time)}', '${JSON.stringify(age)}', '${JSON.stringify(price)}', '${aid}', '${JSON.stringify(lessons)}', '${uid}') ON CONFLICT ON CONSTRAINT name_address DO UPDATE SET name=EXCLUDED.name, descr=EXCLUDED.descr, site=EXCLUDED.site, phonen=EXCLUDED.phonen, time=EXCLUDED.time, age=EXCLUDED.age, price=EXCLUDED.price, lessons=EXCLUDED.lessons RETURNING kgid`)
       .then(result =>result.rows[0].kgid)
       .catch(err => console.error('Error adding kids garden', err.stack));
};

export const selectuserkgs=(id)=>{
    return pool
        .query(`SELECT kgid, img, name, descr, site, phonen, time, age, price, json_build_object('aid', addresses.aid, 'house',house,'appt', appt,'floor', floor,'sid', sid) as address, lessons, checked, uid FROM kgardens, addresses WHERE kgardens.aid=addresses.aid AND uid='${id}'`)
        .then(result =>result.rows)
        .catch(err => console.error('Error getting kgardens of user', err.stack));
};

export const selectallkgardens=()=>{
    return pool
       .query(`SELECT kgid, img, name, descr, site, phonen, time, age, price, json_build_object('aid', addresses.aid, 'house',house,'appt', appt,'floor', floor,'sid', sid) as address, lessons FROM kgardens, addresses WHERE kgardens.aid=addresses.aid AND checked=true`)
       .then(result =>(result.rows.length>0)?result.rows:[])
       .catch(err => console.error('Error executing query', err.stack));
};

export const selectnewkgardens=()=>{
    return pooladm
        .query(`SELECT kgid, img, name, descr, site, phonen, time, age, price, json_build_object('aid', addresses.aid, 'house',house,'appt', appt,'floor', floor,'sid', sid) as address, lessons, checked, uid FROM kgardens, addresses WHERE kgardens.aid=addresses.aid AND checked=false`)
        .then(result =>result.rows)
        .catch(err => console.error('Error executing query', err.stack));
};