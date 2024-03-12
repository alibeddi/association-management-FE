import { Box, TableCell, Tooltip, Typography } from '@mui/material';
import { FrontType, IKpi } from '../../../../../@types/Kpi';

const RenderTableCell = (item: { kpi: IKpi; response: Array<any> }) => {
  const { kpi, response } = item;
  switch (kpi.frontType) {
    case FrontType.INPUT:
    case FrontType.RADIO:
    case FrontType.SELECT:
    case FrontType.TEXTAREA:
      return (
        <TableCell>
          <Typography
            variant="subtitle2"
            noWrap
            sx={{
              maxWidth: 150,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {response[0] || '______'}
          </Typography>
        </TableCell>
      );
    case FrontType.CHECKBOX:
      return (
        <TableCell align="left">
          {response?.length > 0 && response[0] ? (
            <Tooltip
              title={
                <>
                  {response?.map((option: string, index: number) => (
                    <p key={index}>{option}</p>
                  ))}
                </>
              }
            >
              <Box
                sx={{
                  maxWidth: 100,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {response?.join(', ')}
              </Box>
            </Tooltip>
          ) : (
            <Box>______</Box>
          )}
        </TableCell>
      );
    case FrontType.SWITCH:
      return (
        <TableCell align="left">
          <Box
            sx={{
              color: response[0] ? '#3EAB55' : 'red',
              bgcolor: response[0] ? '#AFE1AF' : 'pink',
              borderRadius: '6px',
              display: 'inline-block',
              padding: '1px 1rem',
            }}
          >
            {response[0].toString()}
          </Box>
        </TableCell>
      );
    default:
      return <></>;
  }
};

export default RenderTableCell;
