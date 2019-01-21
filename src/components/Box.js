import React from 'react';

export default class Box extends React.Component {

    chooseClass = (item) => {
        if (item == 0) {
            return 'grid-number';
        }
        else if (item < 10) {
            return 'small';
        }
        else if (item < 100) {
            return 'medium';
        }
        else if (item < 1000) {
            return 'big';
        }
        else if (item < 10000) {
            return 'super';
        }
        else {
            return 'grid-number';
        }
    }

    render() {
        return (
            <div className="grid-item">
                <div className={this.chooseClass(this.props.number)}>
                    <span className="grid-item">
                        {this.props.number == 0 ? undefined : this.props.number}
                    </span>
                </div>
            </div>
        )
    }
}