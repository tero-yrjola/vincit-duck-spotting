import React from "react";
import { IndexLink, Link } from "react-router";

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const inspectSightingsClass = location.pathname === "/" ? "active" : "";
    const addSightingsClass = location.pathname.match(/^\/AddSightings/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    return (
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <a href='#' class="navbar-brand" alt="Vincit">
          <img src="VincitLogo.png" styles={{height : '30', paddingRight : '5px'}}/>
        </a>
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav">
                <li class={inspectSightingsClass}>
                  <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Inspect Sightings</IndexLink>
                </li>
                <li class={addSightingsClass}>
                  <Link to="AddSightings" onClick={this.toggleCollapse.bind(this)}>Add sightings</Link>
                </li>
              </ul>
            </div>
          </div>
      </nav>
        );
  }
}
