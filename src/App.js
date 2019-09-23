import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import StyledIcon from './common/styled/icon-styled';
import StyledGlobal from './common/styled/global-styled';
import routes from './routes';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <StyledGlobal />
        <StyledIcon />
        { renderRoutes(routes) }
      </BrowserRouter>
    </Provider>
  );
}

export default App;
