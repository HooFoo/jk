import Container from "./container";
import * as React from 'react';
import { ResolveDependencyProps } from './resolve-dependency-props';

export default function withDependencies<Props extends ResolveDependencyProps>(WrappedComponent: React.ComponentType<Props>) : React.ComponentType<Omit<Props, "resolve">> {
    let resolve: any =
      (typeCtor: new (...args: any[]) => any) => Container.Instance.resolve(typeCtor);
    return props => (
        <WrappedComponent
          {...props as any}
          resolve={resolve}
        />
    );
}