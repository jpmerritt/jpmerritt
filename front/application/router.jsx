/**
 * Bootsrap our react app - defined route structure / redux store
*/


// Require global styles/defaults for use throughout the app
import "./shared/global.scss";

// npm modules
import React                                         from "react";
import ReactDOM                                      from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { createStore }                               from 'redux'
import { Provider, connect }                         from "react-redux";
import { syncHistoryWithStore, routerReducer }       from 'react-router-redux'

import reducers       from "Rindex.js";
import configureStore from "configureStore.js";

import Landing from "./screens/landing"

const store = createStore( reducers );
const history = syncHistoryWithStore( browserHistory, store );





/**
 * Render app route
 * rootInstance / module.hot wrapper are a workaround for webpack hot loading https://github.com/gaearon/react-hot-loader/tree/master/docs#usage-with-external-react
*/
let rootInstance = ReactDOM.render((
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={Landing} />
		</Router>
	</Provider>
), document.getElementsByClassName("reactApp")[0] );


if ( module.hot ) {
	require( "react-hot-loader/Injection" ).RootInstanceProvider.injectProvider({
		getRootInstances: function () {
			// Help React Hot Loader figure out the root component instances on the page:
			return [ rootInstance ];
		}
	});
}