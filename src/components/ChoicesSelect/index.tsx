import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack } from '@mui/system';
import { Checkbox, FormControlLabel } from '@mui/material';
import { RootState } from '../../redux/store';
import { getOnekpi } from '../../redux/slices/kpis/actions';
import { IFilterStatClientResponse } from '../../@types/FilterStatClientResponse';
import { FrontType } from '../../@types/Kpi';
import { IResponseFilter } from '../../@types/AsyncSelectFilter';
import { handleChoiceFilters } from '../../redux/slices/statClientResponse';




const ChoicesSelect = ({ value }: { value: IFilterStatClientResponse
}) => {

  const dispatch = useDispatch();
const kpi = value.value;
let initialSelectedChoices: IResponseFilter = {};

if (typeof kpi ==="object" && 'choices' in kpi && kpi?.choices) {
 initialSelectedChoices = kpi.choices.reduce((accumulator, currentValue) => {
    accumulator[currentValue] = false;
    return accumulator;
 }, {} as IResponseFilter);
}

const [selectedChoices, setSelectedChoices] = useState<IResponseFilter>(initialSelectedChoices || {});
  if (kpi && typeof kpi ==="object" && "frontType" in kpi && ![FrontType.SELECT,FrontType.CHECKBOX,FrontType.RADIO,FrontType.SWITCH].includes(kpi?.frontType)) {
    return (
      <Box sx={{
        fontSize: '.8rem',
        color: 'red'
      }}>
        KPI cannot be selected when there are no choices available.
      </Box>
    );
  }

  const handleChangeFilters = (choices:IResponseFilter) => {
    dispatch(handleChoiceFilters({
      id: value.id,
      choices
    }))
  };
  const handleCheckboxChange = (choice: string) => {
   
    setSelectedChoices(prevSelectedChoices => {
       const updatedChoices = {
         ...prevSelectedChoices,
         [choice]: !prevSelectedChoices[choice]
       };
       handleChangeFilters(updatedChoices);
       return updatedChoices;
    });
   };
   

  return (
    <Stack sx={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    }}>
      {
        // eslint-disable-next-line
      (typeof kpi === "object"  && "frontType" in kpi && kpi?.frontType===FrontType.SWITCH ? ['true','false'] :( typeof kpi === "object"  && "choices" in kpi ) ?   kpi?.choices : [] )?.map((choice: string) => (
  <FormControlLabel
          key={choice}
          control={<Checkbox checked={selectedChoices[choice]}  onChange={(e) => {handleCheckboxChange(choice);}} />}
          label={choice}

        />
       
      ))}
    </Stack>
  );
};

export default ChoicesSelect;
