import React from 'react';
import classes from './KnockoutFixture.module.css';

const knockoutFixture = (props) => {
    let input1 = "";
    let input2 = "";
    let penaltyInput1 = "";
    let penaltyInput2 = "";
    let team1Goals = 0;
    let team2Goals = 0;
    let team1Penalties = 0;
    let team2Penalties = 0;

    let goalsParsed1 = Number.parseInt(props.fixture["result"][0]);
    if (Number.isNaN(goalsParsed1))
        team1Goals = 0;
    else
        team1Goals = goalsParsed1;

    let goalsParsed2 = Number.parseInt(props.fixture["result"][1]);
    if (Number.isNaN(goalsParsed2))
        team2Goals = 0;
    else
        team2Goals = goalsParsed2;

    let penaltiesParsed1 = Number.parseInt(props.fixture["penalties"][0]);
    if (Number.isNaN(penaltiesParsed1))
        team1Penalties = 0;
    else
        team1Penalties = penaltiesParsed1;

    let penaltiesParsed2 = Number.parseInt(props.fixture["penalties"][1]);
    if (Number.isNaN(penaltiesParsed2))
        team2Penalties = 0;
    else
        team2Penalties = penaltiesParsed2;
    
    if (props.team1 !== "-----") {
        input1 = <input
            className={classes.LeftScoreInput}
            type="text"
            pattern="^[0-9]*$"
            onChange={(event) => props.changed(event, {
                round: props.round,
                gameIndex: props.gameIndex,
                teamIndex: 0
            })}
            value={props.fixture["result"][0]} />
    }

    if (props.team2 !== "-----") {
        input2 = <input
            className={classes.LeftScoreInput}
            type="text"
            pattern="^[0-9]*$"
            onChange={(event) => props.changed(event, {
                round: props.round,
                gameIndex: props.gameIndex,
                teamIndex: 1
            })}
            value={props.fixture["result"][1]} />
    }

    if ((props.team1 !== "-----") && (props.team2 !== "-----")) {
        if ((!Number.isNaN(goalsParsed1)) && (!Number.isNaN(goalsParsed2))) {
            if (team1Goals === team2Goals) {
                penaltyInput1 = <input
                    className={classes.LeftScoreInput}
                    type="text"
                    pattern="^[0-9]*$"
                    title="Enter the number of penalty shootout goals scored."
                    onChange={(event) => props.changedPenalty(event, {
                        round: props.round,
                        gameIndex: props.gameIndex,
                        teamIndex: 0
                    })}
                    value={props.fixture["penalties"][0]} 
                />

                penaltyInput2 = <input
                    className={classes.LeftScoreInput}
                    type="text"
                    pattern="^[0-9]*$"
                    title="Enter the number of penalty shootout goals scored."
                    onChange={(event) => props.changedPenalty(event, {
                        round: props.round,
                        gameIndex: props.gameIndex,
                        teamIndex: 1
                    })}
                    value={props.fixture["penalties"][1]} 
                />
            }
        }
    }

    let team1Class = classes.Normal;
    let team2Class = classes.Normal;
    if (team1Goals > team2Goals)
        team1Class = classes.Winner;
    else if (team2Goals > team1Goals)
        team2Class = classes.Winner;
    else {
        if (team1Penalties > team2Penalties)
            team1Class = classes.Winner;
        else if (team2Penalties > team1Penalties)
            team2Class = classes.Winner;
    }

    let color1Item = classes.BlackItem;
    if (props.team1Color !== "") {
        switch (props.team1Color) {
            case "Black":
                color1Item = classes.BlackItem;
                break;

            case "Red":
                color1Item = classes.RedItem;
                break;

            case "Blue":
                color1Item = classes.BlueItem;
                break;

            case "Green":
                color1Item = classes.GreenItem;
                break;

            case "Yellow":
                color1Item = classes.YellowItem;
                break;

            case "Gray":
                color1Item = classes.GrayItem;
                break;

            default:
                color1Item = classes.BlackItem;
                break;
        }
    }

    let color2Item = classes.BlackItem;
    if (props.team2Color !== "") {
        switch (props.team2Color) {
            case "Black":
                color2Item = classes.BlackItem;
                break;

            case "Red":
                color2Item = classes.RedItem;
                break;

            case "Blue":
                color2Item = classes.BlueItem;
                break;

            case "Green":
                color2Item = classes.GreenItem;
                break;

            case "Yellow":
                color2Item = classes.YellowItem;
                break;

            case "Gray":
                color2Item = classes.GrayItem;
                break;

            default:
                color2Item = classes.BlackItem;
                break;
        }
    }

    return (
        <div className={classes.KnockoutFixture}>
            <table className={classes.FixtureTable}><tbody>
                <tr>
                    <td className={team1Class + " " + color1Item}>{props.team1}</td>
                    <td className={classes.LeftScoreInput}>
                        {input1}
                    </td>
                    <td className={classes.LeftScoreInput}>
                        {penaltyInput1}
                    </td>
                </tr>
                <tr>
                    <td className={team2Class + " " + color2Item}>{props.team2}</td>
                    <td className={classes.LeftScoreInput}>
                        {input2}
                    </td>
                    <td className={classes.LeftScoreInput}>
                        {penaltyInput2}
                    </td>
                </tr>
            </tbody></table>
        </div>
    )
}

export default knockoutFixture;