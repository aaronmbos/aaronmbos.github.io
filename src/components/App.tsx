import "../styles/App.css";
import { useQuery, gql } from "@apollo/client";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Profile } from "./Profile";

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
        <Profile
          data={{
            name: data.viewer.name as string,
            avatarUrl: data.viewer.avatarUrl as string,
            login: data.viewer.login as string,
            bio: data.viewer.bio as string,
            location: data.viewer.location as string,
            websiteUrl: data.viewer.websiteUrl as string,
            company: data.viewer.company as string,
            twitterUsername: data.viewer.twitterUsername as string,
            followerCount: data.viewer.followers.totalCount as number,
            followingCount: data.viewer.following.totalCount as number,
          }}
        />
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
