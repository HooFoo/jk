import * as React from "react";

export default function inject<T extends object>(dependencies: any, Component: React.ComponentType<T>) {
  return class Injector extends React.Component {
    render() {
      return <Component
        {...this.state}
        {...this.props}
        {...dependencies}
      />
    }
  }
}
