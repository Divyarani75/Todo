
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import { ShowTodoList } from "./components/showTodoList";
import { CreateTodo } from "./components/createTodo";

import {Header, Footer, Navigator} from './components'
import UL from './containers'
import "./App.scss";
import NotificationContainer from './components/common/react-notifications/NotificationContainer';

import 'react-notifications/lib/notifications.css';


const UserLoginRouters = (props) => (
  
    <Switch>
    
      <Route path="/login" component={UL.Login}/>
      <Route path="/signup" component={UL.Signup}/>
      <Route exact path="/list" component={ShowTodoList}  {...props} />
      <Route path="/create-todo" component={CreateTodo} />
      <Route path="/list/:id" component={ShowTodoList} render={props => <ShowTodoList {...props} />} />
      <Route path="/logout" component={UL.Logout}/>
      <Route render={({match}) => <Redirect to="/"/>}/>
    </Switch>
  )

function App(props) {

    return (        
        <div className="app-contents">
         <>
         <Router>
        <div className="App container">
        <NotificationContainer />
          <Header/>
          <Navigator />
          <UserLoginRouters/>
         
        </div>
      </Router>
           
           
        </> 
        </div>
    );
}

export default App;
