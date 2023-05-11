import React from 'react';
import "./Select.css";
import Problem from '../../class/Problem';

const Select = ({prob}: {prob: Problem}) => {

    return (
        <div className="Select">
            <Code code={prob.getCode()}/>
            <Title title={prob.getTitle()}/>
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

const Title = ({title}: {title: string}) => {
    return (
        <div className="Title">
            <img src={ require("../../img/b1.png") }/>
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
