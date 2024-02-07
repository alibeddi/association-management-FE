import { BackType, FrontType } from '../../@types/Kpi';

export const frontendTypes = [
  {
    code: 1,
    label: FrontType.CHECKBOX,
  },
  {
    code: 2,
    label: FrontType.RADIO,
  },
  {
    code: 3,
    label: FrontType.SELECT,
  },
  {
    code: 4,
    label: FrontType.TEXTAREA,
  },
];
export const backendTypes = [
  {
    code: 1,
    label: BackType.ARRAY,
  },
  {
    code: 2,
    label: BackType.BOOLEAN,
  },
  {
    code: 3,
    label: BackType.STRING,
  },
];
