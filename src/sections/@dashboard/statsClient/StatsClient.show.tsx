import { TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useForm } from 'react-hook-form';
import { IKpi } from '../../../@types/Kpi';
import { IStatsClient } from '../../../@types/statsClient';
import RenderField from '../../../components/RenderField';
import FormProvider from '../../../components/hook-form/FormProvider'


type IProps = {
  statsClient: IStatsClient;
}

const StatsClientView = ({statsClient}:IProps) => {
  const methods = useForm()
  const {kpis = [], name = ''} = statsClient;

  return (
    <>
    <FormProvider methods={methods} style={
      {
        display:'flex',
        flexDirection:'column',
        gap:'1rem'
      }
    }>
    <Typography>{statsClient.name}</Typography>
    <Stack>
    {
        kpis.length > 0 && kpis.map((kpi:IKpi, index:number) => (
          <Stack sx={{m:1,display:'flex', gap:'1rem'}} key={index}>
          <Typography>{kpi.label} : </Typography>
          <Box >
            <RenderField {...kpi}  />
          </Box>
          </Stack>
          
        ))
      }
    </Stack>
      
    </FormProvider>
    
 
    </>
  );
}

export default StatsClientView;
