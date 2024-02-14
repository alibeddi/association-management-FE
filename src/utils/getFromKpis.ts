import { IKpi } from "../@types/Kpi";

interface MyObject {
  _id: string; 
}


export default function processObject(obj: Record<string, MyObject>, indexArray: { value: IKpi; num: number }[]) {
  const results: string[] = [];

  indexArray.forEach(i => {
    const name = obj[`stats-client-${i.num}`]?._id as string;
    results.push(name);
  });

  return results;
}
