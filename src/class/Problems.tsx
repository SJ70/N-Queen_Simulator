import Problem from "./Problem";
import Tag from "./Tag";

import N_Queen from "../simulator/N_Queen/N_Queen";

class Problems{
    private Arr: Problem[] = [];

    constructor(){
        this.init();
    }

    public getProblems(): Problem[]{
        return this.Arr;
    }

    public searchProblem(code: number): Problem{
        for(let i=0; i<this.Arr.length; i++){
            if(this.Arr[i].getCode() == code) return this.Arr[i];
        }
        return this.Arr[0]; // 찾는 값이 없음 경우: 추후 예외처리 필요
    }

    private init(): void{
        this.Arr.push(new Problem(9663, "G4", "N-Queen", "기본적인 백트래킹 문제", [Tag.백트래킹], <N_Queen/>));
    }
}

export default Problems;