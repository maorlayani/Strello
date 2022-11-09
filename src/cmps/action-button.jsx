import React from 'react'

export const ActionButton = ({ onClickFunc, iconCmp, name }) => {

    return (
        <button className="btn abilities" onClick={() => onClickFunc(name.toLowerCase())}>
            <span className="icon">
                {React.createElement(iconCmp)}
            </span>
            <span className="ability">{name}</span>
        </button>
    )
}

