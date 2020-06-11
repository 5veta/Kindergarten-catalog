export const required = value => ((value) ? undefined : 'Required');

export const emailvalid=value=>(value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))? undefined: 'Invalid email address';

export const muxlengthCreator=(maxlength)=>(value)=>(value && value.length>maxlength)?`Must be ${maxlength} characters or less`:undefined;

export const minlengthCreator=(minlength)=>(value)=>(value && value.length<minlength)?`Must be ${minlength} characters or more`:undefined;

export const sitevalid=value=>(value && /^https*:\/\/[A-Z0-9.-]+\/*[A-ZА-Яа-яЁёіІїЇҐґ0-9.-?&_%+-=\/]*$/i.test(value))? undefined: 'Invalid web-address';

export const number = value =>!/^[\d\.]+$/ ? 'Must be a number' : undefined;

export const phoneNumber = value =>value && !/^(\+\d{1,3}\s*\d{9,12},*)+$/i.test(value) ? 'Invalid phone number' : undefined;

export const houseapptNumber = value => value && !/^[0-9А-Яа-яЁёіІїЇҐґ\/-]+$/gi.test(value) ? 'Invalid data' : undefined;

export const lettersPointDash= value => value && !/^[\wА-Яа-яЁёіІїЇҐґ\s.'-]$/gi.test(value) ? 'Invalid words' : undefined;
export const lettersPointDashPattern=/^[\wА-Яа-яЁёіІїЇҐґ\s.'-]$/gi;

export const normalizePhone=value=>{
    let arr=value.split('');
    let re=/[\d+\s,]/;
    let resarr=[].concat(arr).map(v=>
        re.test(v)?v:''
    );
    
    return resarr.join('');
};
