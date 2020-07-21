import C from './src/constants';
import {kgarden} from './src/store/reducers';

describe("kindergarten reducer", ()=>{
    it("ADD_KGARDEN success", ()=>{
        const state={};
        const action={
            type: C.ADD_KGARDEN, 
            kgarden:{
                kgid: 0, img: 'som.jpg', 
                name: "Name", 
                descr: "some description", 
                site: "http://somesite.com", 
                phonen: "+380991112225", 
                time:{from: "8:00", to: "19:00"}, 
                age:{from: 2, to: 6}, 
                price:{halfday: 250, day: 500, month: 15000, year: 200000, annual: 5000, currency: ["грн.", "₴"] }, 
                address: {aid:1, sid:2, house: '5', appt: '4', floor: '1'}, 
                lessons: [{ldesc: "Розвиток мови, читання, азбука, навчання грамоті (формування зв’язного мовлення, розвиток словника, правильної вимови, навичок читати, знання алфавіту)"
                lname: "Розвиток мови"}]
            }
        };
        const results=kgarden(state, action);
        expect(results)
            .toEqual({
                kgid: 60,
                img: '60.jpg', 
                name: "Name", 
                descr: "some description", 
                site: "http://somesite.com", 
                phonen: "+380991112225", 
                time:{from: "8:00", to: "19:00"}, 
                age:{from: 2, to: 6}, 
                price:{halfday: 250, day: 500, month: 15000, year: 200000, annual: 5000, currency: ["грн.", "₴"] }, 
                address: {aid:1, sid:2, house: '5', appt: '4', floor: '1'}, 
                lessons: [{ldesc: "Розвиток мови, читання, азбука, навчання грамоті (формування зв’язного мовлення, розвиток словника, правильної вимови, навичок читати, знання алфавіту)",
                    lname: "Розвиток мови"}]
            });
    });
});