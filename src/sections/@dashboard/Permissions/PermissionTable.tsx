import {
  Checkbox,
  Divider,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useAuthContext } from 'src/auth/useAuthContext';
import Scrollbar from 'src/components/scrollbar';
import { TableNoData } from 'src/components/table';
import { useLocales } from 'src/locales';
import { RootState, useSelector } from 'src/redux/store';    
import { IAgencyUser } from '../../@types/agencyUser';
import { IGroupPermissions } from '../../@types/permissions';
import IsAuthorized from '../../utils/isAuthorized';
import separateWords from '../../utils/manipulateStrings';
import { PERMISSIONS } from '../../utils/permissions';
import { underscoreToCamelCase } from '../../utils/uppercaseAndTrim';
// import CheckboxComponent from '../checkbox/CheckBoxComponent';

type Props = {
  actions: string[];
  entities: string[];
  permissionsAsString: string[] | undefined;
  groupPermissions: IGroupPermissions | null | IAgencyUser;
  superAdminPermissions?: string[];
  isGroupPermissions?: boolean;
};

const PermissionTable = ({
  actions,
  entities,
  groupPermissions,
  permissionsAsString,
  superAdminPermissions,
  isGroupPermissions = false,
}: Props) => {
  const { translate, currentLang } = useLocales();
  const { status } = useSelector((state: RootState) => state.permissions);
  const { user } = useAuthContext();
  const editGroupPermission = IsAuthorized(PERMISSIONS.group.editPermission);
  const isNotFound = !actions.length && !entities.length;
  return (
    <TableContainer sx={{ height: '600px' }}>
      <Scrollbar>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{ width: '50px' }}>
              <TableCell
                style={{
                  width: '50px!important',
                  border: '1.3px solid #e6e6e6',
                  overflow: 'hidden',
                  borderTopLeftRadius: '10px',
                }}
              >
                <Typography noWrap variant="subtitle2" align="right">
                  {`${translate('Permissions')}`}
                </Typography>
                <Divider
                  style={
                    currentLang?.value === 'fr' || currentLang?.value === 'en'
                      ? { rotate: '50deg' }
                      : { rotate: '-50deg' }
                  }
                />
                <Typography variant="subtitle2" noWrap>
                  {`${translate('Models')}`}
                </Typography>
              </TableCell>
              {actions?.map((column, columnIndex) => (
                <TableCell
                  key={column}
                  align="center"
                  sx={{
                    width: 'fit-content !important',
                    border: '1px solid #e6e6e6',
                    textTransform: 'capitalize',
                    borderTopRightRadius: columnIndex === actions.length - 1 ? '10px' : 0,
                  }}
                >
                  {`${translate(column)}`}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {entities?.map((row, rowIndex) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row}>
                <TableCell
                  key={row}
                  sx={{
                    position: 'sticky',
                    border: '1px solid #e6e6e6',
                    textTransform: 'capitalize',
                    borderBottomLeftRadius: rowIndex === entities.length - 1 ? '10px' : 0,
                  }}
                >
                  <Typography variant="subtitle1" noWrap>
                    {`${translate(underscoreToCamelCase(separateWords(row)))}`}
                  </Typography>
                </TableCell>
                {actions?.map((column, columnIndex) => {
                  const hasPermission =
                    user?.role?.code?.toUpperCase() === 'SUPERADMIN'
                      ? superAdminPermissions?.includes(`${row}_${column}`)
                      : user?.permissions.includes(`${row}_${column}`);
                  const isAllowed = !(
                    hasPermission &&
                    ((isGroupPermissions && editGroupPermission) || !isGroupPermissions)
                  );
                  return (
                    <TableCell
                      key={column}
                      align="center"
                      style={{
                        width: 'fit-content',
                        border: '1px solid #e6e6e6',
                        borderBottomRightRadius:
                          rowIndex === entities.length - 1 && columnIndex === actions.length - 1
                            ? '10px'
                            : 0,
                      }}
                    >
                      {!['idle', 'loading'].includes(status) ? (
                        <CheckboxComponent
                          checked={
                            permissionsAsString
                              ? permissionsAsString.includes(`${row}_${column}`)
                              : false
                          }
                          disabled={isAllowed}
                          model={row}
                          action={column}
                          groupPermissions={groupPermissions}
                        />
                      ) : (
                        <Skeleton animation="wave" variant="text" />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
            <TableNoData isNotFound={isNotFound} />
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
};

export default PermissionTable;
