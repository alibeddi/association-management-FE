import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack } from '@mui/system';
import { Checkbox, FormControlLabel } from '@mui/material';
import { RootState } from '../../redux/store';
import { getOnekpi } from '../../redux/slices/kpis/actions';
import { IFilterStatClientResponse } from '../../@types/FilterStatClientResponse';
import { FrontType } from '../../@types/Kpi';
import { IResponseFilter } from '../../@types/AsyncSelectFilter';




const ChoicesSelect = ({ value }: { value: IFilterStatClientResponse
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if(typeof value.value === "string")
   { 
    dispatch(getOnekpi({ kpiId: value.value }));
  }
  }, [dispatch, value]);

  const { kpi } = useSelector((store: RootState) => store.kpis);
  const [selectedChoices, setSelectedChoices] = useState<IResponseFilter>({});

  useEffect(() => {
    const initialSelectedChoices = {} as IResponseFilter;
    if (kpi?.choices) {
      kpi.choices.forEach((choice: string) => {
        initialSelectedChoices[choice] = false;
      });
      setSelectedChoices(initialSelectedChoices);
    }
  }, [kpi]);
  if (kpi && ![FrontType.SELECT,FrontType.CHECKBOX,FrontType.RADIO,FrontType.SWITCH].includes(kpi?.frontType)) {
    return (
      <Box sx={{
        fontSize: '.8rem',
        color: 'red'
      }}>
        KPI cannot be selected when there are no choices available.
      </Box>
    );
  }
  // const handleChangeFilters = (choices:IResponseFilter) => {
  //   setFilters(prev => {
  //     const index = prev.findIndex(filter => filter.id === (kpi ? kpi._id : null));
  
  //     if (index !== -1) {
  //       const updatedFilters = [...prev];
  //       updatedFilters[index] = {
  //         ...updatedFilters[index],
  //         type: 'response',
  //         value:"response",
  //         choices
  //       };
  //       return updatedFilters;
  //     } 
  //       return [
  //         ...prev,
  //         {
  //           id: kpi ? kpi._id : new Date().toString(),
  //           type: 'response',
  //           value:"response",
  //           choices
  //         }
  //       ];
      
  //   });
  // };
    const handleCheckboxChange = (choice: string) => {
    const updatedChoices = {
      ...selectedChoices,
      [choice]: !selectedChoices[choice]
    };
    setSelectedChoices(updatedChoices);
    // handleChangeFilters(updatedChoices)
  };

  return (
    <Stack sx={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    }}>
      {
      
      
      ( kpi?.frontType===FrontType.SWITCH ? ['true','false'] :kpi?.choices  )?.map((choice: string) => (
  <FormControlLabel
          key={choice}
          control={<Checkbox checked={selectedChoices[choice]} onChange={(e) => {handleCheckboxChange(choice);}} />}
          label={choice}

        />
       
      ))}
    </Stack>
  );
};

export default ChoicesSelect;
