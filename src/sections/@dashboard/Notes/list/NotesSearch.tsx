import { Autocomplete, InputAdornment, Link, Typography } from '@mui/material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { paramCase } from 'change-case';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Note } from '../../../../@types/Note';
import { CustomTextField } from '../../../../components/custom-input';
import Iconify from '../../../../components/iconify';
import SearchNotFound from '../../../../components/search-not-found';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import axios from '../../../../utils/axios';

// ----------------------------------------------------------------------

export default function NotesSearch() {
  const navigate = useNavigate();

  const [searchNotes, setSearchNotes] = useState('');

  const [searchResults, setSearchResults] = useState<Note[]>([]);

  const handleSearchNotes = async (value: string) => {
    try {
      setSearchNotes(value);
      if (value) {
        const response = await axios.get('notes', {
          params: { search: value },
        });
        setSearchResults(response.data.data.docs);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (id: string) => {
    navigate(PATH_DASHBOARD.notes.view(paramCase(id)));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const foundNote = searchResults.find(
      (note) => note?.title.toLowerCase() === searchNotes.toLowerCase()
    );
    if (foundNote) {
      handleClick(foundNote?._id);
    }
  };

  return (
    <Autocomplete
      size="small"
      autoHighlight
      popupIcon={null}
      options={searchResults}
      onInputChange={(event, value) => handleSearchNotes(value)}
      getOptionLabel={(note: Note) => note.title}
      noOptionsText={<SearchNotFound query={searchNotes} />}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      componentsProps={{
        popper: {
          sx: {
            width: `280px !important`,
          },
        },
        paper: {
          sx: {
            '& .MuiAutocomplete-option': {
              px: `8px !important`,
            },
          },
        },
      }}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          width={220}
          placeholder="Search..."
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, note, { inputValue }) => {
        const { _id, title } = note;
        const matches = match(title, inputValue);
        const parts = parse(title, matches);

        return (
          <li {...props}>
            <Link underline="none" onClick={() => handleClick(_id)}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  variant="subtitle2"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                >
                  {part.text}
                </Typography>
              ))}
            </Link>
          </li>
        );
      }}
    />
  );
}
