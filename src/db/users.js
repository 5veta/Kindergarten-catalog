import {pool, pooladm} from './dbconfig';

export const changeSession=(email, session)=>{
  return pool
    .query(`UPDATE users SET session='${session}' WHERE email='${email}' RETURNING uid, email `)
    .then(result=>result.rows[0])
    .catch(err=>console.error('Error updating session', err.stack));
};

export const changeASession=(email, session)=>{
  return pooladm
    .query(`UPDATE usersadm SET session='${session}' WHERE email='${email}' RETURNING uid, email `)
    .then(result=>result.rows[0])
    .catch(err=>console.error('Error updating session', err.stack));
};

export const checkUser=(email, password)=>{
  return pool
    .query(`SELECT uid, email FROM users WHERE email='${email}' AND password='${password}'`)
    .then(result=>{return result.rows.length<1?0:result.rows[0];})
    .catch(err=>console.error('Error! Such user does not exist', err.stack));
};

export const getUserbyEmail=(email)=>{
    return pool
        .query(`SELECT uid, email, password, time FROM users WHERE email='${email}'`)
        .then(result =>{return (result.rows.length<1)?0:result.rows[0];})
        .catch(err => console.error('Error selecting user', err.stack));
};

export const getAUserbyEmail=(email)=>{
    return pooladm
       .query(`SELECT uid, email, password FROM usersadm WHERE email='${email}'`)
       .then(result =>{return (result.rows.length<1)?0:result.rows[0];})
       .catch(err => console.error('Error selecting user', err.stack));
};

export const getUserbyID=(id)=>{
    return pool
        .query(`SELECT uid, time, token FROM users WHERE uid='${id}'`)
        .then(result =>{return (result.rows.length<1)?0:result.rows[0];})
        .catch(err => console.error('Error selecting user by id', err.stack));
};

export const addUser=(email, password, session)=>{
    return pool
        .query(`INSERT INTO users(email, password, session) VALUES('${email}', '${password}', '${session}') RETURNING uid, email`)
        .then(result =>{return (result.rows.length<1)?0:result.rows[0];})
        .catch(err => console.error('Error adding user', err.stack));
};

export const updateUserToken=(token, id)=>{
    return pool
        .query(`UPDATE users SET token='${token}', time=now() WHERE uid='${id}' RETURNING time`)
        .then(result =>result.rows[0])
        .catch(err => console.error('Error updating token', err.stack));
};

export const updateUserPass=(pass, id)=>{
    return pool
        .query(`UPDATE users SET password='${pass}', token='' WHERE uid='${id}' RETURNING uid`)
        .then(result =>result.rows[0])
        .catch(err => console.error('Error updating pass', err.stack));
};

export const selUserID=(login)=>{
    return pool
        .query(`SELECT uid FROM users WHERE email='${login}'`)
        .then(result =>result.rows[0].uid)
        .catch(err => console.error('Error selecting user', err.stack));
};
