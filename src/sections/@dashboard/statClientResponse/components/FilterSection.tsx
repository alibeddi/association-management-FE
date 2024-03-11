import { Box } from '@mui/system'
import React from 'react'
import { IFilterStatClientResponse } from '../../../../@types/FilterStatClientResponse'
import ChoicesSelect from '../../../../components/ChoicesSelect'
import RenderSelectFilter from '../form/RenderSelectFilter'

type IProps = {
  filter : IFilterStatClientResponse
}

export default function FilterSection ({filter}:IProps){
  return (
    <>
    <Box sx={{ gridRow: '1 / 2', gridColumn: '2 / 3',width:'100%' }}>
      <RenderSelectFilter filter={filter}/>
    </Box>
      <Box sx={{ gridRow: '2 / 3', gridColumn: '1 / 3' }}>
          {filter.type==="kpis" && filter.value !=="" ? <ChoicesSelect key={filter.id} value={filter}  /> : null}
    </Box> 
              
    </>
  )
}


