import Injectable from "./injectable";

export interface ResolveDependencyProps {
    resolve: <T extends Injectable>(typeCtor: new (...args: any[]) => T) => T;
}