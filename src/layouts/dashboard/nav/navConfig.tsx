import { MethodCode, ModelCode } from '../../../@types/Permission';
import { AuthUserType } from '../../../auth/types';
import SvgColor from '../../../components/svg-color';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { hasPermission } from '../../../sections/@dashboard/Permissions/utils';

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  operators: icon('ic_operators'),
  fleet: icon('ic_vehicle'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  branches: icon('ic_branches'),
  reservations: icon('ic_reservations'),
  pricing: icon('ic_pricing'),
  settings: icon('ic_settings'),
  groupPermissions: icon('ic_lock'),
  calendar: icon('ic_calendar'),
};

export default function navConfigItems(user: AuthUserType) {
  const userPermissions = user?.permissionGroup[0].permissions;
  const hasAccessToKpis = hasPermission(userPermissions, ModelCode.KPI, MethodCode.LIST);
  const hasAccessToUsers = hasPermission(userPermissions, ModelCode.USER, MethodCode.LIST);
  const hasAccessToCalendar = hasPermission(userPermissions, ModelCode.WORKTIME, MethodCode.LIST);
  const hasAccessToGroupPermissions = hasPermission(
    userPermissions,
    ModelCode.PERMISSION_GROUP,
    MethodCode.LIST
  );

  const config = [
    {
      subheader: '',
      items: [
        {
          title: 'operators',
          path: PATH_DASHBOARD.operators,
          icon: ICONS.operators,
          tobeDisplayed: hasAccessToUsers,
        },
        {
          title: 'kpis',
          path: PATH_DASHBOARD.kpis.root,
          icon: ICONS.settings,
          tobeDisplayed: hasAccessToKpis,
        },
        {
          title: 'group permissions',
          path: PATH_DASHBOARD.groupPermissions,
          icon: ICONS.groupPermissions,
          tobeDisplayed: hasAccessToGroupPermissions,
        },
        {
          title: 'calendar',
          path: PATH_DASHBOARD.calender,
          icon: ICONS.calendar,
          tobeDisplayed: hasAccessToCalendar,
        },
      ],
    },
  ];

  return config;
}
