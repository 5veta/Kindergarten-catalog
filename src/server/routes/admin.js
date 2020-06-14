import dotenv from 'dotenv';
dotenv.config();
import fetch from 'isomorphic-fetch';
const express=require("express");
const router=express.Router();
import C from '../../constants';
import {parseCountries, createObjectforState, addtoobj} from '../../lib/countriesParser.js';
import Login from '../../components/ui/Login';
import {selectnewkgardens, checkedkgarden, deletekindergarden} from '../../db/kindergartens';
import {getAUserbyEmail, changeASession, } from '../../db/users';
import {stopSubmit} from 'redux-form';
const bcrypt = require('bcrypt');

const dispatchAndRespond = (req, res, action) => {
    req.store.dispatch(action);
    res.status(200).json(action);
};

router.get("/new/kindergartens", (req, res)=>{
  
  selectnewkgardens()
  .then(kgs=>{
    dispatchAndRespond(req, res, {
    type: C.GET_NEWKG,
    newkglist: kgs
    });
  })
  .catch(err=>console.error('Error getting new kindergartens', err.stack));
  
});

router.put("/check/kindergartens/:id", (req, res)=>{
  
  checkedkgarden(req.params.id)
  .then(kgid=>{
    if(kgid){
      dispatchAndRespond(req, res, {
        type: C.GET_NEWKG,
        kgid: kgid
      });
    }
  })
  .catch(err=>console.error('Error checking new kindergarten', err.stack));
    
});

router.delete("/kindergartens/:id", (req, res)=>{
  deletekindergarden(req.params.id).catch(err=>console.error('Error deleting new kindergarden', err.stack));
  dispatchAndRespond(req, res, {
    type: C.DELETE_KG,
    kgid: req.params.id
  });
  
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

router.post("/login", async(req, res)=>{
  let user=await getAUserbyEmail(req.body.email).catch(err=>console.error('Error checking of user', err.stack));
  if(user){
    let match=await bcrypt.compare(req.body.password, user.password).catch(err=>console.error('Error comparing passwords', err.stack));
    if(match){
      let adm=await changeASession(req.body.email, req.session.id).catch(err=>console.error('Error changing session', err.stack));
      if(adm.uid){
        req.session.unid=adm.uid;
        let kgs=await selectnewkgardens().catch(err=>console.error('Error getting new kindergartens', err.stack));
        dispatchAndRespond(req, res, {
          type: C.ADMUSER_ATH,
          login: 'admin',
          isAlogined: true,
          newkglist: kgs
        });
      }
    }
    else{
      dispatchAndRespond(req, res, stopSubmit('login', {_error:'Login or password is wrong!'}));
    }
  }
  else{
    dispatchAndRespond(req, res, stopSubmit('login', {_error:'Login or password is wrong!'}));
  }  
});

router.get("/createjsonfromdb", (req, res)=>{
  let resobj=parseCountries();
  res.status(200).json(resobj);
});
  
export default router;