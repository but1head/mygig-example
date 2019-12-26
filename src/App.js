import React, { Component } from 'react';
import { Router, BrowserRouter, Route, Switch } from 'react-router-dom';
import Routes, { history } from 'controllers/Router';
import Header from 'components/Header';
import { Provider } from 'react-redux';
import store from 'reducers';

class App extends Component {

  render() {
    const content = Routes.map((route, i) => <Route ref={route.component && route.component.name} key={i} {...route} />);
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Router history={history}>
            <>
              <Header />
              <div className="container p-5">
                <Switch>
                  {content}
                </Switch>
              </div>
            </>
          </Router>
        </BrowserRouter>
      </Provider>
    );
  }
  
}

export default App;
