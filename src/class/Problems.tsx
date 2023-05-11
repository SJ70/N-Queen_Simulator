import Problem from "./Problem";
import N_Queen from "../components/simulator/N_Queen/N_Queen";

const enum Lv {
    UNKNOWN, ZERO, B5, B4, B3, B2, B1, S5, S4, S3, S2, S1, G5, G4, G3, G2, G1, P5, P4, P3, P2, P1, D5, D4, D3, D2, D1, R5, R4, R3, R2, R1
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
        this.Arr.push(new Problem(9663, Lv.G4, "N-Queen", "기본적인 백트래킹 문제", ["백트래킹"], <N_Queen/>));
    }
}

export default Problems;