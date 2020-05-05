import React from 'react'

const InfoBar = ({room}) => {
    return(
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src="" alt="online image" />
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/"><img src="" alt="close image"/></a>
            </div>
        </div>
    )
}

export default InfoBar;