import { Button, MenuItem, Select } from '@mui/material'
import { Box, Stack } from '@mui/system'
import  { Dispatch, SetStateAction, useState } from 'react'
import { IFilterStatClientResponse } from '../../../../@types/FilterStatClientResponse'
import ChoicesSelect from '../../../../components/ChoicesSelect'
import Iconify from '../../../../components/iconify'
import { MENU_ITEM_FILTER } from '../../../../constant/menuItemFilter'
import RenderSelectFilter from './RenderSelectFilter'

type IProps = {
  filters:  IFilterStatClientResponse[]
  setFilters: Dispatch<SetStateAction<[] | IFilterStatClientResponse[]>>;
  onDelete: (id:string) => void;
}

const StatResponseFilterSelect = ({filters,setFilters,onDelete}:IProps) => {
  const handleChangeOptionfilter = (name:string,value:string) => {
    setFilters(pre=>pre.map(elt=>elt.id === name ? {...elt,type:value} : elt))
  }
  console.log({filters})
  return (
    <Stack sx={{
      gap:"1rem",
      display:"flex"
    }} 

    >
      {
         filters.map((elt)=>(
          
          !['response','page','limit'].includes(elt.type) ? <Stack key={elt.id} sx={{display:"flex",flexDirection:'column',gap:"1rem"}}>
            <Stack sx={{
              display:'flex',
              flexDirection:'row',
              gap:'1rem',
              "& .css-b62m3t-container":{
                maxWidth:"50%"
              }
            }} >
            <Stack 
            sx={{display:"flex",flexDirection:'row',
            "& *":{flexBasis:'100%'},gap:"1rem",
            flex:1,
            "& .css-12a83d4-MultiValueRemove":{
              flexBasis:'initial'
            },
          }}
            >
            <Select sx={{alignSelf:"flex-start"}} name={elt.id} defaultValue={elt.type} onChange={(e)=> handleChangeOptionfilter(e.target.name,e.target.value) } >
              {
                MENU_ITEM_FILTER.map(({label,value})=><MenuItem value={value}>{label}</MenuItem>)
              }
            </Select>
            <RenderSelectFilter filter={elt} setFilters={setFilters} />
            </Stack>
          <Button  color="error" startIcon={<Iconify icon="material-symbols:delete" 
           />} sx={{
              padding:0,
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              "& .css-gcc2o7-MuiButton-startIcon":{
                margin:"0 !important"
              }  
            
            }} onClick={()=>onDelete(elt.id)}/>
            </Stack>
              
            {elt.type==="kpis" && elt.value !=="" ? <ChoicesSelect key={elt.id} value={elt}  setFilters={setFilters}/> : null}
          </Stack>: null
          
          
        ))
      }
     
    </Stack>
  )
}

export default StatResponseFilterSelect
