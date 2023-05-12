import React from 'react';
import "./Select.css";
import Problem from '../class/Problem';

const Select = ({prob}: {prob: Problem}) => {

    return (
        <div className="Select">
            <div className="r1">
                <Code code={prob.getCode()}/>
            </div>
            <div className="r2">
                <Level level={prob.getLevel()}/>
                <Title title={prob.getTitle()}/>
            </div>
            <div className="r1">
                <Description desc={prob.getDesc()}/>
                <Src src={prob.getSrc()}/>
            </div>
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

const Src = ({src}: {src: string}) => {
    return (
        <div className="Src">
            <a href={src} target="_blank">
                문제 보기
            </a>
        </div>
    )
}

export default Select;
