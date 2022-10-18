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
    }
  }
`;

function DisplayViewer() {
  const { loading, error, data } = useQuery(GET_VIEWER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error 🙁</p>;

  return (
    <div>
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
      </List>
      <p>Following: {data.viewer.following.totalCount}</p>
      <p>Followers: {data.viewer.followers.totalCount}</p>
      <h2>Pinned Repositories</h2>
      <div>
        {data.viewer.pinnedItems.nodes.map((repo: any) => {
          return (
            <>
              <p>
                <a href={repo.url} rel="noreferrer" target="_blank">
                  <strong>{repo.name}</strong>
                </a>
              </p>
              <p>{repo.description}</p>
              {repo.languages.nodes.length > 0 && (
                <p>
                  <span style={{ color: repo.languages.nodes[0].color }}>
                    ●
                  </span>{" "}
                  {repo.languages.nodes[0].name}
                </p>
              )}
              <p>
                <span>★</span> {repo.stargazerCount}
              </p>
              <p>Forks: {repo.forkCount}</p>
            </>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <CssBaseline />
      <Container>
        <DisplayViewer />
      </Container>
    </>
  );
}

export default App;
