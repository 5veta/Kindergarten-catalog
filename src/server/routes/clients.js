const express=require("express");
const router=express.Router();
const bcrypt = require('bcrypt');
import C from '../../constants';
import fs from 'fs';
import multer from 'multer';
let upload = multer({ dest: 'dist/assets/uploads' });
import {addKgarden, selectuserkgs, updateIMGofKG} from '../../db/kindergartens';
import {addAddress} from '../../db/addresses';
import {getUserbyEmail, addUser, changeSession, selUserID, updateUserToken, getUserbyID, updateUserPass} from '../../db/users';
import {getRandomInt} from '../../lib/utils';
import {sendLettertoRecoverPass} from '../../lib/sendLetters';
import {stopSubmit} from 'redux-form';

const dispatchAndRespond = (req, res, action) => {
    req.store.dispatch(action);
    res.status(200).json(action);
};

const renameIMGFile=(file, kgid)=>{
  let re = /^[\w\d_А-Яа-яёЁїЇ-]+\.(jpg|png|svg|jpeg)$/i;
  let arr=re.exec(file.originalname);
  let new_name=`${kgid}.${arr[1]}`;
  
  fs.rename(file.path, `${file.destination}/${new_name}`, (err) => {
    if (err) throw err;
      console.log('Rename complete!');
  });
  return new_name;
};

const transformVarsfromBody=(body)=>{
  let name= body.name.replace(/'/g, "''");
  let descr= body.descr.replace(/'/g, "''");
  let site= body.site;
  let phonen=body.phnumb.split(',');
  let time= {from: body.timef, to: body.timet};
  let age={from: body.agef, to: body.aget};
  let price={halfday: body.prperhday, day: body.prperday, month: body.prpem, year: body.prpery, annual: body.prann, currency: body.pcurrency.split(',') };
  let address={sid: body.sid, house: body.house, appt: body.appt, floor: body.floor };
  
  let lessons=Object.keys(body).filter(v=>/^lname/.test(v)).map(vl=>{ if(vl!=='lname'){ let arr=vl.split('-'); return {lname: body[`lname-${arr[1]}`], ldesc: body[`ldesc-${arr[1]}`]}; } return {lname: body.lname, ldesc: body.ldesc}; });
  let obj={name, descr, site, phonen, time, age, price, address, lessons};
  
  return obj;

};


router.put("/translate/:lang", (req, res)=>{
  dispatchAndRespond(req, res, {
        type: C.CHANGE_LOCALE,
        locale: req.params.lang
  });
});

router.post("/countries", (req, res)=>{
  let upper_letters=req.body.type.toUpperCase();
  
  dispatchAndRespond(req, res, {
    type: C[upper_letters],
    target: req.body.target_value,
  });
});


router.post("/kindergartens", upload.single('upfile'), async (req, res)=>{
  let {name, descr, site, phonen, time, age, price, address, lessons}=transformVarsfromBody(req.body);
  let {sid, house, appt, floor}=address;
  
  if(req.store.getState().user.islogined){
    const uid=await selUserID(req.store.getState().user.login);
    if(uid){
      const aid=await addAddress(address);
      const kgid=await addKgarden(name, descr, site, phonen, time, age, price, aid, lessons, uid);
      const img=renameIMGFile(req.file, kgid);
      updateIMGofKG(kgid, img);
      
      dispatchAndRespond(req, res, {
        type: C.ADD_KGARDEN,
        kgarden: {kgid, img, name, descr, site, phonen, time, age, price, address: {aid, sid, house, appt, floor}, lessons}
      });
    }
    else{
      dispatchAndRespond(req, res, stopSubmit('addform', {_error:'We have not the user with such login'}));
    }
  }
  else{
    dispatchAndRespond(req, res, stopSubmit('addform', {_error:'You should be logined for this operation'}));
  }
});

//authorization

router.get("/logout", (req, res)=>{
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

router.post("/login", async(req, res)=>{
  let user=await getUserbyEmail(req.body.email).catch(err=>console.error('Error checking of user', err.stack));
  if(user){
    let match=await bcrypt.compare(req.body.password, user.password).catch(err=>console.error('Error comparing passwords', err.stack));
    if(match){
      let usr=await changeSession(req.body.email, req.session.id).catch(err=>console.error('Error changing session', err.stack));
      if(usr.uid){
        let ukgs=await selectuserkgs(usr.uid).catch(err=>console.error('Error getting user kids gardens', err.stack));
        req.session.unid=usr.id;
        dispatchAndRespond(req, res, {
          type: C.USER_ATH,
          login: usr.email,
          islogined: true,
          userskgs: ukgs
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

router.post("/createaccount", async (req, res)=>{
  const user=await getUserbyEmail(req.body.email);
  if(!user){
    const hash=await bcrypt.hash(req.body.password, 10);
    const user_data=await addUser(req.body.email, hash, req.session.id);
    if(user_data.uid){
      req.session.unid=user_data.uid;
            
      dispatchAndRespond(req, res, {
        type: C.USER_ATH,
        login: user_data.email,
        islogined: true
      });
    }
    else{
      dispatchAndRespond(req, res, stopSubmit('createaccount', {_error:'Such user already exists!'}));
    } 
  }
  else{
    dispatchAndRespond(req, res, stopSubmit('createaccount', {_error:'Such user already exists!'}));
  }
});

router.post("/forgotpass", async(req, res)=>{
  const user=await getUserbyEmail(req.body.email);
  if(user.uid){
    
    let token=`${Date.now()}_${getRandomInt(100,1000)}_${user.uid}_${req.session.id}`;
    const hash=await bcrypt.hash(token, 12);
    const user_time=await updateUserToken(hash, user.uid);
    
    let link=`http://kidsgarden.pro/recoverpass/${token}`;
    let sent=sendLettertoRecoverPass(user.email, link).catch(console.error);
    dispatchAndRespond(req, res, {
      type: C.PASS_RECOVERY,
      status: 'sent',
      time: user_time.time,
    });
    
  }
  else{
    dispatchAndRespond(req, res, stopSubmit('fogotpassword', {_error:'We have not user with such e-mail!'}));
  }
});

router.post("/checklink", async(req, res)=>{
  let nowtime=Date.now();
  let expired_time=nowtime-Date.parse(req.store.getState().user.forgotpass.time)<1800000;
  if(expired_time){
    let user=await getUserbyID(req.body.id);
    let match=await bcrypt.compare(req.body.token, user.token);
    if(match){
      nowtime-Date.parse(user.time)>1800000?
        dispatchAndRespond(req, res, {
          type: C.PASS_RECOVERY,
          status: 'false',
          time: "",
        }):
        dispatchAndRespond(req, res, {
          type: C.PASS_RECOVERY,
          status: 'true',
          time: "",
        });
    }
    else{
      dispatchAndRespond(req, res, {
        type: C.PASS_RECOVERY,
        status: 'false',
        time: "",
      })
    }
  
  }
  else{
    dispatchAndRespond(req, res, {
      type: C.PASS_RECOVERY,
      status: 'false',
      time: "",
    })
  }
});

router.post ("/passchange", async(req, res)=>{
  const user=await getUserbyEmail(req.body.user);
  const hash=await bcrypt.hash(req.body.pass, 10);
  const uid=await updateUserPass(hash, user.uid);
  if(uid){
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
  }
  else{
    dispatchAndRespond(req, res, stopSubmit('passchange', {_error:'The password has not been changed! Somthing went wrong!'}));
  }
});

router.post ("/passrecovery", async(req, res)=>{
  const hash=await bcrypt.hash(req.body.pass, 10);
  const user=await updateUserPass(hash, req.body.user);
  if(user){
    dispatchAndRespond(req, res, {
      type: C.PASS_RECOVERY,
      status: "",
      time: "",
    });
  }
  else{
    dispatchAndRespond(req, res, stopSubmit('passrecovery', {_error:'The password have not been changed! Somthing went wrong!'}));
  }
});

export default router;