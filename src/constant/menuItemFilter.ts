export enum MENU_ITEM_VALUE  {
  kpis= 'kpis',
  admin = "admin",
  clientContact = 'clientContact',
  clientName = "clientName",
  statClient = 'statClient',
  range = "range",
  office = "office"
}
export const MENU_ITEM_FILTER:{label:string,value:string}[] = [
  {
    label:"Kpis",
    value: MENU_ITEM_VALUE.kpis
  },
  {
    label:"Admin",
    value:MENU_ITEM_VALUE.admin
  },
  {
    label:"Client Contact",
    value:MENU_ITEM_VALUE.clientContact
  },
  {
    label:"Client Name",
    value:MENU_ITEM_VALUE.clientName
  },
  {
    label:"Stat Client",
    value:MENU_ITEM_VALUE.statClient
  },{
    label: "Offices",
    value:MENU_ITEM_VALUE.office
  },
  {
    label:"Date Range",
    value:MENU_ITEM_VALUE.range
  }
]