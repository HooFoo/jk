import "reflect-metadata";

export function ClassDecorator(
    constructor: new (...args: any[]) => any,
) {
    console.log(`Decorating ${constructor.name}`);
    


}