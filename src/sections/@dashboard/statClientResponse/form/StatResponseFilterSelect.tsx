import { Button, MenuItem, Select } from '@mui/material'
import { Box, Stack } from '@mui/system'
import  { Dispatch, SetStateAction } from 'react'
import { IFilterStatClientResponse } from '../../../../@types/FilterStatClientResponse'
import Iconify from '../../../../components/iconify'
import RenderSelectFilter from './RenderSelectFilter'

type IProps = {
  filters:  IFilterStatClientResponse[]
  setFilters: Dispatch<SetStateAction<[] | IFilterStatClientResponse[]>>;
  onDelete: (id:string) => void;
}

const StatResponseFilterSelect = ({filters,setFilters,onDelete}:IProps) => {
  const handleChangeOptionfilter = (name:string,value:string) => {
    setFilters(pre=>pre.map(ele=>ele.id === name ? {...ele,type:value} : ele))
  }
  return (
    <Stack sx={{
      gap:"1rem",
      display:"flex"
    }} >
      {
         filters.map((ele)=>(
          <Stack key={ele.id} sx={{display:"flex",flexDirection:'row',gap:"1rem"}}>
            <Box sx={{display:"flex",flexDirection:'row',"& *":{flexBasis:'100%'},gap:"1rem",flex:1}}>
            <Select name={ele.id} defaultValue={ele.type} onChange={(e)=> handleChangeOptionfilter(e.target.name,e.target.value) } >
              <MenuItem value="kpis">Kpis</MenuItem>
              <MenuItem value="adminName">admin name</MenuItem>
            </Select>
            <RenderSelectFilter filter={ele} setFilters={setFilters} />
            </Box>
            
            <Button  color="error" startIcon={<Iconify icon="material-symbols:delete" />} onClick={()=>onDelete(ele.id)}/>
          </Stack>
          
        ))
      }
     
    </Stack>
  )
}

export default StatResponseFilterSelect
