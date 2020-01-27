import * as mockData from './mock-data-import';
import "../public/manifest.json";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app';
import Container from './dipendency-injection/container';
import AddressRepository from './repositories/address-repository';

mockData;

let container = new Container();

let ar = container.resolve(AddressRepository);

console.log(ar.checkInjection());

let ar2 = container.resolve(AddressRepository);

console.log(ar2.checkInjection())

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
