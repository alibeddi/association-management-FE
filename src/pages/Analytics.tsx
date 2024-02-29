import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Stack } from '@mui/system';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// _mock_
import { _analyticPost, _analyticOrderTimeline, _analyticTraffic } from '../_mock/arrays';
// components
import { useSettingsContext } from '../components/settings';
// sections
import {
  AnalyticsTasks,
  AnalyticsNewsUpdate,
  AnalyticsOrderTimeline,
  AnalyticsCurrentVisits,
  AnalyticsWebsiteVisits,
  AnalyticsTrafficBySite,
  AnalyticsWidgetSummary,
  AnalyticsCurrentSubject,
  AnalyticsConversionRates,
} from '../sections/@dashboard/general/analytics';
import { RootState, useDispatch, useSelector } from '../redux/store';
import { getAnalytics, getNbStatClientResponsesByOffice } from '../redux/slices/analytics/actions';
import { ic_operators } from '../assets/icons/navbar';

import { useDateRangePicker } from '../components/date-range-picker';
// ----------------------------------------------------------------------

export default function GeneralAnalyticsPage() {
  const theme = useTheme();

  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();

  const { analytics, nbStatClientResponsesByOffice } = useSelector(
    (state: RootState) => state.analytics
  );

  const picker = useDateRangePicker(null, null);

  useEffect(() => {
    if (picker.startDate && picker.endDate) {
      dispatch(
        getAnalytics(
          // @ts-ignore
          `?startDate=${picker.startDate?.format('YYYY-MM-DD')}&endDate=${picker.endDate?.format(
            'YYYY-MM-DD'
          )}`
        )
      );
            dispatch(
        getNbStatClientResponsesByOffice(
          // @ts-ignore
          `?startDate=${picker.startDate?.format('YYYY-MM-DD')}&endDate=${picker.endDate?.format(
            'YYYY-MM-DD'
          )}`
        )
      );
    } else {
      dispatch(getAnalytics());
      dispatch(getNbStatClientResponsesByOffice());
    }
  }, [dispatch, picker.startDate, picker.endDate]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Helmet>
              <title>Analytics</title>
            </Helmet>
          </Grid>
          <Grid item container xs={8} justifyContent="flex-end">
            <Grid item xs={4}>
              <DatePicker
                label="Start date"
                value={picker.startDate}
                onChange={picker.onChangeStartDate}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </Grid>

            <Grid item xs={4}>
              <DatePicker
                label="End date"
                value={picker.endDate}
                onChange={picker.onChangeEndDate}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    error={picker.isError}
                    helperText={picker.isError && 'End date must be later than start date'}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>

        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Analytics
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={2.4}>
              <AnalyticsWidgetSummary
                title="Offices"
                total={analytics?.nbOffices}
                color="warning"
                icon="vaadin:office"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2.4}>
              <AnalyticsWidgetSummary
                title="Users"
                total={analytics?.nbEmployees}
                color="error"
                icon="mdi:users"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2.4}>
              <AnalyticsWidgetSummary
                title="KPI's"
                total={analytics?.nbKpis}
                color="primary"
                icon="fluent-mdl2:analytics-report"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2.4}>
              <AnalyticsWidgetSummary
                title="Stat Clients"
                total={analytics?.nbStatClients}
                color="info"
                icon="material-symbols:list-alt"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2.4}>
              <AnalyticsWidgetSummary
                title="Stat Client Responses"
                total={analytics?.nbStatClientResponses}
                color="secondary"
                icon="fluent:text-bullet-list-square-edit-20-regular"
              />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <AnalyticsCurrentVisits
                title="Stat-Client Responses By Office"
                chart={{
                  series: nbStatClientResponsesByOffice?.map((el) => ({
                    label: el?.office?.name,
                    value: el?.nbStatClientResponses,
                  })),
                  colors: [
                    theme.palette.primary.main,
                    theme.palette.info.main,
                    theme.palette.error.main,
                    theme.palette.warning.main,
                  ],
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </LocalizationProvider>
    </>
  );
}
