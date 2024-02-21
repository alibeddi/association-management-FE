import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
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
import { getAnalytics } from '../redux/slices/analytics/actions';
import { ic_operators } from '../assets/icons/navbar';
// ----------------------------------------------------------------------

export default function GeneralAnalyticsPage() {
  const theme = useTheme();

  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();

  const { analytics } = useSelector((state: RootState) => state.analytics);

  useEffect(() => {
    dispatch(getAnalytics());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Analytics</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Analytics
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={2.4}>
            <AnalyticsWidgetSummary
              title="Offices"
              total={analytics?.nbOffices}
              icon="vaadin:office"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <AnalyticsWidgetSummary
              title="Users"
              total={analytics?.nbEmployees}
              color="info"
              icon="mdi:users"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <AnalyticsWidgetSummary
              title="KPI's"
              total={analytics?.nbKpis}
              color="error"
              icon="fluent-mdl2:analytics-report"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <AnalyticsWidgetSummary
              title="Stat Clients"
              total={analytics?.nbStatClients}
              color="error"
              icon="material-symbols:list-alt"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <AnalyticsWidgetSummary
              title="Stat Client Responses"
              total={analytics?.nbStatClientResponses}
              color="error"
              icon="fluent:text-bullet-list-square-edit-20-regular"
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AnalyticsWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chart={{
                labels: [
                  '01/01/2003',
                  '02/01/2003',
                  '03/01/2003',
                  '04/01/2003',
                  '05/01/2003',
                  '06/01/2003',
                  '07/01/2003',
                  '08/01/2003',
                  '09/01/2003',
                  '10/01/2003',
                  '11/01/2003',
                ],
                series: [
                  {
                    name: 'Team A',
                    type: 'column',
                    fill: 'solid',
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                  },
                  // {
                  //   name: 'Team B',
                  //   type: 'area',
                  //   fill: 'gradient',
                  //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                  // },
                  // {
                  //   name: 'Team C',
                  //   type: 'line',
                  //   fill: 'solid',
                  //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                  // },
                ],
              }}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentVisits
              title="Current Visits"
              chart={{
                series: [
                  { label: 'America', value: 4344 },
                  { label: 'Asia', value: 5435 },
                  { label: 'Europe', value: 1443 },
                  { label: 'Africa', value: 4443 },
                ],
                colors: [
                  theme.palette.primary.main,
                  theme.palette.info.main,
                  theme.palette.error.main,
                  theme.palette.warning.main,
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chart={{
                series: [
                  { label: 'Italy', value: 400 },
                  { label: 'Japan', value: 430 },
                  { label: 'China', value: 448 },
                  { label: 'Canada', value: 470 },
                  { label: 'France', value: 540 },
                  { label: 'Germany', value: 580 },
                  { label: 'South Korea', value: 690 },
                  { label: 'Netherlands', value: 1100 },
                  { label: 'United States', value: 1200 },
                  { label: 'United Kingdom', value: 1380 },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentSubject
              title="Current Subject"
              chart={{
                categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
                series: [
                  { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                  { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                  { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsNewsUpdate title="News Update" list={_analyticPost} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsOrderTimeline title="Order Timeline" list={_analyticOrderTimeline} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsTrafficBySite title="Traffic by Site" list={_analyticTraffic} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
