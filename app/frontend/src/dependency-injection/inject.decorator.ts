import Injectable from "./injectable";
import "reflect-metadata";

export function Inject(
    target: Injectable,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
) {
    console.log(
        `Decorating method ${String(propertyKey)}` +
        ` from ${target.constructor.name}`,
    );
}