import { Avatar, ListItemIcon, ListItemText } from "@mui/material";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import BusinessIcon from "@mui/icons-material/Business";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TwitterIcon from "@mui/icons-material/Twitter";
import PeopleIcon from "@mui/icons-material/People";

interface ProfileData {
  avatarUrl: string;
  name: string;
  login: string;
  bio: string;
  location: string;
  websiteUrl: string;
  company: string;
  twitterUsername: string;
  followingCount: number;
  followerCount: number;
}

export interface ProfileProps {
  data: ProfileData;
}
export function Profile({ data }: ProfileProps) {
  return (
    <Grid xs={3}>
      <Avatar
        src={data.avatarUrl}
        alt="profile avatar"
        sx={{ width: 260, height: 260 }}
      />
      <List dense={true}>
        <ListItem>
          <ListItemText
            primary={data.name}
            primaryTypographyProps={{ variant: "h6" }}
            secondary={data.login}
            secondaryTypographyProps={{ variant: "subtitle1" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary={data.bio} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText primary={data.location} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText primary={data.websiteUrl} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary={data.company} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <TwitterIcon />
          </ListItemIcon>
          <ListItemText primary={data.twitterUsername} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary={`Following: ${data.followingCount} · Followers: ${data.followerCount}`}
          />
        </ListItem>
      </List>
    </Grid>
  );
}
