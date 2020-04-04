import PropTypes from 'prop-types';

const DropdownMenu=({items, selectedItem, selItem=f=>f})=>{
    
    return(
        <div className="dropdown">
            <button className="btn dropdown-toggle" style={{background: "#3b5f82", color: "white"}} type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {selectedItem}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            {  
                items.map((v,i)=>
                    (v!==selectedItem)?
                        <button key={`item${i}`} className="dropdown-item" type="button" onClick={selItem} value={v}>{v}</button>:
                        <div></div>
                )
            }
    
            </div>
        </div>
    );
};

DropdownMenu.propTypes={
    items: PropTypes.array,
    selectedItem: PropTypes.string,
    selItem: PropTypes.func
    
};

const DropdownLang=({items, locale, onChangeLocale=f=>f})=>{
    
    const changeLang=(e)=>{
        let elem=e.target;
        onChangeLocale({locale: e.target.value});
    };
    
    return(
        <DropdownMenu items={items} selectedItem={locale} selItem={changeLang} />
    );
};

DropdownLang.propTypes={
    items: PropTypes.array,
    locale: PropTypes.string,
    onChangeLocale: PropTypes.func
    
};

export default DropdownLang;