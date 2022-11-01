import React from "react";
import "../styles/App.css";
import { useQuery, gql } from "@apollo/client";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BusinessIcon from "@mui/icons-material/Business";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TwitterIcon from "@mui/icons-material/Twitter";
import Grid from "@mui/material/Unstable_Grid2";
import PeopleIcon from "@mui/icons-material/People";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const GET_VIEWER = gql`
  query GetViewer {
    viewer {
      name
      login
      avatarUrl(size: 260)
      location
      bio
      twitterUsername
      websiteUrl
      company
      followers {
        totalCount
      }
      following {
        totalCount
      }
      pinnedItems(first: 10, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            name
            description
            languages(first: 1, orderBy: { direction: DESC, field: SIZE }) {
              nodes {
                name
                color
              }
            }
            url
            stargazerCount
            forkCount
          }
        }
      }
      repositories(first: 5, orderBy: { direction: DESC, field: PUSHED_AT }) {
        nodes {
          name
        }
      }
    }
  }
`;

function DisplayViewer() {
  const { loading, error, data } = useQuery(GET_VIEWER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error 🙁</p>;

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={3}>
          <Avatar
            src={data.viewer.avatarUrl}
            alt="profile avatar"
            sx={{ width: 260, height: 260 }}
          />
          <List dense={true}>
            <ListItem>
              <ListItemText
                primary={data.viewer.name}
                primaryTypographyProps={{ variant: "h6" }}
                secondary={data.viewer.login}
                secondaryTypographyProps={{ variant: "subtitle1" }}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary={data.viewer.bio} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary={data.viewer.location} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>
              <ListItemText primary={data.viewer.websiteUrl} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary={data.viewer.company} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <TwitterIcon />
              </ListItemIcon>
              <ListItemText primary={data.viewer.twitterUsername} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText
                primary={`Following: ${data.viewer.following.totalCount} · Followers: ${data.viewer.followers.totalCount}`}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid xs={9}>
          <div>
            <Grid container spacing={1}>
              {data.viewer.pinnedItems.nodes.map((repo: any) => {
                return (
                  <Grid xs={6}>
                    <Card>
                      <CardContent>
                        <Typography sx={{ mb: 1 }}>
                          <a href={repo.url} rel="noreferrer" target="_blank">
                            <strong>{repo.name}</strong>
                          </a>
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                          {repo.description}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                          {repo.languages.nodes.length > 0 && (
                            <>
                              <span
                                style={{ color: repo.languages.nodes[0].color }}
                              >
                                ●
                              </span>{" "}
                              {repo.languages.nodes[0].name}{" "}
                              {repo.stargazerCount} {repo.forkCount}
                            </>
                          )}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Grid>
      </Grid>
      <div>
        {data.viewer.repositories.nodes.map((repo: any) => {
          return <p>{repo.name}</p>;
        })}
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <CssBaseline />
      <Container sx={{ my: 4 }}>
        <DisplayViewer />
      </Container>
    </>
  );
}

export default App;
