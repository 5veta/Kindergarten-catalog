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

export const moderateNewKg=(data)=>dispatch=>{
    fetchThenDispatch(
        dispatch,
        '/moder/checkkg',
        'POST',
        JSON.stringify(data)
    );
};

export const getListNewKg=()=>dispatch=>{
    fetchThenDispatch(
        dispatch,
        '/moder/getNewKg',
        'GET'
    );
};

export const changeLocale=(data)=>dispatch=>{
    fetchThenDispatch(
        dispatch,
        '/translate',
        'POST',
        JSON.stringify(data)
    );
};

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
        '/signup',
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

export const getKgardens=(data)=>dispatch=>{
    fetchThenDispatch(
        dispatch,
        '/kgardens',
        'POST',
        JSON.stringify(data)
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

export const getSeltofined=(data)=>dispatch=>{
        fetchThenDispatch(
            dispatch,
            '/kgardens',
            'POST',
            JSON.stringify(data)
        );
};

export const addKgarden=(data)=>dispatch=>{
    fetchThenDispatch(
            dispatch,
            '/user/kgadd',
            'POST',
            JSON.stringify(data)
    );
    //.then(res=>dispatch(getSelval({kgid:res.kgid})))
   // .catch(logError);
};