class Problem{
    private code: number;
    private level: string;
    private title: string;
    private desc: string;
    private tag: number[];
    private simulator: JSX.Element;

    constructor(code:number, level:string, title:string, desc:string, tag:number[], simulator:JSX.Element){
        this.code = code;
        this.level = level;
        this.title = title;
        this.desc = desc;
        this.tag = tag.sort();
        this.simulator = simulator;
    }

    public getCode(): number{
        return this.code;
    }
    public getLevel(): string{
        return this.level;
    }
    public getTitle(): string{
        return this.title;
    }
    public getDesc(): string {
        return this.desc;
    }
    public getTag(): number[]{
        return this.tag;
    }
    public getComp(): JSX.Element{
        return this.simulator;
    }
    public getSrc(): string{
        return "https://www.acmicpc.net/problem/"+this.code;
    }

    public hasTag(tag:number): boolean{
        if(this.tag[0]>tag && this.tag[this.tag.length-1]<tag) return false;
        // 정렬되어 있으므로 이분탐색
        return this.searchTag(tag, 0, this.tag.length-1);
    }
    private searchTag(target:number, left:number, right:number): boolean{
        if(this.tag[left]==target || this.tag[right]==target) return true;
        if(left==right) return false;
        let mid:number = Math.floor((left+right)/2);
        if(this.tag[mid]==target) return true;
        else if(this.tag[mid]>target) return this.searchTag(target, 0, mid);
        else return this.searchTag(target, mid+1, right);
    }

}

export default Problem;