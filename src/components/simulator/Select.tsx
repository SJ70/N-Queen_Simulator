import React from 'react';
import "./Select.css";

const Select = () => {
  return (
    <div className="Select">
        <Code/>
        <Title/>
        <Description/>
    </div>
  );
}

const Code = () => {
    return (
        <div className="Code">
            <p>1000</p>
        </div>
    )
}

const Title = () => {
    return (
        <div className="Title">
            <img src={ require("../../img/b1.png") }/>
            <p>A+B</p>
        </div>
    )
}

const Description = () => {
    return (
        <div className="Description">
            <p>횟수가 제한된 버블정렬</p>
        </div>
    )
}

export default Select;
