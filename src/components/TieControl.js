import React from 'react';
import upArrowImg from '../assets/up.png';
import downArrowImg from '../assets/down.png';
import noneArrowImg from '../assets/none.png';

const TieControl = (props) => {
    let arrow = noneArrowImg;
    if (props.arrow === "up")
        return (
            <img 
                src={upArrowImg} 
                alt="Up Arrow"
                title="Teams are tied on all tiebreakers. Draw lots and click to change team's order."
                onClick={(event) => props.arrowClicked(event, [props.group, props.teamIndex, true])}
            />
        );
    else if (props.arrow === "down")
        return (
            <img 
                src={downArrowImg} 
                alt="Down Arrow"
                title="Teams are tied on all tiebreakers. Draw lots and click to change team's order."
                onClick={(event) => props.arrowClicked(event, [props.group, props.teamIndex, false])}
            />
        );
    return (
        <img 
            src={arrow} 
            alt="No Arrow"
        />
    );
}

export default TieControl;