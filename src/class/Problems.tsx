import Problem from "./Problem";
import N_Queen from "../simulator/N_Queen/N_Queen";

const enum Tag {
    구현, 시뮬레이션, 정렬, 이분탐색, 그리디, BFS, DFS, DP, 누적합, 백트래킹, 브루트포스
}

class Problems{
    private Arr: Problem[] = [];

    constructor(){
        this.init();
    }

    public getProblems(): Problem[]{
        return this.Arr;
    }


    private init(): void{
        this.Arr.push(new Problem(9663, "G4", "N-Queen", "기본적인 백트래킹 문제", [Tag.백트래킹], <N_Queen/>));
    }
}

export default Problems;