import { Route, Switch, Redirect } from 'react-router-dom';
import { AddKgardens, FormtoSel, KgardenDetails, LoginF, CreateAccountF, MenuC, LoginAF, UserAccaunt, AdmAccaunt, ForgotPass, PasswordRecovery, FooterC} from './containers.js';
import '../../App.css'; 




const App =()=>
        
        <Switch>
                <Route exact path="/moder" component={LoginAF}/>        
                <Route path="/" component={()=>(
                        <div className="vh-100">
                        <MenuC />
                        <Switch>
                                <Route exact path="/" component={FormtoSel}/>
                                <Route exact path="/sel/:cids" component={FormtoSel}/>
                                <Route exact path="/sel/:cids/:regids" component={FormtoSel}/>
                                <Route exact path="/sel/:cids/:regids/:locids" component={FormtoSel}/>
                                <Route exact path="/kgardens/:id" component={KgardenDetails} />
                                <Route path="/login" component={LoginF}/>
                                <Route path="/createaccount" component={CreateAccountF}/>
                                <Route path="/forgotpass" component={ForgotPass}/>
                                <Route path="/recoverpass/:token" component={PasswordRecovery}/>
                                <Route path="/accaunt" component={UserAccaunt}/>
                                <Route path="/admin" component={AdmAccaunt}/>
                        </Switch>
                        <FooterC />
                        </div>
                )}/>
        </Switch>
export default App;