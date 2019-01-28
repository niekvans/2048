import React from 'react';

export default class Box extends React.Component {

    chooseClass = (number) => {
        return `n${number}`;
    }

    render() {
        return (
            <div className="grid-item">
                <div
                    className={this.chooseClass(this.props.number)}
                >
                    <div className="number">
                        {this.props.number == 0 ? undefined : this.props.number}
                    </div>
                </div>
            </div>
        )
    }
}