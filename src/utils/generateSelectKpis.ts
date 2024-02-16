import { number } from "yup";
import { IKpi } from "../@types/Kpi";

export const generateSelectKpis = (kpis: IKpi[]) => kpis.map((kpi, index) => ({ num: index, value: kpi }));

