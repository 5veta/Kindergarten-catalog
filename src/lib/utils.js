

export const getRandomInt=(min, max)=>{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
};

const replacer=(key, value)=>{
   if (value instanceof FileList) {
      return Array.from(value).map(file => file.name).join(', ') || 'No Files Selected';
   }
   return value;
};

export const stringify=(values)=>{
   return JSON.stringify(values, replacer, 2);
};
  
export const hoursarray=(i, lasthour, hours)=>{
   let strh;
   if(i<10){
      strh='0'+i;
      hours.push(strh+':00', strh+':15', strh+':30', strh+':45');
      return (i<lasthour)?hoursarray(i+1, lasthour, hours):hours;
   }
   else{
      hours.push(i+':00', i+':15', i+':30', i+':45');
      return (i<lasthour)?hoursarray(i+1, lasthour, hours):hours;
   }     
};

export const agev=[0.6, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 3, 4, 5, 6, 7];

export const kgardensList=(state, regids, locids)=>{
  let kgardens=[];
  
  if(locids!==undefined){
    let lidarr=locids.split("-");
    kgardens=[].concat(...[].concat(...lidarr.map(lv=>state.streets.filter(sv=>String(sv.lid)===lv))).map(stv=>state.kgardens.filter(kgv=>String(kgv.address.sid)===String(stv.sid))));
  }
  else if(regids!==undefined){
    let ridarr=regids.split("-");
    let lregd=[].concat(...ridarr.map(reg=>state.regiondistricts.filter(rd=>String(rd.rid)===reg)));
    let lloc=[].concat(...lregd.map(rd=>state.locations.filter(loc=>loc.rdid===rd.rdid)));
    let lstr=[].concat(...lloc.map(loc=>state.streets.filter(str=>str.lid===loc.lid)));
    kgardens=[].concat(...lstr.map(str=>state.kgardens.filter(kg=>kg.address.sid===str.sid).map(kgobj=>{kgobj.address.strname=`${str.streettype} ${str.streetname}`; let locobj=state.locations.filter(l=>l.lid===str.lid)[0]; kgobj.address.locname=`${locobj.lstatus} ${locobj.name}`; return kgobj;})));
  }
  return kgardens;
};

export const oneKgarden=(state, props)=>{
  let id=props.match.params.id;
   
  let kgardens=(props.match.path===`/admin/added/:id`)?state.useradm.newkglist:(props.match.path===`/accaunt/yourkg/:id`)?state.user.userskgs:state.kgardens;
  let kgarden=kgardens.filter(v=>String(v.kgid)===id)[0];
  let street=state.streets.filter(v=>v.sid===kgarden.address.sid)[0];
  let location=state.locations.filter(v=>v.lid===street.lid)[0];
  let regdis=state.regiondistricts.filter(v=>v.rdid===location.rdid)[0];
  let region=state.regions.filter(v=>v.rid===regdis.rid)[0];
  let country=state.countries.filter(v=>v.cid===region.cid)[0];
  kgarden.address.strname=`${street.streettype} ${street.streetname}`;
  kgarden.address.country=country.name;
  kgarden.address.location=`${location.lstatus} ${location.name}`;
  return kgarden;
};

export const filterRegions=(state, pcity)=>{
  if(pcity!==undefined){
    let countryarr=pcity.split("-");
    let streets=state.kgardens.map(kg=>state.streets.filter(st=>st.sid===kg.address.sid)[0]);
    let locations=state.locations.map(st=>{let arr=streets.filter(loc=>loc.lid===st.lid); return (arr.length>0)?arr[0]:0;}).filter(v=>v!==0).map(str=>state.locations.filter(l=>l.lid===str.lid)[0]);
    let regiondistricts=state.regiondistricts.map(regd=>{let arr=locations.filter(loc=>loc.rdid===regd.rdid); return (arr.length>0)?arr[0]:0;}).filter(v=>v!==0).map(lc=>state.regiondistricts.filter(v=>v.rdid===lc.rdid)[0]);
    let regions=state.regions.map(reg=>{let arr=regiondistricts.filter(regd=>regd.rid===reg.rid); return (arr.length>0)?arr[0]:0;}).filter(v=>v!==0).map(rd=>state.regions.filter(v=>v.rid===rd.rid)[0]);
    let resarr=[].concat(...countryarr.map(cid=>regions.filter(reg=>String(reg.cid)===cid)));
    return resarr;
  }
  else{
    return [];
  }
};

export const filterLocation=(state, pregions)=>{
    if(pregions!==undefined){
      let regsarr=pregions.split("-");
      let streets=state.kgardens.map(kg=>state.streets.filter(st=>st.sid===kg.address.sid)[0]);
      let locations=state.locations.map(st=>{let arr=streets.filter(loc=>loc.lid===st.lid); return (arr.length>0)?arr[0]:0;}).filter(v=>v!==0).map(str=>state.locations.filter(l=>l.lid===str.lid)[0]);
      let regiondistricts=state.regiondistricts.map(regd=>{let arr=locations.filter(loc=>loc.rdid===regd.rdid); return (arr.length>0)?arr[0]:0;}).filter(v=>v!==0).map(lc=>state.regiondistricts.filter(v=>v.rdid===lc.rdid)[0]);
      let rdandlocarr=regiondistricts.map(v=>{let locarr=locations.filter(vlc=>String(vlc.rdid)===String(v.rdid)); return {regdist: v, locations: locarr}; });        let resarr=rdandlocarr.filter(r=>r.locations.length>0);
      return resarr;
    }
    else{
        return [];
    }
};

export const getTranslation=(state, cpart)=>{
    let lang=state.translator.locale;
    let translate=state.translator[lang][cpart];
    return translate;
};


