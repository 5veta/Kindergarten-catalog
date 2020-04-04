import countriesInf from '../server/routes/countriesDb.json';
//import initstate from '../initialState.json';
import dbdata from '../datafromdb.json';
import {addcountry, addregion, addregdistr, addlocation, addtowndistr, addstreet} from '../dbf';
import fs from 'fs';
import {selectallkgardens, selectallcountries, selectallregions, selectallregsdistricts, selectalllocations, selectalltowndistricts, selectallstreets, selectstreetsoftownd, selectstreetsoflocation } from '../dbf';
import path from 'path';

//parseCountries();
export const createObjectforState=()=>{
    //let obj={countries:[]};
    
    let promise=selectallcountries()
    .then(countries=>{
        //let promise6;
        selectallregions()
        .then(regcount=>{
            selectallregsdistricts()
            .then(regird=>{
                selectalllocations()
                .then(rdiloc=>{
                    selectalltowndistricts()
                    .then(locitd=>{
                        selectstreetsoftownd()
                        .then(tdist=>{
                            selectstreetsoflocation()
                            .then(stiloc=>{
                                selectallstreets()
                                .then(streetsl=>{
                                    selectallkgardens()
                                    .then(kgardens=>{
                                        console.log('Res: '+JSON.stringify({countries:countries, regcount:regcount, regird:regird, rdiloc:rdiloc, locitd:locitd, tdist:tdist, stiloc:stiloc}));
                                        fs.writeFile(
                                            path.join(__dirname, '../datafromdb.json'),
                                            JSON.stringify({kgardens:kgardens, countries:countries, regions:regcount, regiondistricts:regird, locations:rdiloc, towndistricts:locitd, streets:streetsl, selectedforadd:{scountry:"",sregions:"",sregiondistricts:"",slocations:"",stowndists:"", addkgid:""}, findKgardens:{countries:[],regions:[],locations:[], submit:""}}),
                                            error => (error) ? console.log("Error saving state!", error) : null
                                        );
                                    
                                        console.log('\nTowndist'+JSON.stringify(locitd));
                                        fs.writeFile(
                                            path.join(__dirname, '../initialState.json'),
                                            JSON.stringify({kgardens:kgardens, countries:countries, regions:regcount, regiondistricts:regird, locations:rdiloc, towndistricts:locitd, streets:streetsl, selectedforadd:{scountry:"",sregions:"",sregiondistricts:"",slocations:"",stowndists:"", addkgid:""}, findKgardens:{countries:[],regions:[],locations:[], submit:""}}),
                                            error => (error) ? console.log("Error saving state!", error) : null
                                        );
                                        return {kgardens:kgardens, countries:countries, regions:regcount, regiondistricts:regird, locations:rdiloc, towndistricts:locitd, streets:streetsl, selectedforadd:{scountry:"",sregions:"",sregiondistricts:"",slocations:"",stowndists:"", addkgid:""}, findKgardens:{countries:[],regions:[],locations:[], submit:""}};
                                    })
                                    .catch(error => console.error(`Kgardens: ${error}`));
                                })
                                .catch(error => console.error(`Streets: ${error}`));
                            })
                            .catch(error => console.error(`Streets of locations: ${error}`));
                        })
                        .catch(error => console.error(`Streets of towns districts: ${error}`));
                    })
                    .catch(error => console.error(`Towns districts: ${error}`));
                })
                .catch(error => console.error(`Locations: ${error}`));
            })
            .catch(error => console.error(`Districts of regions: ${error}`));
        })
        .catch(error => console.error(`Regions: ${error}`));
        
    })
    .catch(error => console.error(`Country: ${error}`));
return promise;
   // promise.then(result=>console.log(JSON.stringify(result)));
   //console.log('Res: '+JSON.stringify(obj));
};


export const addtoobj=()=>{
    let newData = JSON.stringify(dbdata);
    let countriesObj=JSON.parse(newData);
    let countrieslist=countriesObj.countries;
    let regions=countriesObj.regcount;
    let regdists=countriesObj.regird;
    let locats=countriesObj.rdiloc;
    let towndis=countriesObj.locitd;
    let tdstreets=countriesObj.tdist;
    let lstreets=countriesObj.stiloc;
    let obj={};
    obj.countries=[];
    for(let c=0; c<countrieslist.length; c++){
        let objcountry={cid:countrieslist[c].cid, name:countrieslist[c].name};
        obj.countries.push(objcountry);
        obj.countries[c].regions=[];
        let regofc=regions.filter(vl=>vl.cid===countrieslist[c].cid);
        for(let r=0; r<regofc.length; r++){
            let objregion={rid:regofc[r].rid, name:regofc[r].name};
            obj.countries[c].regions.push(objregion);
            obj.countries[c].regions[r].regiondistricts=[];
            let rdofreg=regdists.filter(v=>v.rid===regofc[r].rid);
            for(let rd=0; rd<rdofreg.length; rd++){
                let rdobj={rdid: rdofreg[rd].rdid, name: rdofreg[rd].name};
                obj.countries[c].regions[r].regiondistricts.push(rdobj);
                obj.countries[c].regions[r].regiondistricts[rd].locations=[];
                let locofrd=locats.filter(v=>v.rdid===rdofreg[rd].rdid);
                for(let l=0; l<locofrd.length; l++){
                    let objloc={lid:locofrd[l].lid, name:locofrd[l].name, status:locofrd[l].lstatus};
                    obj.countries[c].regions[r].regiondistricts[rd].locations.push(objloc);
                    
                    let tdofloc=towndis.filter(v=>v.lid===locofrd[l].lid);
                    if(tdofloc.length>0){
                        obj.countries[c].regions[r].regiondistricts[rd].locations[l].towndistricts=[];
                        for(let td=0; td<tdofloc.length; td++){
                            let objtd={tdid:tdofloc[td].tdid, name:tdofloc[td].name};
                            obj.countries[c].regions[r].regiondistricts[rd].locations[l].towndistricts.push(objtd);
                            obj.countries[c].regions[r].regiondistricts[rd].locations[l].towndistricts[td].streets=[];
                            let streetoftd=tdstreets.filter(v=>v.tdid===tdofloc[td].tdid);
                            for(let tds=0; tds<streetoftd.length; tds++){
                                let tdstreetobj={sid:streetoftd[tds].sid, streetname:streetoftd[tds].streetname, streettype:streetoftd[tds].streettype};
                                obj.countries[c].regions[r].regiondistricts[rd].locations[l].towndistricts[td].streets.push(tdstreetobj);
                            }
                        }
                    }
                    else{
                        obj.countries[c].regions[r].regiondistricts[rd].locations[l].streets=[];
                        let streetofl=lstreets.filter(v=>v.lid===locofrd[l].lid);
                        for(let s=0; s<streetofl.length; s++){
                            let streetobj={sid:streetofl[s].sid, streetname: streetofl[s].streetname, streettype: streetofl[s].streettype};
                            obj.countries[c].regions[r].regiondistricts[rd].locations[l].streets.push(streetobj);
                        }
                    }
                    
                }
            }
        }
       
    }
    
    obj.selectedforadd={scountry:"",sregions:[],sregiondistricts:[],slocations:[],stowndists:[]};
    console.log(JSON.stringify(obj));
    fs.writeFile(
        path.join(__dirname, '../testinitialState.json'),
        JSON.stringify(obj),
        error => (error) ? console.log("Error saving state!", error) : null
    );
};
export const parseCountries=()=>{
    let newData = JSON.stringify(countriesInf);
    let countriesObj=JSON.parse(newData);
console.log(newData);
    for(let prop of countriesObj.countries){
      if(prop.hasOwnProperty('name')){
        let data={country: prop.name};
        console.log(prop.name);
        addcountry(data)
        .then(cdata => {
            if(prop.hasOwnProperty('regions')){
            for(let reg of prop.regions){
              if(reg.hasOwnProperty('name')){
                let rdata={region: reg.name, cid: cdata};
                addregion(rdata)
                .then(regid=>{
                    if(reg.hasOwnProperty('regiondistricts')){
                        for(let regiondisticts of reg.regiondistricts){
                          if(regiondisticts.hasOwnProperty('name')){
                            let regdists={regdists:regiondisticts.name, rid:regid};
                            addregdistr(regdists)
                            .then(rdid=>{
                                if(regiondisticts.hasOwnProperty('locations')){
                                  for(let locationsobj of regiondisticts.locations){
                                    let locs={locations:locationsobj.name, rdid:rdid, stausl:locationsobj.status };
                                    addlocation(locs)
                                    .then(lid=>{
                                        
                                        if(locationsobj.hasOwnProperty('streets')){
                                            console.log('Location:'+JSON.stringify(locationsobj));
                                          for(let streetn of locationsobj.streets){
                                            let strinf={streetname:streetn.name, streetype:streetn.type, lid:lid, tdid:''};
                                            addstreet(strinf)
                                            .then(sid=>{
                                               console.log('Street id1:'+JSON.stringify(strinf));
                                            })
                                            .catch(error => console.error(`Street: ${error}`));
                                          }
                                        }
                                        else if(locationsobj.hasOwnProperty('towndists')){
                                            console.log('Location with townd:'+JSON.stringify(locs));
                                          for(let towndistr of locationsobj.towndists){
                                            let tdistr={towndistr:towndistr.name, lid:lid };
                                            addtowndistr(tdistr)
                                            .then(tdid=>{
                                                if(towndistr.hasOwnProperty('streets')){
                                                  for(let streetn of towndistr.streets){
                                                    let strinff={streetname:streetn.name, streetype:streetn.type, lid:lid, tdid:tdid};
                                                    addstreet(strinff)
                                                    .then(stid=>{
                                                        console.log('Street id:'+JSON.stringify(strinff));
                                                    })
                                                    .catch(error => console.error(`Street from towndistr: ${error}`));
                                                  }
                                                }
                                                
                                            })
                                            .catch(error => console.error(`Town district: ${error}`));
                                          }
                                        }
                                      })
                                    .catch(error => console.error(`Locations: ${error}`));
                                  }
                                }
                              })
                            .catch(error => console.error(`Region districts: ${error}`));
                          }
                        }
                    
                    }
                  })
                .catch(error => console.error(`Region: ${error}`));
              }
          }
            }
         })
        .catch(error => console.error(`Country: ${error}`));
        console.log('Started add regions');
        
      }
    }    
};