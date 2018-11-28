import React, { Component } from 'react';

import  Layout from './components/Layout/Layout.js';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

import classes from  './components/Layout/Layout.css';
class App extends Component {
  render() {
    return (
      <div>
        <Layout className={classes.Content}>
          <BurgerBuilder/>
        </Layout>
      </div>
    );
  }
}

export default App;
