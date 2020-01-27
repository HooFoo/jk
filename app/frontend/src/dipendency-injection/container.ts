import "reflect-metadata";
import Injectable from "./injectable";

type DependencyDictionary = { [index: string]: Injectable }

export default class Container {
    private static instance: Container = new Container();

    public static get Instance() {
        return this.instance;
    }

    private constructor() {}

    public dependencies: DependencyDictionary = {};

    public resolve<T extends Injectable>(typeCtor: new (...args: any[]) => T): T {
        let name = typeCtor.name;

        let instance = this.getDependecy<T>(name);
        if (instance) {
            return instance;
        }

        instance = new typeCtor();
        this.dependencies[name] = instance;

        this.initDependencies(instance);

        return instance;
    }

    private initDependencies(instance: any) {
        let params = Reflect.getMetadata("design:paramtypes",  instance, "inject") as any[];

        params.forEach(ctor => {
            let dependency = this.getDependecy<any>(ctor.name);

            if (!dependency) {
                dependency = new ctor();

                this.dependencies[ctor.name] = dependency;
                this.initDependencies(dependency);
            }

            instance.dependencies.push(dependency);
        });
    }

    private getDependecy<T extends Injectable>(name: string): T {
        if (name in this.dependencies) {
            return this.dependencies[name] as T
        }
        return <T><unknown>null;
    }
}