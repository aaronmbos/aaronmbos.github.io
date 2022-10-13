import React from "react";
import "../styles/App.css";
import { useQuery, gql } from "@apollo/client";

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
      <img
        className="avatar"
        alt="profile avatar"
        src={data.viewer.avatarUrl}
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
      <h2>Repositories</h2>
      <div>
        {data.viewer.pinnedItems.nodes.map((pin: any) => {
          return <p>{pin.name}</p>;
        })}
      </div>
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
