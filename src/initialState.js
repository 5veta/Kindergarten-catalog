import {selectallcountries, selectallregions, selectallregsdistricts, selectalllocations, selectalltowndistricts, selectallstreets} from './db/addresses';
import {selectallkgardens} from './db/kindergartens';
import C from './constants';

export const createObjectforState=(store)=>{

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
        let arr=(kgardens.length>0)?kgardens:[];
        store.dispatch({type: C.GET_KGARDENS, kgardens: arr});
    })
    .catch(error => console.error(`Kgardens: ${error}`));

};


