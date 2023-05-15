class N_Queen_Logic{
    
    private checkC: boolean[][];
    private checkDir1: boolean[][];
    private checkDir2: boolean[][];

    constructor(N: number){
        this.checkC = new Array(N);
        this.checkDir1 = new Array(N);
        this.checkDir2 = new Array(N);
        for(let i=0; i<N; i++){
            this.checkC[i] = new Array(N);
            this.checkDir1[i] = new Array(N);
            this.checkDir2[i] = new Array(N);
        }
    }
}

export default N_Queen_Logic;