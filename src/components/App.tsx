import React from "react";
import "../styles/App.css";
import { useQuery, gql } from "@apollo/client";

const GET_VIEWER = gql`
  query GetViewer {
    viewer {
      name
      login
      email
      avatarUrl
      location
      bio
      twitterUsername
      websiteUrl
      followers {
        totalCount
      }
      following {
        totalCount
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
      <img src={data.viewer.avatarUrl} />
      <p>{data.viewer.name}</p>
      <p>{data.viewer.login}</p>
      <p>{data.viewer.bio}</p>
      <p>Following: {data.viewer.following.totalCount}</p>
      <p>Followers: {data.viewer.followers.totalCount}</p>
      <p>{data.viewer.location}</p>
      <p>{data.viewer.email}</p>
      <p>{data.viewer.websiteUrl}</p>
      <p>{data.viewer.twitterUsername}</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <DisplayViewer />
    </div>
  );
}

export default App;
