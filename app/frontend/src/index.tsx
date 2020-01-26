import * as mockData from './mock-data-import';
import "../public/manifest.json";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app';
import Container from './dipendency-injection/container';
import AddressRepository from './repositories/address-repository';
import AdvertisementRepository from './repositories/advertisements-repository';

import "reflect-metadata";

mockData;

// class Bar {
// 	public parameters() {
//         let a: ConstructorParameters<typeof AddressRepository>
        


// 		// some other code here
// 	}

// 	doSomething() {
// 	}
// }

// type FirstArgument<T> = T extends (...args: any[]) => any ? "string" : any;
// type SecondArgument<T> = T extends (arg1: any, arg2: infer U, ...args: any[]) => any ? U : any;

// type arg1 = FirstArgument<typeof AddressRepository>; // string;
// type arg2 = SecondArgument<typeof AddressRepository>; // number;

// type ArgumentsType<T> = T extends new (...args: infer A) => any ? A : never;

// type Func = (a: number, b: string) => boolean;
// type Args = ArgumentsType<AddressRepository> // type Args = [number, string];
// type Ret = ReturnType<Func> // type Ret = boolean;


let repo = new AddressRepository();

let params = Reflect.getMetadata("design:paramtypes",  repo, "inject") as any[];

params.forEach(ctor => {
	let dependency = new ctor();

	let dependencyParams = Reflect.getMetadata("design:paramtypes",  dependency, "inject") as any[];

	repo.dependencies.push(dependency);
});
	
let dependency = repo.checkInjection();

console.log(dependency);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
