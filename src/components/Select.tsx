import React from 'react';
import "./Select.css";
import Problem from '../class/Problem';

const Select = ({prob}: {prob: Problem}) => {

    return (
        <div className="Select">
            <Code code={prob.getCode()}/>
            <div className="Lv_Title">
                <Level level={prob.getLevel()}/>
                <Title title={prob.getTitle()}/>
            </div>
            <Description desc={prob.getDesc()}/>
        </div>
    );
}

const Code = ({code}: {code: number}) => {
    return (
        <div className="Code">
            <p>{code}</p>
        </div>
    )
}

const Level = ({level}: {level: string}) => {
    return (
        <div className="Level">
            <img src={ require("../img/level/"+level+".png") }/>
        </div>
    )
}

const Title = ({title}: {title: string}) => {
    return (
        <div className="Title">
            <p>{title}</p>
        </div>
    )
}

const Description = ({desc}: {desc: string}) => {
    return (
        <div className="Description">
            <p>{desc}</p>
        </div>
    )
}

export default Select;
