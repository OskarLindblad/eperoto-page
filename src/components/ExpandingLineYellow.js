import React, { Component } from "react";
import handleViewport from "react-in-viewport";

class MySectionBlock extends Component {
  getStyle() {
    const { inViewport, enterCount } = this.props;
    //Fade in only the first time we enter the viewport
    if (inViewport && enterCount === 1) {
      return { WebkitTransition: "width 1s ease-in-out", width: "100%" };
    } else if (!inViewport && enterCount < 1) {
      return { WebkitTransition: "none", width: "10px" };
    } else {
      return {};
    }
  }

  render() {
    return (
      <section>
        <div className="inView-line-yellow" style={this.getStyle()}></div>
      </section>
    );
  }
}
const ExpandingLineYellow = handleViewport(MySectionBlock, {
  rootMargin: "-1.0px",
});

export default ExpandingLineYellow;
