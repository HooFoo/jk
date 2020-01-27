// import * as React from "react";
import Container from "./container";

// export default function withDependencies<T extends object>(Component: React.ComponentType<T>) {
//   let resolve: any =
//         (typeCtor: new (...args: any[]) => any) => Container.Instance.resolve(typeCtor);

//   return class Injector extends React.ComponentType<T> {
//     render() {
//       return <Component
//         {...this.state}
//         {...this.props}
//         {...resolve}
//       />
//     }
//   }
// }

import * as React from 'react';
import { ResolveDependencyProps } from './resolve-dependency-props';

// export interface ResolveProps {
//     additionalProp: string;
// }

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