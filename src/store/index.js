import { createStore, combineReducers, applyMiddleware } from 'redux';
import { countries, regions, regiondistricts, locations, towndistricts, streets, kgardens, selectedforadd, findKgardens, user, useradm, translator, currency, files} from './reducers';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  files,
  kgardens,
  countries,
  regions,
  regiondistricts,
  locations,
  towndistricts,
  streets,
  selectedforadd,
  findKgardens,
  currency,
  user,
  useradm,
  translator,
  form: formReducer
});

const clientLogger = store => next => action => {
    if (action.type) {
        let result;
        console.groupCollapsed("dispatching", action.type);
        console.log('prev state', store.getState());
        console.log('action', action);
        result = next(action);
        console.log('next state', store.getState());
        console.groupEnd();
        return result;
    } else {
        return next(action);
    }
};

const serverLogger = store => next => action => {
    console.log('\n  dispatching server action\n');
    console.log(action);
    console.log('\n');
    return next(action);
};

const middleware = server => [
    (server) ? serverLogger : clientLogger,
    thunk
];

const storeFactory = (server = false, initialState = {}) =>
    applyMiddleware(...middleware(server))(createStore)(
        rootReducer,
        initialState
    );

export default storeFactory;