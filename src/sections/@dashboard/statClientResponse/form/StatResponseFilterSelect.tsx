import { Button, MenuItem, Select } from '@mui/material'
import { Stack } from '@mui/system'
import { useForm } from 'react-hook-form'
import { IFilterStatClientResponse } from '../../../../@types/FilterStatClientResponse'
import FormProvider from "../../../../components/hook-form"
import Iconify from '../../../../components/iconify'
import { MENU_ITEM_FILTER } from '../../../../constant/menuItemFilter'
import { handleChangeOptionfilter, removeFilter } from '../../../../redux/slices/statClientResponse'
import { dispatch } from '../../../../redux/store'
import FilterSection from '../components/FilterSection'

type IProps = {
  filters:  IFilterStatClientResponse[]
}

const StatResponseFilterSelect = ({filters}:IProps) => 
{ 
  const methods = useForm()
  const {watch} = methods;
  const values = watch()
  return <FormProvider methods={methods} >
    <Stack sx={{
      gap:"1rem",
      display:"flex"
    }} 

    >
      {
         filters.map((elt)=>(
          
          !['response','page','limit'].includes(elt.type) ? 
          <Stack key={elt.id} sx={{display:"flex",flexDirection:'column',gap:"1rem"}}>
            <Stack sx={{
              display:'flex',
              flexDirection:'row',
              gap:'1rem',
              "& .css-b62m3t-container":{
                height:"100%"
              }
            }} 
            
            >
            <Stack 
            sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: '10px',flexBasis:"100%"}}
            >
            <Select sx={{gridRow: '1 / 2', gridColumn: '1 / 2',width:'100%' }} name={elt.id} defaultValue={elt.type} onChange={(e)=> dispatch(handleChangeOptionfilter({name:e.target.name,value:e.target.value})) } >
              {
                MENU_ITEM_FILTER.map(({label,value})=><MenuItem value={value}>{label}</MenuItem>)
              }
            </Select>
            <FilterSection filter={elt} />
            
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
            
            }} onClick={()=>dispatch(removeFilter({id:elt.id}))}/>
            </Stack>
              

          </Stack>: null
          
          
        ))
      }
     
    </Stack>
    </FormProvider>
  }


export default StatResponseFilterSelect
