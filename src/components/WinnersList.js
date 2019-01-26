import React from 'react';

import database from '../firebase/firebase';

export default class WinnersList extends React.Component {

    state = {
        winners: []
    };

    componentDidMount() {
        database.ref('/scores').on('value', (snapshot) => {
            const snap = snapshot.val();
            const winners = [];
            for (let winner in snap) {
                winners.push({
                    name: snap[winner].name,
                    score: parseInt(snap[winner].score)
                })
            };
            winners.sort((a, b) => {
                if (a.score > b.score) {
                    return -1
                }
                else {
                    return 1
                }
            });
            this.setState({
                winners: winners
            });



        });
    }

    render() {

        return (
            <div className="winner-list">
                <table className="winner-table">
                    <thead>
                        <tr className="table-header">
                            <th className="table-header-item left-top">Ranking</th>
                            <th className="table-header-item">Name</th>
                            <th className="table-header-item right-top">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.winners.map((winner, index) => {
                            return (
                                <tr key={winner.score} className="table-row">
                                    <th className="table-item">{index + 1}</th>
                                    <th className="table-item">{winner.name}</th>
                                    <th className="table-item">{winner.score}</th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        )
    }
}