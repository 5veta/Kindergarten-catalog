const express=require("express");
const router=express.Router();
const bcrypt = require('bcrypt');
import C from '../../constants';

import {addKgarden, addAddress, getUserbyEmail, addUser, changeSession, selectuserkgs} from '../../dbf';
import {stopSubmit} from 'redux-form';

const dispatchAndRespond = (req, res, action) => {
    req.store.dispatch(action);
    res.status(200).json(action);
}

//information about kids gardens

router.get("/clients", (req, res)=>{
    res.status(200).json(req.store.getState().countries);
});

router.post("/translate", (req, res)=>{
  dispatchAndRespond(req, res, {
        type: C.CHANGE_LOCALE,
        locale: req.body.locale
  });
});

router.post("/kgardens", (req, res)=>{
  //console.log('Session inf'+req.session.unid+"\n");
  if(req.body.hasOwnProperty('countries')){
    dispatchAndRespond(req, res, {
        type: C.SEL_COUNTRIES,
        scountries: req.body.countries
    });
  }
  else if(req.body.hasOwnProperty('regions')){
    dispatchAndRespond(req, res, {
        type: C.SEL_REGIONS,
        sregions: req.body.regions
    });
  }
  else if(req.body.hasOwnProperty('locations')){
    dispatchAndRespond(req, res, {
        type: C.SEL_LOCATIONS,
        slocations: req.body.locations
    });
  }
  else if(req.body.hasOwnProperty('submit')){
    dispatchAndRespond(req, res, {
        type: C.SET_SUBMIT,
        ssubmit: req.body.submit
    });
  }
  
    
    
});

router.post("/countries", (req, res)=>{
  console.log('reqbody: '+JSON.stringify(req.body)+'\n hasownProperty'+req.body.hasOwnProperty('locationsv'));
  if(req.body.hasOwnProperty('country')){
    dispatchAndRespond(req, res, {
        type: C.SEL_COUNTRY,
        scountry: req.body.country,
    });
  }
  else if(req.body.hasOwnProperty('regions')){
    dispatchAndRespond(req, res, {
        type: C.SEL_REGION,
        sregions: req.body.regions,
    });
  }
  else if(req.body.hasOwnProperty('regiondts')){
    dispatchAndRespond(req, res, {
        type: C.SEL_REGDST,
        sregiondistricts: req.body.regiondts,
    });
  }
  else if(req.body.hasOwnProperty('locationsv')){
    dispatchAndRespond(req, res, {
        type: C.SEL_LOCATION,
        slocations: req.body.locationsv,
    });
  }
  else if(req.body.hasOwnProperty('towndts')){
    dispatchAndRespond(req, res, {
        type: C.SEL_TOWNDTS,
        stowndists: req.body.towndts,
    });
  }
  else if(req.body.hasOwnProperty('streetsv')){
    dispatchAndRespond(req, res, {
        type: C.SEL_STREET,
        sstreet: req.body.streetsv,
    });
  }
  else if(req.body.hasOwnProperty('lessons')){
    dispatchAndRespond(req, res, {
        type: C.COUNT_LESSONS
    });
  }
  else{
    dispatchAndRespond(req, res, {
        type: C.ADDED_KGARDEN,
        //kgid: req.body.kgid,
    });
  }
    
});

router.get("/logout", (req, res)=>{
  console.log("Session id: "+req.session.id);
  req.session.destroy(err=>{
    if(err){
      console.log("Error of logout"+err+"\n");
    }
  });
  
  dispatchAndRespond(req, res, {
    type: C.USER_ATH,
    login: "",
    islogined: false
  });
  
});

router.post("/login", (req, res)=>{
 // console.log('req.body'+req.body);
  getUserbyEmail(req.body.email)
  .then(user=>{

    if(user){
      bcrypt.compare(req.body.password, user.password)
      .then(match=>{
        if(match){
          changeSession(req.body.email, req.session.id)
          .then(usr=>{
            console.log('\n usr.id'+usr.uid);
            if(usr.uid){
              selectuserkgs(usr.uid)
              .then(ukgs=>{
                req.session.unid=usr.id;
                dispatchAndRespond(req, res, {
                  type: C.USER_ATH,
                  login: usr.email,
                  islogined: true,
                  userskgs: ukgs
                });
              })
              .catch(err=>console.error('Error getting user kids gardens', err.stack));
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

router.post("/signup", (req, res)=>{
  
  getUserbyEmail(req.body.email)
  .then(user=>{
    if(!user){
      bcrypt.hash(req.body.password, 10)
      .then(hash=>{
        console.log('Sesid: '+req.session.id+'\n');
        // Store hash in your password DB.
        addUser(req.body.email, hash, req.session.id)
        .then(row=>{
          if(row){
            req.session.unid=row.uid;
            console.log('Row:'+row.uid+' Sess: '+req.session.unid+'\n');
            dispatchAndRespond(req, res, {
              type: C.USER_ATH,
              login: row.email,
              islogined: true
            });
          }
        })
        .catch(err => console.error('Error adding user', err.stack));
      })
      .catch(err => console.error('Error crypting password', err.stack));
    }
    else{
      dispatchAndRespond(req, res, stopSubmit('singup', {_error:'Such user already exists!'}));
      
    }
  })
  .catch(err => console.error('Error checking user email', err.stack));

});

router.post("/user/kgadd", (req, res)=>{
  console.log(req.store.user.login+'\n');
    let img=req.body.img;
    let name= req.body.name.replace(/'/g, "''");
    let descr= req.body.descr.replace(/'/g, "''");
    let site= req.body.site;
    let phonen=req.body.phnumb.split(',');
    let time= {from: req.body.timef, to: req.body.timet};
    let age={from: req.body.agef, to: req.body.aget};
    let price={halfday: req.body.prperhday, day: req.body.prperday, month: req.body.prpem, year: req.body.prpery, annual: req.body.prann, currency: req.body.pcurrency};
    let address={sid: req.body.sid, house: req.body.house, appt: req.body.appt, floor: req.body.floor };
    let lessons=req.body.lessons;
  if(req.store.user.login){
    selUserID(req.store.user.login)
    .then(uid=>{
      addAddress(address)
      .then(aid=>{
        let addr={aid: aid, sid: req.body.sid, house: req.body.house, appt: req.body.appt, floor: req.body.floor };
        addKgarden(name, descr, site, phonen, time, age, price, aid, lessons, uid)
        .then(kgid=>{
          dispatchAndRespond(req, res, {
            type: C.ADD_KGARDEN,
            kgarden: {kgid, img, name, descr: descr, site, phonen, time, age, price, address: addr, lessons}  
          });
        })
        .catch(err => console.error('Error inserting kgarden', err.stack));
      })
      .catch(err => console.error('Error inserting address', err.stack));
     })
     .catch(err => console.error('No such user', err.stack));
    
  }  
    
   
});

export default router