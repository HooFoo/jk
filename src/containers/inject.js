import React from "react";

export default function inject(dependencies, Component) {
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
