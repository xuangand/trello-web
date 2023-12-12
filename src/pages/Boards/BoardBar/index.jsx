import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  color: 'primary.main',
  bgcolor: 'white',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      borderTop: '1px solid #00bfa5'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label="Dang MERCH STACK board"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filter"
          clickable
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant="outlined" startIcon={<PersonAddIcon />}>Invite</Button>
        <AvatarGroup
          max={4}
          sx={{
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16
            }
          }}
        >
          <Tooltip title="Dang">
            <Avatar
              alt="Dang"
              src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/38577360/original/fe4a778310a86b3072d4f2d2c0b1ee38a4e2a3e7/do-a-spoderman-meme-avatar-of-you.png" />
          </Tooltip>
          <Tooltip title="Dang">
            <Avatar
              alt="Dang"
              src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/38577360/original/fe4a778310a86b3072d4f2d2c0b1ee38a4e2a3e7/do-a-spoderman-meme-avatar-of-you.png" />
          </Tooltip>
          <Tooltip title="Dang">
            <Avatar
              alt="Dang"
              src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/38577360/original/fe4a778310a86b3072d4f2d2c0b1ee38a4e2a3e7/do-a-spoderman-meme-avatar-of-you.png" />
          </Tooltip>
          <Tooltip title="Dang">
            <Avatar
              alt="Dang"
              src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/38577360/original/fe4a778310a86b3072d4f2d2c0b1ee38a4e2a3e7/do-a-spoderman-meme-avatar-of-you.png" />
          </Tooltip>
          <Tooltip title="Dang">
            <Avatar
              alt="Dang"
              src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/38577360/original/fe4a778310a86b3072d4f2d2c0b1ee38a4e2a3e7/do-a-spoderman-meme-avatar-of-you.png" />
          </Tooltip>
          <Tooltip title="Dang">
            <Avatar
              alt="Dang"
              src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/38577360/original/fe4a778310a86b3072d4f2d2c0b1ee38a4e2a3e7/do-a-spoderman-meme-avatar-of-you.png" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
