// @mui
import { enUS, frFR, arSA } from '@mui/material/locale';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '../assets/icons/flags/ic_flag_en.svg',
  },
  {
    label: 'French',
    value: 'fr',
    systemValue: frFR,
    icon: '../assets/icons/flags/ic_flag_fr.svg',
  },
  {
    label: 'Arabic (Sudan)',
    value: 'ar',
    systemValue: arSA,
    icon: '../assets/icons/flags/ic_flag_sa.svg',
  },
];

export const defaultLang = allLangs[0]; // English
