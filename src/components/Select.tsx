import React from 'react';
import "./Select.css";
import Problem from '../class/Problem';
import TagEnum from "../class/Tag";
import { Link } from 'react-router-dom';

const Select = ({prob}: {prob: Problem}) => {
    return (
        <div className="Select">
            <Link className="Link" to={`/${prob.getCode()}`}>
                <Code code={prob.getCode()}/>
                <div className="link_title">
                    <Level level={prob.getLevel()}/>
                    <Title title={prob.getTitle()}/>
                </div>
                <Description desc={prob.getDesc()}/>
            </Link>
            <Tags tags={prob.getTag()}/>
            <Src src={prob.getSrc()}/>
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

const Tags = ({tags}: {tags: Set<number>}) => {
    let arr = [];
    for(let tag of tags){
        arr.push(
            <Tag tag={tag} key={tag}/>
        );
    }
    return(
        <div className="Tags">
            {arr}
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
