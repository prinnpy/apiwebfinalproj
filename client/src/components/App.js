import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';  // helpers to allowing to navigate around the dom
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import Footer from './Footer';


class App extends Component  {
    componentDidMount(){
        this.props.fetchUser();
    }
    render() {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/surveys" component={Dashboard} />
                    <Route path="/surveys/new" component={SurveyNew} />
                    <Footer />
                </div>
            </BrowserRouter>
        </div>
        );
    }
}


export default connect(null, actions)(App);   // once we pass in the actions, they are assigned to the App as props
