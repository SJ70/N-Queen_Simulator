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

    public hasTag(str:number): boolean{
        return this.tag.includes(str);
    }

}

export default Problem;