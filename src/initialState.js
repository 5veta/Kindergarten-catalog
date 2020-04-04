import {selectallkgardens, selectallcountries, selectallregions, selectallregsdistricts, selectalllocations, selectalltowndistricts, selectallstreets, selectstreetsoftownd, selectstreetsoflocation } from './dbf';
import C from './constants';

export const createObjectforState=(store)=>{
    //let obj={countries:[]};

selectallcountries()
.then(countries=>store.dispatch({type: C.GET_COUNTRIES, countries:countries}))
.catch(error => console.error(`Country: ${error}`));
    
selectallregions()
.then(reg=>store.dispatch({type: C.GET_REGIONS, regions:reg}))
.catch(error => console.error(`Regions: ${error}`));

selectallregsdistricts()
.then(regd=>store.dispatch({type: C.GET_REGDISTRICTS, regiondistricts:regd}))
.catch(error => console.error(`Districts of regions: ${error}`));
            
selectalllocations()
.then(loc=>store.dispatch({type: C.GET_LOCATIONS, locations:loc}))
.catch(error => console.error(`Locations: ${error}`));
                
selectalltowndistricts()
.then(td=>store.dispatch({type: C.GET_TOWNDISTRICTS, towndistricts:td}))
.catch(error => console.error(`Towns districts: ${error}`));
                            
selectallstreets()
.then(streetsl=>store.dispatch({type: C.GET_STREETS, streets:streetsl}))
.catch(error => console.error(`Streets: ${error}`));

selectallkgardens()
.then(kgardens=>{
    //console.log('kgardens:'+JSON.stringify(kgardens));
    let arr=(kgardens.length>0)?kgardens:[];
    
   // console.log('arr:'+JSON.stringify(arr));
    store.dispatch({type: C.GET_KGARDENS, kgardens: arr});
})
.catch(error => console.error(`Kgardens: ${error}`));
                                
   
   //console.log('Res: '+JSON.stringify(obj));
};


