import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import 'normalize.css/normalize.css';


import MainPage from './components/MainPage';

const jsx = (
        <MainPage />
);

ReactDOM.render(jsx, document.getElementById('app'));