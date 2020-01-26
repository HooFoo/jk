import Injectable from "./injectable";
import "reflect-metadata";

export function MethodDecorator(
    target: Injectable,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
) {
    console.log(
        `Decorating method ${String(propertyKey)}` +
        ` from ${target.constructor.name}`,
    );

    // console.log(Reflect.getMetadata("design:type", target, propertyKey));
    // // [Function: Function]
    // // Checks the types of all params
   
    // // [[Function: Number]]
    // // Checks the return type
    // console.log(Reflect.getMetadata("design:returntype",  target, propertyKey));
    
    // console.log(descriptor);


    //let params = Reflect.getMetadata("design:paramtypes",  target, propertyKey) as any[];

    // params.forEach(ctor => {
    //     let dependency = new ctor();
    //     target.dependencies.push(dependency);
    // });
}