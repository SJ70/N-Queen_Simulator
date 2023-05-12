import React from 'react';
import "./Select.css";
import Problem from '../class/Problem';
import TagEnum from "../class/Tag";
import { Link } from 'react-router-dom';

const Select = ({prob}: {prob: Problem}) => {
    return (
            <div className="Select">
                <div className="r1">
                    <Code code={prob.getCode()}/>
                    <Tags tags={prob.getTag()}/>
                </div>
                <div className="r2">
                    <Level level={prob.getLevel()}/>
                    <Link to={`/${prob.getCode()}`}>
                        <Title title={prob.getTitle()}/>
                    </Link>
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
const Tags = ({tags}: {tags: number[]}) => {
    return (
        <div className="Tags">
            {tags.map((tag) => (
                <Tag tag={tag} key={tag}/>
            ))}
        </div>
    )
}
const Tag = ({tag}: {tag: number}) => {
    return (
        <div className="Tag">
            <p>
                {TagEnum[tag]}
            </p>
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
