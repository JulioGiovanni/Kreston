
import { IconType } from "react-icons";

export interface IArrayLinks {
    text: string;
    Icon: IconType;
    link?: string;
    accordion?: boolean;
    accordionLinks?:IAccordionLinks[]
}
export interface IAccordionLinks {
    link:string;
    text:string;
}