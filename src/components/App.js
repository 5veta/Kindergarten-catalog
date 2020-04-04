import { Route, Switch, Redirect } from 'react-router-dom';
//import Whoops404 from './ui/Whoops404';
import { AddKgardens, FormtoSel, KgardenDetails, LoginF, SignupF, MenuC, LoginAF, UserAccaunt, AdmAccaunt} from './containers.js';


//import 'bootstrap';


const App =()=>
        <Switch>
                <Route exact path="/moder" component={LoginAF}/>
                
                <Route path="/" component={()=>(
                        <div>
                        <MenuC />
                        <Switch>
                                <Route exact path="/" component={FormtoSel}/>
                                <Route exact path="/sel/:cids" component={FormtoSel}/>
                                <Route exact path="/sel/:cids/:regids" component={FormtoSel}/>
                                <Route exact path="/sel/:cids/:regids/:locids" component={FormtoSel}/>
                                <Route exact path="/kgardens/:id" component={KgardenDetails} />
                                <Route path="/login" component={LoginF}/>
                                <Route path="/signup" component={SignupF}/>
                                <Route path="/accaunt" component={UserAccaunt}/>
                                <Route path="/admin" component={AdmAccaunt}/>
                        </Switch>
                        </div>
                )}/>
        </Switch>
export default App;