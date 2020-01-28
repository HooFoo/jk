export default abstract class Injectable
{
    public dependencies: Injectable[] = [];

    protected resolve<T extends Injectable>(): T {
        return this.dependencies.find(x => x as T != null) as T;
    }

    public abstract inject(...args: Injectable[]): void;
}