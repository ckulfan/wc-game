import React from 'react';
import classes from './KnockoutStage.module.css';
import KnockoutFixture from './KnockoutFixture';

const knockoutStage = (props) => {
    let row1 = null;
    let row2 = null;
    let row3 = null;
    let row4 = null;
    let row5 = null;
    let row6 = null;
    let row7 = null;
    let row8 = null;
    const rdOf16 = [];

    if (Object.keys(props.knockout).length > 0) {
        console.log(props.knockout.roundOf16);
        console.log([]);
        console.log(props.knockout.roundOf16 !== []);
        if (props.knockout.roundOf16.length > 0) {
            for (let i = 0; i < 8; i++) {
                rdOf16.push(
                    <KnockoutFixture className={classes.Fixtures}
                        key = {props.knockout.roundOf16[i].teams[0].id + 
                            props.knockout.roundOf16[i].teams[1].id}
                        team1 = {props.teamsDB[props.knockout.roundOf16[i].teams[0].id].name}
                        team1Color = {props.teamsDB[props.knockout.roundOf16[i].teams[0].id].originalRanking}
                        team2 = {props.teamsDB[props.knockout.roundOf16[i].teams[1].id].name}
                        team2Color = {props.teamsDB[props.knockout.roundOf16[i].teams[1].id].originalRanking}
                        fixture = {props.knockout.roundOf16[i]}
                        round = "roundOf16"
                        gameIndex = {i}
                        changed = {props.changed}
                        changedPenalty = {props.changedPenalty}
                    />
                );
            }
        }

        const quarters = [];
        for (let i = 0; i < 4; i++) {
            let name1 = "-----"
            let name2 = "-----";
            let name1Color = "";
            let name2Color = "";

            if (props.knockout.quarterFinals[i].teams[0] !== "") {
                name1 = props.teamsDB[props.knockout.quarterFinals[i].teams[0].id].name;
                name1Color = props.teamsDB[props.knockout.quarterFinals[i].teams[0].id].originalRanking;
            }
            if (props.knockout.quarterFinals[i].teams[1] !== "") {
                name2 = props.teamsDB[props.knockout.quarterFinals[i].teams[1].id].name;
                name2Color = props.teamsDB[props.knockout.quarterFinals[i].teams[1].id].originalRanking;
            }

            quarters.push(
                <KnockoutFixture className={classes.Fixtures}
                    key = {name1 + name2}
                    team1 = {name1}
                    team1Color = {name1Color}
                    team2 = {name2}
                    team2Color = {name2Color}
                    fixture = {props.knockout.quarterFinals[i]}
                    round = "quarterFinals"
                    gameIndex = {i}
                    changed = {props.changed}
                    changedPenalty = {props.changedPenalty}
                    />
    
            );
        }

        const semis = [];
        for (let i = 0; i < 2; i++) {
            let name1 = "-----";
            let name2 = "-----";
            let name1Color = "";
            let name2Color = "";

            if (props.knockout.semiFinals[i].teams[0] !== "") {
                name1 = props.teamsDB[props.knockout.semiFinals[i].teams[0].id].name;
                name1Color = props.teamsDB[props.knockout.semiFinals[i].teams[0].id].originalRanking;
            }
            if (props.knockout.semiFinals[i].teams[1] !== "") {
                name2 = props.teamsDB[props.knockout.semiFinals[i].teams[1].id].name;
                name2Color = props.teamsDB[props.knockout.semiFinals[i].teams[1].id].originalRanking;
            }
           
            semis.push(
                <KnockoutFixture className={classes.Fixtures}
                    key = {name1 + name2}
                    team1 = {name1}
                    team1Color = {name1Color}
                    team2 = {name2}
                    team2Color = {name2Color}
                    fixture = {props.knockout.semiFinals[i]}
                    round = "semiFinals"
                    gameIndex = {i}
                    changed = {props.changed}
                    changedPenalty = {props.changedPenalty}
                    />

            );
        }

        const finals = [];
        for (let i = 0; i < 2; i++) {
            let name1 = "-----";
            let name2 = "-----";
            let name1Color = "";
            let name2Color = "";

            if (props.knockout.finals[i].teams[0] !== "") {
                name1 = props.teamsDB[props.knockout.finals[i].teams[0].id].name;
                name1Color = props.teamsDB[props.knockout.finals[i].teams[0].id].originalRanking;
            }
            if (props.knockout.finals[i].teams[1] !== "") {
                name2 = props.teamsDB[props.knockout.finals[i].teams[1].id].name;
                name2Color = props.teamsDB[props.knockout.finals[i].teams[1].id].originalRanking;
            }

            finals.push(
                <KnockoutFixture className={classes.Fixtures}
                    key = {name1 + name2}
                    team1 = {name1}
                    team1Color = {name1Color}
                    team2 = {name2}
                    team2Color = {name2Color}
                    fixture = {props.knockout.finals[i]}
                    round = "finals"
                    gameIndex = {i}
                    changed = {props.changed}
                    changedPenalty = {props.changedPenalty}
                    />

            );
        }

        if (props.knockout.roundOf16.length > 0) {
            // 16 G1, QF G1, SF G1, Third Place Heading
            row1 = <React.Fragment>
                <td>{rdOf16[0]}</td>
                <td rowSpan="2">{quarters[0]}</td>
                <td rowSpan="4">{semis[0]}</td>
                <th className={classes.ThirdPlaceHeading}>Third Place Game</th>
            </React.Fragment>
            
            // 16 G2, Third Place Game
            row2 = <React.Fragment>
                <td>{rdOf16[1]}</td>
                <td>{finals[1]}</td>
            </React.Fragment>
            
            // 16 G3, GF G2
            row3 = <React.Fragment>
                <td>{rdOf16[2]}</td>
                <td rowSpan="2">{quarters[1]}</td>
            </React.Fragment>

            // 16 G4, Final Game
            row4 = <React.Fragment>
                <td>{rdOf16[3]}</td>
                <td rowSpan="2">
                    <p className={classes.GameTitleHeading}>Final Game</p>
                    {finals[0]}
                </td>
            </React.Fragment>

            // 16 G5, QF G3, SF G2
            row5 = <React.Fragment>
                <td>{rdOf16[4]}</td>
                <td rowSpan="2">{quarters[2]}</td>
                <td rowSpan="4">{semis[1]}</td>
            </React.Fragment>

            // 16 G6
            row6 = <td>{rdOf16[5]}</td>

            // 16 G7, QF G4
            row7 = <React.Fragment>
                <td>{rdOf16[6]}</td>
                <td rowSpan="2">{quarters[3]}</td></React.Fragment>
            
            // 16 G8
            row8 = <td>{rdOf16[7]}</td>
        } else {
           // 16 G1, QF G1, SF G1, Third Place Heading
            row1 = <React.Fragment>
                <td rowSpan="2">{quarters[0]}</td>
                <td rowSpan="4">{semis[0]}</td>
                <th className={classes.ThirdPlaceHeading}>Third Place Game</th>
            </React.Fragment>
            
            // 16 G2, Third Place Game
            row2 = <React.Fragment>
                <td>{finals[1]}</td>
            </React.Fragment>
            
            // 16 G3, GF G2
            row3 = <React.Fragment>
                <td rowSpan="2">{quarters[1]}</td>
            </React.Fragment>

            // 16 G4, Final Game
            row4 = <React.Fragment>
                <td rowSpan="2">
                    <p className={classes.GameTitleHeading}>Final Game</p>
                    {finals[0]}
                </td>
            </React.Fragment>

            // 16 G5, QF G3, SF G2
            row5 = <React.Fragment>
                <td rowSpan="2">{quarters[2]}</td>
                <td rowSpan="4">{semis[1]}</td>
            </React.Fragment>

            // 16 G6
            row6 = <td></td>

            // 16 G7, QF G4
            row7 = <React.Fragment>
                <td rowSpan="2">{quarters[3]}</td></React.Fragment>
            
            // 16 G8
            row8 = <td></td>       
        }
    }

    let headerRow = null;
    if (props.knockout.roundOf16.length > 0) {
        headerRow = <tr>
                        <th>Round of 16</th>
                        <th>Quater Finals</th>
                        <th>Semi Finals</th>
                        <th>Finals</th>
                    </tr>
    } else {
        headerRow = <tr>
                        <th>Quater Finals</th>
                        <th>Semi Finals</th>
                        <th>Finals</th>
                    </tr>
    }


    return (
        <React.Fragment>
            <h2>Knockout Stage</h2>
            <div className={classes.KnockoutStage}>
                <table className={classes.FixtureTable}>
                    <tbody>
                        {headerRow}
                        <tr>
                            {row1}
                        </tr>
                        <tr>
                            {row2}
                        </tr>
                        <tr>
                            {row3}
                        </tr>
                        <tr>
                            {row4}
                        </tr>
                        <tr>
                            {row5}
                        </tr>
                        <tr>
                            {row6}
                        </tr>
                        <tr>
                            {row7}
                        </tr>
                        <tr>
                            {row8}
                        </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default knockoutStage;