import React, { Component } from "react";

export class Layout extends Component {

  public render() {
    return (
        <div className="container">
          {this.props.children}
        </div>
    );
  }
}
