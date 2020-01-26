import webpackResolver from "./webpack-resolver";
import Injectable from "./injectable";

export type ImportDictionary = { [index: string]: () => Promise<any> }



export default class Container {

    //private requires:ImportDictionary;
    private dependencyLoader: (name: string) => Promise<any>;

    public init<T extends Injectable>(defenitions: (new () => T)[]) {



    }

    public resolve<T extends Injectable>(name: string): T {

        return <T><unknown>null;



    }


}