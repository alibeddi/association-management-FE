import { Button, Container, MenuItem, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import MenuPopover from '../../components/menu-popover';
import Scrollbar from '../../components/scrollbar';
import { useLocales } from '../../locales';
import { getAllStatsClient } from '../../redux/slices/statsClient/action';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { PATH_DASHBOARD } from '../../routes/paths';
import { StatClientResponsesTables } from '../../sections/@dashboard/statClientResponse/list';

export default function ClientStatusListPage() {
  const { statsClients } = useSelector((state: RootState) => state.statsClient);
  const { translate } = useLocales();
  const navigate = useNavigate();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [options, setOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  useEffect(() => {
    dispatch(getAllStatsClient({ page: 0, limit: 10 }));
  }, []);

  useEffect(() => {
    const fetchedOptions = statsClients.docs.map((statsClient) => ({
      label: statsClient.name,
      value: statsClient._id,
    }));
    setOptions(fetchedOptions);
  }, [statsClients]);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };
  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <Helmet>
        <title>{`${translate('stat-client answers')}`}</title>
      </Helmet>

      <Container maxWidth={false}>
        <CustomBreadcrumbs
          heading="stat-client answers"
          links={[{ name: 'stat-client answers' }]}
        />
        <Stack direction="row" alignItems="center" justifyContent="end" sx={{ marginBottom: 2.5 }}>
          <Button
            color="inherit"
            onClick={handleOpenPopover}
            startIcon={<Iconify icon="ion:create-sharp" />}
            sx={{
              p: 1.5,
              bgcolor: 'action.selected',
              '& .MuiButton-endIcon': { ml: 0.5 },
            }}
          >
            New Stat-client Answer
          </Button>
        </Stack>

        <StatClientResponsesTables />

        <MenuPopover
          open={openPopover}
          onClose={handleClosePopover}
          arrow="top-left"
          sx={{ width: 220 }}
        >
          {options.length > 0 ? (
            <Scrollbar sx={{ maxHeight: '250px' }}>
              {options.map((viewOption) => (
                <MenuItem
                  key={viewOption.value}
                  onClick={() => {
                    handleClosePopover();
                    navigate(`${PATH_DASHBOARD.statClientResponse.new}/${viewOption.value}`);
                  }}
                  sx={{
                    ...(viewOption.value === 'view' && {
                      bgcolor: 'action.selected',
                    }),
                  }}
                >
                  {viewOption.label}
                </MenuItem>
              ))}
            </Scrollbar>
          ) : (
            <Typography>No stat-clients Yet...</Typography>
          )}
        </MenuPopover>
      </Container>
    </>
  );
}
