export default class Injectable
{
    public dependencies: Injectable[] = [];
    //createInstance(dependencies?: string[]): Promise<Injectable>;

    protected Resolve<T extends Injectable>(): T {
        return this.dependencies.find(x => x as T != null) as T;
    }
}