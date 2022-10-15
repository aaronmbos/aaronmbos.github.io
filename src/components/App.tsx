import React from "react";
import "../styles/App.css";
import { useQuery, gql } from "@apollo/client";
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';

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
        sx={{width: 260, height: 260}}
      />
      <p>{data.viewer.name}</p>
      <p>{data.viewer.login}</p>
      <p>{data.viewer.bio}</p>
      <p>Following: {data.viewer.following.totalCount}</p>
      <p>Followers: {data.viewer.followers.totalCount}</p>
      <p>{data.viewer.location}</p>
      <p>{data.viewer.email}</p>
      <p>{data.viewer.websiteUrl}</p>
      <p>{data.viewer.company}</p>
      <p>{data.viewer.twitterUsername}</p>
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
