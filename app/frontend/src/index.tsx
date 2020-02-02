import * as mockData from './mock-data-import';
import "../public/manifest.json";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './init';
import { App } from './app';

mockData;

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
