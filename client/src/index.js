import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv'
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store/store.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

dotenv.config()
axios.defaults.baseURL = process.env.REACT_APP_URL || 'http://localhost:3001'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
