import React from "react";

export default class Sighting extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        const { id, dateTime, description, species, count } = this.props;
        return (
            <li>
                <span>id: {id}<br/>
                dateTime: {dateTime}<br/>
                description: {description}<br/>
                species: {species}<br/>
                count: {count}</span>
            </li>
        )
    }
}