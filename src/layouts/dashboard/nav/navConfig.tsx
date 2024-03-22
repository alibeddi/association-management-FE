import { MethodCode, ModelCode } from '../../../@types/Permission';
import { AuthUserType } from '../../../auth/types';
import SvgColor from '../../../components/svg-color';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { findPermission } from '../../../sections/@dashboard/Permissions/utils';
import {
  ic_operators,
  ic_settings,
  ic_lock,
  ic_calendar,
  ic_stat_client_response,
  ic_call,
  ic_stats_client,
  ic_analytics,
  ic_todolist,
  ic_offices,
  ic_notes,
} from '../../../assets/icons/navbar';
import { RoleCode } from '../../../@types/User';

const icon = (iconSrc: string) => <SvgColor src={iconSrc} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  operators: icon(ic_operators),
  settings: icon(ic_settings),
  groupPermissions: icon(ic_lock),
  calendar: icon(ic_calendar),
  calls: icon(ic_call),
  statsClient: icon(ic_stats_client),
  statClientResponse: icon(ic_stat_client_response),
  analytics: icon(ic_analytics),
  todoList: icon(ic_todolist),
  offices: icon(ic_offices),
  notes: icon(ic_notes),
};

export default function navConfig(user: AuthUserType) {
  const isSuperAdmin = user?.role === RoleCode.SUPER_ADMIN;
  const hasAccessToKpis =
    isSuperAdmin ||
    findPermission(user?.permissionGroup, user?.extraPermissions, ModelCode.KPI, MethodCode.LIST);
  const hasAccessToUsers =
    isSuperAdmin ||
    findPermission(user?.permissionGroup, user?.extraPermissions, ModelCode.USER, MethodCode.LIST);
  const hasAccessToGroupPermissions =
    isSuperAdmin ||
    findPermission(
      user?.permissionGroup,
      user?.extraPermissions,
      ModelCode.PERMISSION_GROUP,
      MethodCode.LIST
    );
  const hasAccessToCalendar =
    isSuperAdmin ||
    findPermission(
      user?.permissionGroup,
      user?.extraPermissions,
      ModelCode.MY_WORKTIME,
      MethodCode.LIST
    );
  const hasAccessToCalls =
    isSuperAdmin ||
    findPermission(user?.permissionGroup, user?.extraPermissions, ModelCode.CALLS, MethodCode.LIST);
  const hasAccessToAnalytics =
    isSuperAdmin ||
    findPermission(
      user?.permissionGroup,
      user?.extraPermissions,
      ModelCode.ANALYTICS,
      MethodCode.LIST
    );
  const hasAccessToStatClient =
    isSuperAdmin ||
    findPermission(
      user?.permissionGroup,
      user?.extraPermissions,
      ModelCode.STAT_CLIENT,
      MethodCode.LIST
    );
  const hasAccessToStatClientAnswers =
    isSuperAdmin ||
    findPermission(
      user?.permissionGroup,
      user?.extraPermissions,
      ModelCode.STAT_CLIENT_RESPONSE,
      MethodCode.LIST
    );
  const hasAccessToTodoList =
    isSuperAdmin ||
    findPermission(user?.permissionGroup, user?.extraPermissions, ModelCode.TODO, MethodCode.LIST);
  const hasAccessToOffices =
    isSuperAdmin ||
    findPermission(
      user?.permissionGroup,
      user?.extraPermissions,
      ModelCode.OFFICE,
      MethodCode.LIST
    );
  const hasAccessToNotes =
    isSuperAdmin ||
    findPermission(user?.permissionGroup, user?.extraPermissions, ModelCode.NOTES, MethodCode.LIST);

  const config = [
    {
      subheader: '',
      items: [
        {
          title: 'Analytics',
          path: PATH_DASHBOARD.analytics,
          icon: ICONS.analytics,
          toBeDisplayed: hasAccessToAnalytics,
        },
        {
          title: 'offices',
          path: PATH_DASHBOARD.offices,
          icon: ICONS.offices,
          toBeDisplayed: hasAccessToOffices,
        },
        {
          title: 'operators',
          path: PATH_DASHBOARD.operators.root,
          icon: ICONS.operators,
          toBeDisplayed: hasAccessToUsers,
        },
        {
          title: 'group permissions',
          path: PATH_DASHBOARD.groupPermissions,
          icon: ICONS.groupPermissions,
          toBeDisplayed: hasAccessToGroupPermissions,
        },
        {
          title: 'calendar',
          path: PATH_DASHBOARD.calender,
          icon: ICONS.calendar,
          toBeDisplayed: hasAccessToCalendar,
        },
        {
          title: 'Todo List',
          path: PATH_DASHBOARD.todoList,
          icon: ICONS.todoList,
          toBeDisplayed: hasAccessToTodoList,
        },
        {
          title: 'Stats client Answers',
          path: PATH_DASHBOARD.statClientResponse.root,
          icon: ICONS.statClientResponse,
          toBeDisplayed: hasAccessToStatClientAnswers,
        },
        {
          title: 'stats client',
          path: PATH_DASHBOARD.statsClient.root,
          icon: ICONS.statsClient,
          toBeDisplayed: hasAccessToStatClient,
        },
        {
          title: 'KPIS',
          path: PATH_DASHBOARD.kpis.root,
          icon: ICONS.settings,
          toBeDisplayed: hasAccessToKpis,
        },
        {
          title: 'calls',
          path: PATH_DASHBOARD.calls,
          icon: ICONS.calls,
          toBeDisplayed: hasAccessToCalls,
        },
        {
          title: 'notes',
          path: PATH_DASHBOARD.notes.root,
          icon: ICONS.notes,
          toBeDisplayed: hasAccessToNotes,
        },
      ],
    },
  ];

  return config;
}
