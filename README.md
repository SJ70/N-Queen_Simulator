# N-Queen Simulator
`#DFS` `#백트래킹`  

N-Queen 알고리즘의 동작을 시각적으로 표현하는 웹사이트  

👉 [**Try it**](https://sj70.github.io/N-Queen_Simulator/)  

___
## 알고리즘

체스판 전체에 해당하는 2차원 배열을 이용하지 않음    

체스판의 열, 대각선에 해당하는 1차원 boolean 배열 `checkC`, `checkDir1`, `checkDir2` 를 이용   
말을 놓을 때마다 행값과 열값에 해당하는 열, 대각선 배열 값을 true로 바꿈  
말을 놓으려 할 때 해당하는 배열 값이 하나라도 true라면 그 칸에는 놓을 수 없음  

또한 하나의 행에 하나의 말도 놓지 않는 경우도 배제  

```ts
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
        if(r===this.N){
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
```

___
## 체스판의 변화 기록
알고리즘 실행 시, 체스판의 상태가 변화(true->false, false->true)하는 좌표를 배열에 저장  
이 때 객체 생성을 최소화하기 위하여 좌표를 객체로 저장하지 않고 하나의 number 타입으로 인코딩하여 저장  

```ts
export const Encrypt = (r: number, c: number): number => {
    return r*100 + c;
}

export const Decrypt = (code: number): number[] => {
    return [Math.floor(code/100), code%100];
}
``` 

체스판의 최대 크기 N이 14이므로 *100을 하여도 무방  
최대 크기가 15 이상일 경우 배열이 체스판의 변화를 모두 담을 수 없음  

___
## 디스플레이

주요 기능
- 자동 재생
- 재생 속도 설정
- 이전 화면
- 다음 화면

useState 사용 시 배열의 값 변화는 감지되지 않음  
배열의 주소 자체는 변하지 않기 때문  

이를 해결하기 위해 보통 깊은 복사를 이용  
하지만 해당 프로그램의 경우 깊은 복사를 사용 시 N^2만큼의 시간이 소모됨  
이를 단축시키기 위하여 배열의 각 값에 대한 useState들을 담은 배열을 선언  

___
## 이미지 출처

### N-Queen

흰색 퀸 [[Fandom]](https://chess.fandom.com/wiki/Queen)
