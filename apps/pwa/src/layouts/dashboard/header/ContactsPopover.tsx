import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Typography, ListItemText, ListItemAvatar, MenuItem } from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import { CustomAvatar } from '@/component/custom-avatar';
import Iconify from '@/component/iconify';
import Scrollbar from '@/component/scrollbar';
import MenuPopover from '@/component/menu-popover';
import BadgeStatus from '@/component/badge-status';
import { IconButtonAnimate } from '@/component/animate';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

export default function ContactsPopover() {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const _contacts = [{ id: 1, name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1', status: 'online', lastActivity: new Date() }];

  return (
    <>
      <IconButtonAnimate
        color={openPopover ? 'primary' : 'default'}
        onClick={handleOpenPopover}
        sx={{
          width: 40,
          height: 40,
          ...(openPopover && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <Iconify icon="eva:people-fill" />
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 320 }}>
        <Typography variant="h6" sx={{ p: 1.5 }}>
          Contacts <Typography component="span">({_contacts.length})</Typography>
        </Typography>

        <Scrollbar sx={{ height: ITEM_HEIGHT * 6 }}>
          {_contacts.map((contact) => (
            <MenuItem key={contact.id} sx={{ height: ITEM_HEIGHT }}>
              <ListItemAvatar>
                <CustomAvatar
                  src={contact.avatar}
                  BadgeProps={{
                    badgeContent: <BadgeStatus status={contact.status} />,
                  }}
                />
              </ListItemAvatar>

              <ListItemText
                primary={contact.name}
                secondary={contact.status === 'offline' ? fToNow(contact.lastActivity) : ''}
                primaryTypographyProps={{ typography: 'subtitle2', sx: { mb: 0.25 } }}
                secondaryTypographyProps={{ typography: 'caption' }}
              />
            </MenuItem>
          ))}
        </Scrollbar>
      </MenuPopover>
    </>
  );
}
