import { IKpi } from "../@types/Kpi";

interface MyObject {
  _id: string; 
}


export default function processObject(array: IKpi[]) {
  const results: string[] = [];

  array.forEach((ele) => {
    const name = ele._id;
    results.push(name);
  });

  return results;
}
