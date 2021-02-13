import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import GlobalStyle from './GlobalStyle';
import store from './store';
import Container from './components/Styles/Container';
import H4 from './components/Styles/H4';
import Main from './components/Main';

const App = () => {
  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <Main />
    </Container>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById('root')
);
