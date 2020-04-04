import C from '../constants';



export const user=(state={}, action={ type: null })=>{
    switch (action.type){
        case C.USER_ATH:
            return ({
               login: action.login,
               islogined: action.islogined,
               userskgs: action.userskgs
            });
        default:
            return state;
    }
};

export const useradm=(state={}, action={ type: null })=>{
    switch (action.type){
        case C.ADMUSER_ATH:
            return ({
               login: action.login,
               isAdm: action.isAlogined,
               newkglist: action.newkglist
            });
        case C.GET_NEWKG:
            return ({
                ...state,
                newkglist: state.newkglist.filter(v=>v.kgid!==action.kgid)
            });
        default:
            return state;
    }
};


export const selectedforadd=(state={}, action={ type: null })=>{
    switch (action.type){
        case C.SEL_COUNTRY:
            return ({
                ...state,
                scountry: action.scountry,
                addkgid: ""
            });
        case C.SEL_REGION:
            return ({
                ...state,
                sregions: action.sregions
            });
        case C.SEL_REGDST:
            return ({
                ...state,
                sregiondistricts: action.sregiondistricts
            });
        case C.SEL_LOCATION:
            return ({
                ...state,
                slocations: action.slocations,
                stowndists: ""
            });
        case C.SEL_TOWNDTS:
            return ({
                ...state,
                stowndists: action.stowndists
            });
        case C.SEL_STREET:
            return ({
                ...state,
                sstreet: action.sstreet
            });
        case C.ADDED_KGARDEN:
            return ({
                scountry:"",
                sregions:"",
                sregiondistricts:"",
                slocations:"",
                stowndists:"",
                sstreet:"",
                lessons: [],
                //addkgid: action.kgid
            });
         case C.COUNT_LESSONS:
            return ({
                ...state,
                lessons: state.lessons.concat(['1'])
            });
        default:
            return state;
    }
    
};

export const findKgardens=(state={}, action={ type: null })=>{
    switch (action.type){
        case C.SEL_COUNTRIES:
            return ({
                ...state,
                countries: action.scountries,
                regions:[],
                locations:[],
                submit: false
            });
        case C.SEL_REGIONS:
            return ({
                ...state,
                regions: action.sregions,
                locations:[],
                submit: false
            });
        case C.SEL_LOCATIONS:
            return ({
                ...state,
                locations: action.slocations,
                submit: false
            });
        case C.SET_SUBMIT:
            return ({
                ...state,
                submit: action.ssubmit
            });
            default:
                return state;
    }
    
};

export const countries=(state=[], action={ type: null })=>{
    switch (action.type){
        case C.GET_COUNTRIES:
            return action.countries;
        default:
            return state;
    }
    
};
   
    
export const country=(state={}, action={ type: null })=>{
    return state;
};

export const regions=(state=[], action={ type: null })=>{
     switch (action.type){
        case C.GET_REGIONS:
            return action.regions;
        default:
            return state;
    }
};

export const region=(state={}, action={ type: null })=>{
    return state;
};


export const regiondistricts=(state=[], action={ type: null })=>{
    switch (action.type){
        case C.GET_REGDISTRICTS:
            return action.regiondistricts;
        default:
            return state;
    }
};

export const regiondistrict=(state={}, action={ type: null })=>{
    return state;
};
              
export const locations=(state=[], action={ type: null })=>{
    switch (action.type){
        case C.GET_LOCATIONS:
            return action.locations;
        default:
            return state;
    }
};

export const location=(state={}, action={ type: null })=>{
    return state;
};

export const towndistricts=(state=[], action={ type: null })=>{
    switch (action.type){
        case C.GET_TOWNDISTRICTS:
            return action.towndistricts;
        default:
            return state;
    }
};

export const towndistrict=(state={}, action={ type: null })=>{
    return state;
};

export const streets=(state=[], action={ type: null })=>{
    switch (action.type){
        case C.GET_STREETS:
            return action.streets;
        default:
            return state;
    }
};

export const street=(state={}, action={ type: null })=>{
    return state;
};

export const kgardens=(state=[], action={type: null})=>{
    switch (action.type){
        case C.GET_KGARDENS:
        return action.kgardens;
        case C.ADD_KGARDEN:
            return state.concat(action.kgarden);
        default:
            return state;
    }
};

export const kgarden=(state={}, action={type: null})=>{
    
            return state;
    
};

export const translator=(state={}, action={type: null})=>{
    switch (action.type){
        case C.CHANGE_LOCALE:
        return ({
            ...state,
            locale: action.locale
            });
        default:
            return state;
    }
};

export const currency=(state=[], action={type: null})=>{
    return state;
};
