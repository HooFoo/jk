import Injectable from "./injectable";
import "reflect-metadata";

export function Inject(
    target: Injectable,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
) {
}