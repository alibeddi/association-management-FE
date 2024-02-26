import { Button, MenuItem, Select } from '@mui/material'
import { Box, Stack } from '@mui/system'
import  { Dispatch, SetStateAction } from 'react'
import { IFilterStatClientResponse } from '../../../../@types/FilterStatClientResponse'
import ChoicesSelect from '../../../../components/ChoicesSelect'
import Iconify from '../../../../components/iconify'
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
  return (
    <Stack sx={{
      gap:"1rem",
      display:"flex"
    }} 

    >
      {
         filters.map((elt)=>(
          <Stack key={elt.id} sx={{display:"flex",flexDirection:'column',gap:"1rem"}}>
            <Stack sx={{
              display:'flex',
              flexDirection:'row',
              gap:'1rem'
            }} >
            <Stack sx={{display:"flex",flexDirection:'row',"& *":{flexBasis:'100%'},gap:"1rem",flex:1}}>
            <Select name={elt.id} defaultValue={elt.type} onChange={(e)=> handleChangeOptionfilter(e.target.name,e.target.value) } >
              <MenuItem value="kpis">Kpis</MenuItem>
              <MenuItem value="adminName">admin </MenuItem>
              <MenuItem value="clientContact">client contact</MenuItem>
              <MenuItem value="clientName">client name</MenuItem>
              <MenuItem value="statClient">stat client </MenuItem>
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
              
            {elt.type==="kpis" && elt.value !=="" ? <ChoicesSelect value={elt} setFilters={setFilters}/> : null}
          </Stack>
          
        ))
      }
     
    </Stack>
  )
}

export default StatResponseFilterSelect
