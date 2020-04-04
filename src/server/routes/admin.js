import dotenv from 'dotenv';
dotenv.config();
import fetch from 'isomorphic-fetch';
const express=require("express");
const router=express.Router();
import C from '../../constants';
import countriesInf from './countriesDb.json';
import {parseCountries, createObjectforState, addtoobj} from '../../lib/countriesParser.js';
import Login from '../../components/ui/Login';
import {getAUserbyEmail, changeASession, selectnewkgardens, checkedkgarden} from '../../dbf';
import {stopSubmit} from 'redux-form';
const bcrypt = require('bcrypt');

const dispatchAndRespond = (req, res, action) => {
    req.store.dispatch(action);
    res.status(200).json(action);
}

//const printdoc=require('../templates/serverpage');
const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  database:process.env.DATABASE,
  user:process.env.USER_ADM,
  password:process.env.PASSW_ADM,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

router.get("/getNewKg", (req, res)=>{
  //console.log('getNewKg'+JSON.stringify(req));
  selectnewkgardens()
  .then(kgs=>{
    dispatchAndRespond(req, res, {
    type: C.GET_NEWKG,
    newkglist: kgs
    });
  })
  .catch(err=>console.error('Error getting new kids gardens', err.stack));
  
});

router.post("/checkkg", (req, res)=>{
  console.log('checked'+req.body.kgid);
  checkedkgarden(req.body.kgid)
  .then(kgid=>{
    if(kgid){
      dispatchAndRespond(req, res, {
        type: C.GET_NEWKG,
        kgid: kgid
      });
    }
  })
  .catch(err=>console.error('Error checking new kids garden', err.stack));
    
});

router.get("/logout", (req, res)=>{
  
  req.session.destroy(err=>{
    if(err){
      console.log("Error of logout"+err+"\n");
    }
  });
  
  dispatchAndRespond(req, res, {
    type: C.ADMUSER_ATH,
    login: "",
    isAlogined: false
  });
  
});

router.post("/login", (req, res)=>{
  getAUserbyEmail(req.body.email)
  .then(user=>{
    if(user){
      bcrypt.compare(req.body.password, user.password)
      .then(match=>{
        if(match){
          changeASession(req.body.email, req.session.id)
          .then(adm=>{
            if(adm.uid){
              req.session.unid=adm.uid;
              selectnewkgardens()
              .then(kgs=>{
                dispatchAndRespond(req, res, {
                  type: C.ADMUSER_ATH,
                  login: 'admin',
                  isAlogined: true,
                  newkglist: kgs
                });
              })
              .catch(err=>console.error('Error getting new kids gardens', err.stack));
            }
          })
          .catch(err=>console.error('Error changing session', err.stack));
        }
        else{
          dispatchAndRespond(req, res, stopSubmit('login', {_error:'Login or password is wrong!'}));
        }
      })
      .catch(err=>console.error('Error comparing passwords', err.stack));
    }
    else{
      
      dispatchAndRespond(req, res, stopSubmit('login', {_error:'Login or password is wrong!'}));
      
    }
  })
  .catch(err=>console.error('Error checking of user', err.stack));
});

router.get("/createjsonfromdb", (req, res)=>{
  //parseCountries();
  let resobj=parseCountries();
  res.status(200).json(resobj);
});

router.get("/adddb", (req, res)=>{

  let newData = JSON.stringify(countriesInf);
  let countriesObj=JSON.parse(newData);
  
    //const result=req.store.getState();
    //req.store.dispatch(getTowns());
    for(let prop in countriesObj){
      if(countriesObj.hasOwnProperty(prop)){
        
        let data={country: prop};
        console.log(prop);
        fetch('http://192.252.210.20:3000/moder/addsd', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})
        .then(response=>response.json())
        .then(cdata => {
          let strdata = JSON.stringify(cdata);
          let resdata=JSON.parse(strdata);
          for(let reg in countriesObj[prop]){
              if(countriesObj[prop].hasOwnProperty(reg)){
                let rdata={region: reg, cid: resdata.cid};
                fetch('http://192.252.210.20:3000/moder/addsd', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(rdata)})
                .then(response=>response.json())
                .then(ridata=>{
                    let strrdata = JSON.stringify(ridata);
                    let regid=JSON.parse(strrdata);
                    for(let regiondisticts of countriesObj[prop][reg]){
                      if(regiondisticts.hasOwnProperty('name')){
                        let regdists={regdists:regiondisticts.name, rid:regid.rid};
                        fetch('http://192.252.210.20:3000/moder/addsd', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(regdists)})
                        .then(response=>response.json())
                        .then(rdidata=>{
                            let strrddata = JSON.stringify(rdidata);
                            let rdiddata=JSON.parse(strrddata);
                            console.log(rdiddata.rdid);
                            if(regiondisticts.hasOwnProperty('locations')){
                              for(let locationsobj of regiondisticts.locations){
                                let locs={locations:locationsobj.name, rdid:rdiddata.rdid, stausl:locationsobj.status };
                                fetch('http://192.252.210.20:3000/moder/addsd', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(locs)})
                                .then(response=>response.json())
                                .then(locdata=>{
                                    let strlocdata = JSON.stringify(locdata);
                                    let locidata=JSON.parse(strlocdata);
                                    if(locationsobj.hasOwnProperty('streets')){
                                      for(let streetn of towndistr.streets){
                                        let strinf={streetname:streetn.name, streetype:streetn.type, lid:locidata.lid, tdid:'NULL'};
                                        fetch('http://192.252.210.20:3000/moder/addsd', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(strinf)})
                                        .then(response=>response.json())
                                        .then(strdata=>{
                                           let streetdata = JSON.stringify(strdata);
                                           let strid=JSON.parse(streetdata);
                                           console.log('Street id1:'+strid.sid);
                                        })
                                        .catch(error => console.error(`Street: ${error}`));
                                      }
                                    }
                                    else if(locationsobj.hasOwnProperty('towndists')){
                                      for(let towndistr of locationsobj.towndists){
                                        let tdistr={towndistr:towndistr.name, lid:locidata.lid };
                                        fetch('http://192.252.210.20:3000/moder/addsd', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(tdistr)})
                                        .then(response=>response.json())
                                        .then(tddata=>{
                                            let townddata = JSON.stringify(tddata);
                                            let tdrid=JSON.parse(townddata);
                                            if(towndistr.hasOwnProperty('streets')){
                                              for(let streetn of towndistr.streets){
                                                let strinf={streetname:streetn.name, streetype:streetn.type, lid:locidata.lid, tdid:tdrid.tdid};
                                                fetch('http://192.252.210.20:3000/moder/addsd', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(strinf)})
                                                .then(response=>response.json())
                                                .then(strdata=>{
                                                    let streetdata = JSON.stringify(strdata);
                                                    let strid=JSON.parse(streetdata);
                                                    console.log('Street id:'+strid.sid);
                                                })
                                                .catch(error => console.error(`Street from towndistr: ${error}`));
                                              }
                                            }
                                            
                                        })
                                        .catch(error => console.error(`Town district: ${error}`));
                                      }
                                    }
                                    console.log(locidata.lid);
                                  })
                                .catch(error => console.error(`Locations: ${error}`));
                              }
                            }
                          })
                        .catch(error => console.error(`Region districts: ${error}`));
                      }
                    }
                  })
                .catch(error => console.error(`Region: ${error}`));
              }
          }
          
         })
        .catch(error => console.error(`Country: ${error}`));
        console.log('Started add regions');
        
      }
    }
  
  //pool.end();
  
  
 
     //client
   // .query('SELECT * FROM kgardens')
   // .then(result => res.send(result.rows[0]))
   // .catch(e =>console.error(e.stack));
});

router.post("/addsd", (req, res)=>{
  
 // let infdata=JSON.parse(req.body);
  
    //const result=req.store.getState();
    //req.store.dispatch(getTowns());
   
  if(req.body.hasOwnProperty('country')){         
    console.log(req.body.country);
    pool
    .query(`INSERT INTO countries(name) VALUES('${req.body.country}') ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING cid`)
    .then(result =>{
      let cid=result.rows[0].cid;
      let cresult={cid: cid};
      res.status(200).json(cresult);})
    .catch(err => console.error('Error executing query', err.stack));
    
  }
  else if(req.body.hasOwnProperty('region')){
    console.log(`params: '${req.body.region}', '${req.body.cid}'`);
    pool
    .query(`INSERT INTO regions(name, cid) VALUES('${req.body.region}', '${req.body.cid}') ON CONFLICT ON CONSTRAINT cid_name DO UPDATE SET name=EXCLUDED.name RETURNING rid`)
    .then(result =>{
      let rid=result.rows[0].rid;
      let rresult={rid: rid};
      res.status(200).json(rresult);})
    .catch(err => console.error('Error executing query', err.stack));
    
  }
  else if(req.body.hasOwnProperty('regdists')){
    console.log(`params: '${req.body.regdists}', '${req.body.rid}'`);
    pool
    .query(`INSERT INTO regiondistricts(name, rid) VALUES('${req.body.regdists}', '${req.body.rid}') ON CONFLICT ON CONSTRAINT rid_name DO UPDATE SET name=EXCLUDED.name RETURNING rdid`)
    .then(result =>{
      let rdid=result.rows[0].rdid;
      let rresult={rdid: rdid};
      res.status(200).json(rresult);})
    .catch(err => console.error('Error executing query', err.stack));
    
  }
  else if(req.body.hasOwnProperty('locations')){
    console.log(`params: '${req.body.locations}', '${req.body.stausl}', '${req.body.rdid}'`);
    pool
    .query(`INSERT INTO locations(name, lstatus, rdid) VALUES('${req.body.locations}', '${req.body.stausl}', '${req.body.rdid}') ON CONFLICT ON CONSTRAINT rdid_name DO UPDATE SET name=EXCLUDED.name, lstatus=EXCLUDED.lstatus RETURNING lid`)
    .then(result =>{
      let lid=result.rows[0].lid;
      let rresult={lid: lid};
      res.status(200).json(rresult);})
    .catch(err => console.error('Error executing query', err.stack));
  }
  else if(req.body.hasOwnProperty('towndistr')){
    console.log(`params: '${req.body.towndistr}', '${req.body.lid}'`);
    pool
    .query(`INSERT INTO towndistricts(name, lid) VALUES('${req.body.towndistr}', '${req.body.lid}') ON CONFLICT ON CONSTRAINT lid_name DO UPDATE SET name=EXCLUDED.name RETURNING tdid`)
    .then(result =>{
      let tdid=result.rows[0].tdid;
      let rresult={tdid: tdid};
      res.status(200).json(rresult);})
    .catch(err => console.error('Error executing query', err.stack));
  }
  else if(req.body.hasOwnProperty('streetname')){
    console.log(`params: '${req.body.streetname}', '${req.body.streetype}'`);
    pool
    .query(`INSERT INTO streets(streetname, streettype, lid, tdid) VALUES('${req.body.streetname}', '${req.body.streetype}', '${req.body.lid}', '${req.body.tdid}') ON CONFLICT ON CONSTRAINT lid_stname_sttype DO UPDATE SET streetname=EXCLUDED.streetname, streettype=EXCLUDED.streettype RETURNING sid`)
    .then(result =>{
      let sid=result.rows[0].sid;
      let rresult={sid: sid};
      res.status(200).json(rresult);})
    .catch(err => console.error('Error executing query', err.stack));
  }
  
  
  else{
    res.status(200).json({rid: "noanswer"});
  }
  
  
  
     //client
   // .query('SELECT * FROM kgardens')
   // .then(result => res.send(result.rows[0]))
   // .catch(e =>console.error(e.stack));
});

router.get("/createtable", (req, res)=>{
    
  
});
  
export default router;