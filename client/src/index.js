import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

// Import Containers
import App from "./App";
// import Counter from './containers/Counter';
// import Stuff from './containers/Stuff';
import Signup from "./containers/Signup";
import Signin from "./containers/Signin";
import Signout from "./containers/Signout";

// import Todo from './containers/Todo';

// Import components
import Main from "./components/Pages/Main";

import reducers from "./reducers";
import MealSelect from "./components/Pages/MealSelect";

// configure redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem("token") }
  },
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Route exact path="/" component={Main} />
        <Route exact path="/signup" component={Signup} />
        {/* <Route exact path='/:id' component={Profile}/>
        <Route exact path='/mealselect' component={MealSelect}/>
        <Route exact path='/grocerylist' component={GroceryList}/> */}

        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signout" component={Signout} />
        <Route exact path="/mealselect" component={MealSelect} />
        {/* <Route exact path='/counter' component={Counter}/>
        <Route exact path='/stuff' component={Stuff}/>
        <Route exact path='/todo' component={Todo}/> */}
      </App>
    </Router>
  </Provider>,
  document.getElementById("root")
);
