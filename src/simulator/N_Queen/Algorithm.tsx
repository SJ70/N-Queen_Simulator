import { Encrypt } from './Crypto';

class Algorithm {
    
    private N;
    private checkC: boolean[];
    private checkDir1: boolean[];   // 우상향대각
    private checkDir2: boolean[];  // 우하향대각
    private result: number = 0;

    private history: number[] = [];

    constructor(N: number){
        this.N = N;
        this.checkC = new Array(N);
        this.checkDir1 = new Array(N);
        this.checkDir2 = new Array(N);

        this.BT(0,0);
    }

    private BT(r:number, c:number): void{
        if(r==this.N){
            this.result++;
            return;
        }

        let d1: number = r+c;
        let d2: number = this.N-1-r+c;

        if(!this.checkC[c] && !this.checkDir1[d1] && !this.checkDir2[d2]){
            let code: number = Encrypt(r,c);
            this.checkC[c] = this.checkDir1[d1] = this.checkDir2[d2] = true;
            this.history.push( code );
            this.BT(r+1, 0);
            this.checkC[c] = this.checkDir1[d1] = this.checkDir2[d2] = false;
            this.history.push( code );
        }
        if(c+1<this.N){
            this.BT(r, c+1);
        }
    }

    public getResult(): number{
        return this.result;
    }

    public getHistory(): number[]{
        return this.history;
    }
}

export default Algorithm;