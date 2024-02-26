import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack } from '@mui/system';
import { Checkbox, FormControlLabel } from '@mui/material';
import { RootState } from '../../redux/store';
import { getOnekpi } from '../../redux/slices/kpis/actions';
import { IFilterStatClientResponse } from '../../@types/FilterStatClientResponse';

const ChoicesSelect = ({ value,setFilters }: { value: IFilterStatClientResponse,  setFilters: Dispatch<SetStateAction<[] | IFilterStatClientResponse[]>>;
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOnekpi({ kpiId: value.value }));
  }, [dispatch, value]);

  const { kpi } = useSelector((store: RootState) => store.kpis);
  const [selectedChoices, setSelectedChoices] = useState<any>({});

  useEffect(() => {
    const initialSelectedChoices: any = {};
    if (kpi?.choices) {
      kpi.choices.forEach((choice: string) => {
        initialSelectedChoices[choice] = false;
      });
      setSelectedChoices(initialSelectedChoices);
    }
  }, [kpi]);

  if (!kpi || kpi?.choices?.length === 0) {
    return (
      <Box sx={{
        fontSize: '.8rem',
        color: 'red'
      }}>
        KPI cannot be selected when there are no choices available.
      </Box>
    );
  }
  const handleChangeFilters = (choices:any) => setFilters(prev=> prev.map(ele=>ele.value=== kpi._id ? {...ele,choices:selectedChoices} : ele))
  const handleCheckboxChange = (choice: string, isChecked: boolean) => {
    const updatedChoices = {
      ...selectedChoices,
      [choice]: !selectedChoices[choice]
    };
    setSelectedChoices(updatedChoices);
    handleChangeFilters(updatedChoices);
  };
  console.log({selectedChoices})

  return (
    <Stack sx={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    }}>
      {kpi?.choices?.map((choice: string) => (
        <FormControlLabel
          key={choice}
          control={<Checkbox checked={selectedChoices[choice]} onChange={(e) => {handleCheckboxChange(choice, e.target.checked);console.log(e.target.checked)}} />}
          label={choice}
        />
      ))}
    </Stack>
  );
};

export default ChoicesSelect;
