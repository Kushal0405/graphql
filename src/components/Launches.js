import { ApolloClient, gql, InMemoryCache, NetworkStatus, useQuery } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { Box, Container, Divider, LinearProgress, List, ListItem, TextField } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { InView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import LaunchWrapper from "./LaunchWrapper";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        launchesPast: offsetLimitPagination(),
      },
    },
  },
});

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache,
});

const LAUNCHES = gql`
  query getLaunches($offset: Int!, $limit: Int!) {
    launches: launchesPast(
      offset: $offset
      limit: $limit
      order: "desc"
    ) {
      id
      mission_name
      launch_year
    }
  }
`;
const includesInsesnsitive = (strA, strB) => {
  if (strA && strB) {
    return strA.toUpperCase().indexOf(strB.toUpperCase()) > -1;
  }
  return false;
};

const Launches = () => {
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { data, networkStatus, error, fetchMore, variables } = useQuery(
    LAUNCHES,
    {
      client,
      notifyOnNetworkStatusChange: true,
      variables: {
        offset: 0,
        limit: 10,
      },
    }
  );
  const filteredRecords =
    searchInput.length < 2
      ? data?.launches
      : data?.launches.filter((r) => {
          if (includesInsesnsitive(r.mission_name, searchInput)) {
            return true;
          }
          return false;
        });


  if (networkStatus === NetworkStatus.loading) {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <Container fixed>
        <LaunchWrapper>
          <span className="actionBtn">
            <h2> The Past Launches in the Space X api</h2>
            <span style={{ marginTop: "10px" }}>
              <TextField
                className="actions"
                placeholder="Search Launch"
                onChange={(e) => setSearchInput(e.target.value)}
                focused
              />
            </span>
          </span>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <nav aria-label="secondary mailbox folders">
              {filteredRecords?.map((rec) => (
                <List>
                  <ListItem
                    key={rec.id}
                    secondaryAction={<Link to={`/about/${rec.id}`}>View</Link>}
                  >
                    {rec.mission_name} {"  "}{" "}
                    {`(${moment(rec.launch_date_utc).format("DD - MM -YYYY")})`}
                  </ListItem>
                  <Divider />
                </List>
              ))}
            </nav>
          </Box>
        </LaunchWrapper>
      </Container>
      {networkStatus !== NetworkStatus.fetchMore &&
        data.launches.length % variables.limit === 0 &&
        !fullyLoaded && (
          <InView
            onChange={async (inView) => {
              if (inView) {
                const result = await fetchMore({
                  variables: {
                    offset: data.launches.length,
                  },
                });
                setFullyLoaded(!result.data.launches.length);
              }
            }}
          />
        )}
    </>
  );
};
export default Launches;