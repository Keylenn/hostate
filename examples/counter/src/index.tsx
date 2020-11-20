/*
 * @Description: 
 * @Author: hejilun
 * @Date: 2020-11-15 20:32:28
 * @LastEditors: hejilun
 * @LastEditTime: 2020-11-20 17:07:47
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Counter from './Counter';
import Info from './Info'
import Com from './Com'

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Counter />
    <br />
    <br />
    <Info />
    <br />
    <br />
    <Com />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
