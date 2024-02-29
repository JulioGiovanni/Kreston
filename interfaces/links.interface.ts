export interface IArrayLinks {
  text: string;
  Icon: any;
  link?: string;
  accordion?: boolean;
  tooltip?: boolean;
  tooltipText?: string;
  accordionLinks?: IAccordionLinks[];
}
export interface IAccordionLinks {
  link: string;
  text: string;
}
