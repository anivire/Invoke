import { ModeType } from "./ModeType";

export class Mode {
    constructor(
       public ModeType: ModeType,
       public Title: string,
       public Content: string
    ){}
}