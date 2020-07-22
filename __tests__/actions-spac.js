import C from '../src/constants';
import storeFactory from '../src/store';

describe("addKindergarten", ()=>{
    let store;
    const kgardens=[
        {kgid: 0,
            img: "som.jpg", 
            name: "Name", 
            descr: "some description", 
            site: "http://somesite.com", 
            phonen: ["+380991112225"], 
            time:{from: "8:00", to: "19:00"}, 
            age:{from: "2", to: "6"}, 
            price:{halfday: "250", day: "500", month: "15000", year: "200000", annual: "5000", currency: ["грн.", "₴"] }, 
            address: {aid:"1", sid:"2", house: "5", appt: "4", floor: "1"},  
            lessons: [{ldesc: "Розвиток мови, читання, азбука, навчання грамоті (формування зв’язного мовлення, розвиток словника, правильної вимови, навичок читати, знання алфавіту)",
            lname: "Розвиток мови"}]
        },
        {
            address: {aid: 11, house: "15", appt: "", floor: "", sid: 522},
            age: {to: "7", from: "2"},
            descr: "Приватний дитячий садок Smaylik.  Власна будівля з закритою територією та ігровим майданчиком. Понад 40-к розвиваючих занятьна місяцьУ нас передбачене корисне та смачне 5-и разове харчування від провідної кейтерінгової компанії, огляд педіатра, вологе прибирання та кварцування приміщення по нормам СЕС, найкраща учбова програма, прогулянки і все це за доступною ціною! Без щорічних внесків. В абонимент повного дня харчування включене.",
            img: "9.png",
            kgid: 9,
            lessons: [{ldesc: "Розвиток мови, читання, азбука, навчання грамоті (…авильної вимови, навичок читати, знання алфавіту)", lname: "Розвиток мови"},
             {ldesc: "Математика, рахунок (кількість і рахунок, геометри…я в просторі, виконання дій складання-віднімання)", lname: "Математика"},
             {ldesc: "Іноземна (англійська) мова у ігровій формі за міжнародною оксфордською програмою", lname: "Англійська мова"},
             {ldesc: "Розвиток моторики, підготовка руки до письма (письмо, малювання, штрихування, вирізання, аплікації)", lname: "Розвиток моторики"},
             {ldesc: "Розвиток психічних процесів (уваги, мислення, пам’яті, уяви, посидючості, слухняності)", lname: "Розвиток психічних процесів"},
             {ldesc: "Творчість, розвиваючі ігри та вправи (вміння міркувати, аналізувати і робити висновки)", lname: "Творчість"},
             {ldesc: "Музика та співи з синтезатором (відбуваються регулярні дитячі виступи)", lname: "Музика та співи"},
             {ldesc: "Акторська майстерність, хореографія (танці)", lname: "Акторська майстерність, хореографія"},
             {ldesc: "Пізнання будови світу, природних явищ, культури інших народів, тощо", lname: "Пізнання будови світу"}],
            name: "Дитячий садок Smaylik",
            phonen: ["066-784-29-99"],
            price: {currency: ["грн.", "₴"], day: "400", halfday: "270", month: "6000", year: ""},
            site: "http://smaylik.kiev.ua/",
            time: {to: "19:00", from: "07:30"}
        }
    ];
    const action={
        type: C.ADD_KGARDEN, 
        kgarden:{
            kgid: 1,
            img: "1.jpg", 
            name: "Name of Kindergarten", 
            descr: "some another description", 
            site: "http://somesite.com", 
            phonen: ["+380991112225"], 
            time:{from: "8:00", to: "19:00"}, 
            age:{from: "2", to: "6"}, 
            price:{halfday: "250", day: "500", month: "15000", year: "200000", annual: "5000", currency: ["грн.", "₴"] }, 
            address: {aid:"1", sid:"2", house: "5", appt: "4", floor: "1"},  
            lessons: [{ldesc: "Розвиток мови, читання, азбука, навчання грамоті (формування зв’язного мовлення, розвиток словника, правильної вимови, навичок читати, знання алфавіту)",
            lname: "Розвиток мови"}]
        }
    };

    beforeAll(()=>{
        store=storeFactory(false, {kgardens});
        store.dispatch(action);
    });

    it("should add a new kindergarten", ()=>expect(store.getState().kgardens.length).toBe(3));
    it("should add aunique guid id", ()=>expect(store.getState().kgardens.filter(kg=>kg.kgid===action.kgarden.kgid))).toBe(0);
});