export enum MENU_ITEM_VALUE  {
  kpis= 'kpis',
  admin = "admin",
  clientContact = 'clientContact',
  clientName = "clientName",
  statClient = 'statClient',
  range = "range"
}
export const MENU_ITEM_FILTER:{label:string,value:string}[] = [
  {
    label:"kpis",
    value: MENU_ITEM_VALUE.kpis
  },
  {
    label:"admin",
    value:MENU_ITEM_VALUE.admin
  },
  {
    label:"client contact",
    value:MENU_ITEM_VALUE.clientContact
  },
  {
    label:"client name",
    value:MENU_ITEM_VALUE.clientName
  },
  {
    label:"stat client",
    value:MENU_ITEM_VALUE.statClient
  },
  {
    label:"date range",
    value:MENU_ITEM_VALUE.range
  }
]