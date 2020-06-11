import countriesInf from '../server/routes/countriesDb.json';
//import initstate from '../initialState.json';
import dbdata from '../datafromdb.json';
import {addcountry, addregion, addregdistr, addlocation, addtowndistr, addstreet} from '../db/addresses';
import fs from 'fs';
import {selectallkgardens, selectallcountries, selectallregions, selectallregsdistricts, selectalllocations, selectalltowndistricts, selectallstreets, selectstreetsoftownd, selectstreetsoflocation } from '../dbf';
import path from 'path';

export const parseCountries=async()=>{
    let newData = JSON.stringify(countriesInf);
    let countriesObj=JSON.parse(newData);

    for(let prop of countriesObj.countries){
        if(prop.hasOwnProperty('name')){
            let data={country: prop.name};
            console.log(prop.name);
            let cdata=await addcountry(data).catch(error => console.error(`Country: ${error}`));
            if(prop.hasOwnProperty('regions')){
                for(let reg of prop.regions){
                    if(reg.hasOwnProperty('name')){
                        let rdata={region: reg.name, cid: cdata};
                        let regid=await addregion(rdata).catch(error => console.error(`Region: ${error}`));
                        if(reg.hasOwnProperty('regiondistricts')){
                            for(let regiondisticts of reg.regiondistricts){
                                if(regiondisticts.hasOwnProperty('name')){
                                    let regdists={regdists:regiondisticts.name, rid:regid};
                                    let rdid=await addregdistr(regdists).catch(error => console.error(`Region districts: ${error}`));
                                    if(regiondisticts.hasOwnProperty('locations')){
                                        for(let locationsobj of regiondisticts.locations){
                                            let locs={locations:locationsobj.name, rdid:rdid, stausl:locationsobj.status };
                                            let lid=addlocation(locs).catch(error => console.error(`Locations: ${error}`));
                                            if(locationsobj.hasOwnProperty('streets')){
                                                for(let streetn of locationsobj.streets){
                                                    let strinf={streetname:streetn.name, streetype:streetn.type, lid:lid, tdid:''};
                                                    let sid=await addstreet(strinf).catch(error => console.error(`Street: ${error}`));
                                                    console.log('Street id1:'+JSON.stringify(strinf));                                   
                                                }
                                            }
                                            else if(locationsobj.hasOwnProperty('towndists')){    
                                                for(let towndistr of locationsobj.towndists){
                                                    let tdistr={towndistr:towndistr.name, lid:lid };
                                                    let tdid=await addtowndistr(tdistr).catch(error => console.error(`Town district: ${error}`));
                                                    if(towndistr.hasOwnProperty('streets')){
                                                        for(let streetn of towndistr.streets){
                                                            let strinff={streetname:streetn.name, streetype:streetn.type, lid:lid, tdid:tdid};
                                                            let stid=await addstreet(strinff).catch(error => console.error(`Street from towndistr: ${error}`));
                                                            console.log('Street id:'+JSON.stringify(strinff));        
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }        
        }
    }    
};