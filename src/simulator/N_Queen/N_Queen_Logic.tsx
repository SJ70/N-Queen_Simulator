class N_Queen_Logic{
    
    private N;
    private checkC: boolean[];
    private checkDir1: boolean[];
    private checkDir2: boolean[];
    private result: number = 0;

    constructor(N: number){
        this.N = N;
        this.checkC = new Array(N);
        this.checkDir1 = new Array(N);
        this.checkDir2 = new Array(N);
    }

    private BT(r:number, c:number): void{
        if(r==this.N){
            this.result++;
            return;
        } 

        let d1: number = r+c;   // 우상향대각
        let d2: number = this.N-1-r+c;  // 우하향대각

        if(!this.checkC[c] && !this.checkDir1[d1] && !this.checkDir2[d2]){
            this.checkC[c] = this.checkDir1[d1] = this.checkDir2[d2] = true;
            this.BT(r+1, 0);
            this.checkC[c] = this.checkDir1[d1] = this.checkDir2[d2] = false;
        }
        if(c+1<this.N){
            this.BT(r, c+1)
        }
    }

    public getResult(): number{
        return this.result;
    }
}

export default N_Queen_Logic;