import fetch from 'isomorphic-fetch';
import C from './constants';

const parseResponse = response => response.json();

const logError = error => console.error(error);

const fetchThenDispatch = (dispatch, url, method, body) =>{
    fetch(url, {method, body, headers: { 'Content-Type': 'application/json' }})
        .then(parseResponse)
        .then(dispatch)
        .catch(logError);
};

const fetchThenDispatchFile = (dispatch, url, method, body) =>{
    fetch(url, {method, body})
        .then(parseResponse)
        .then(dispatch)
        .catch(logError);
};

export const getListNewKg=()=>dispatch=>{
    fetchThenDispatch(
        dispatch,
        '/moder/new/kindergartens',
        'GET'
    );
};

export const moderateNewKg=(data)=>dispatch=>{
    fetchThenDispatch(
        dispatch,
        `/moder/check/kindergartens/${data.kgid}`,
        'PUT'
    );
};

export const deleteKg=(data)=>dispatch=>{
    fetchThenDispatch(
        dispatch,
        `/moder/kindergartens/${data.kgid}`,
        'DELETE'
    );
};



export const countLessons=(data)=>dispatch=>{
    fetchThenDispatch(
        dispatch,
        '/countries',
        'POST',
        JSON.stringify(data)
    );
};

export const getSelval=(data)=>dispatch=>{
        fetchThenDispatch(
            dispatch,
            '/countries',
            'POST',
            JSON.stringify(data)
        );
};

export const addKgarden=(data)=>dispatch=>{
    fetchThenDispatchFile(
            dispatch,
            '/kindergartens',
            'POST',
            data

    );
};

export const changeLocale=(data)=>dispatch=>{
    fetchThenDispatch(
        dispatch,
        `/translate/${data.locale}`,
        'PUT'
    );
};

//authorization
export const logoutUser=()=>dispatch=>{
    fetchThenDispatch(
        dispatch,
        '/logout',
        'GET'
    );
};

export const logoutAUser=()=>dispatch=>{
    fetchThenDispatch(
        dispatch,
        '/moder/logout',
        'GET'
    );
};

export const addUser=(data)=>dispatch=>{
    fetchThenDispatch(
        dispatch,
        '/createaccount',
        'POST',
        JSON.stringify(data)
    );
};

export const checkUser=(data)=>dispatch=>{
    fetchThenDispatch(
        dispatch,
        '/login',
        'POST',
        JSON.stringify(data)
    );
};


export const checkAUser=(data)=>dispatch=>{
    fetchThenDispatch(
        dispatch,
        '/moder/login',
        'POST',
        JSON.stringify(data)
    );
};

export const forgotPassword=(data)=>dispatch=>{
    fetchThenDispatch(
        dispatch,
        '/forgotpass',
        'POST',
        JSON.stringify(data)
    );
};

export const checkLink=(data)=>dispatch=>{
    fetchThenDispatch(
        dispatch,
        '/checklink',
        'POST',
        JSON.stringify(data)
    );
};

export const recoveryPassword=(data)=>dispatch=>{
    fetchThenDispatch(
        dispatch,
        '/passrecovery',
        'POST',
        JSON.stringify(data)
    );
};

export const changePass=(data)=>dispatch=>{
    fetchThenDispatch(
        dispatch,
        '/passchange',
        'POST',
        JSON.stringify(data)
    );
};

