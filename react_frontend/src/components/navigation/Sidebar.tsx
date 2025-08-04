import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Divider,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  Class as ClassIcon,
  Subject as SubjectIcon,
  Assignment as AssignmentIcon,
  Payment as PaymentIcon,
  LocalLibrary as LibraryIcon,
  Inventory as InventoryIcon,
  Quiz as QuizIcon,
  EventNote as AttendanceIcon,
  DirectionsBus as TransportIcon,
  Hotel as HostelIcon,
  AccountBalance as PayrollIcon,
  Assessment as ReportsIcon,
  Notifications as NotificationsIcon,
  Chat as ChatIcon,
  CardMembership as CertificateIcon,
  Schedule as ScheduleIcon,
  PersonAdd as PersonAddIcon,
  Groups as AlumniIcon,
  TrendingDown as ExpenseIcon,
  TrendingUp as IncomeIcon,
  Business as FrontOfficeIcon,
  Download as DownloadIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import sidebarMenu from '../../config/sidebarMenu.json';

interface SidebarProps {
  onItemClick?: () => void;
}

interface MenuItem {
  title: string;
  icon: React.ReactElement;
  path?: string;
  children?: MenuItem[];
  badge?: string;
}

const iconMap: Record<string, React.ReactElement> = {
  'fa fa-ioxhost ftlayer': <FrontOfficeIcon />,
  'fa fa-user-plus ftlayer': <PersonAddIcon />,
  'fa fa-money ftlayer': <PaymentIcon />,
  'fa fa-usd ftlayer': <IncomeIcon />,
  'fa fa-credit-card ftlayer': <ExpenseIcon />,
  'fa fa-calendar-check-o ftlayer': <AttendanceIcon />,
  'fa fa-map-o ftlayer': <QuizIcon />,
  'fa fa-rss ftlayer': <QuizIcon />,
  'fa fa-list-alt ftlayer': <AssignmentIcon />,
  'fa fa-mortar-board ftlayer': <SchoolIcon />,
  'fa fa-sitemap ftlayer': <PeopleIcon />,
  'fa fa-bullhorn ftlayer': <NotificationsIcon />,
  'fa fa-download ftlayer': <DownloadIcon />,
  'fa fa-flask ftlayer': <AssignmentIcon />,
  'fa fa-book ftlayer': <LibraryIcon />,
  'fa fa-object-group ftlayer': <InventoryIcon />,
  'fa fa-bus ftlayer': <TransportIcon />,
  'fa fa-building-o ftlayer': <HostelIcon />,
  'fa fa-newspaper-o ftlayer': <CertificateIcon />,
  'fa fa-empire ftlayer': <FrontOfficeIcon />,
  'fa fa-universal-access ftlayer': <AlumniIcon />,
  'fa fa-line-chart ftlayer': <ReportsIcon />,
  'fa fa-gears ftlayer': <SettingsIcon />,
  'fa fa-calendar': <ScheduleIcon />,
  // Add more as needed
};

function mapMenuItems(jsonMenu: any[]): MenuItem[] {
  return jsonMenu.map(item => ({
    title: item.label,
    icon: iconMap[item.icon] || <DashboardIcon />,
    path: item.url || undefined,
    children: item.children && item.children.length > 0 ? mapMenuItems(item.children) : undefined,
    badge: undefined,
  }));
}

const menuItems: MenuItem[] = mapMenuItems(sidebarMenu);

// All hardcoded menu definitions removed. Menu items are now generated only from sidebarMenu.json.


const Sidebar: React.FC<SidebarProps> = ({ onItemClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openItems, setOpenItems] = useState<string[]>(['Academic', 'Communication', 'Finance']);

  const handleItemClick = (path?: string) => {
    if (path) {
      navigate(path);
      onItemClick?.();
    }
  };

  const handleToggle = (title: string) => {
    setOpenItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openItems.includes(item.title);
    const active = isActive(item.path);

    return (
      <React.Fragment key={item.title}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => hasChildren ? handleToggle(item.title) : handleItemClick(item.path)}
            sx={{
              pl: 2 + level * 2,
              backgroundColor: active ? 'primary.main' : 'transparent',
              color: active ? 'white' : 'inherit',
              '&:hover': {
                backgroundColor: active ? 'primary.dark' : 'action.hover',
              },
              borderRadius: 1,
              mx: 1,
              mb: 0.5,
            }}
          >
            <ListItemIcon
              sx={{
                color: active ? 'white' : 'inherit',
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              primaryTypographyProps={{
                fontSize: level === 0 ? '0.875rem' : '0.8125rem',
                fontWeight: active ? 600 : 400,
              }}
            />
            {item.badge && (
              <Chip
                label={item.badge}
                size="small"
                color="error"
                sx={{ height: 20, fontSize: '0.75rem' }}
              />
            )}
            {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>
        {hasChildren && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children?.map(child => renderMenuItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <SchoolIcon sx={{ fontSize: 32, color: 'primary.main', mr: 1 }} />
          <Typography variant="h6" fontWeight="bold" color="primary">
            Smart School
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          Management System
        </Typography>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, overflow: 'auto', py: 1 }}>
        <List>
          {menuItems.map(item => renderMenuItem(item))}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="caption" color="text.secondary" align="center" display="block">
          Version 1.0.0
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
