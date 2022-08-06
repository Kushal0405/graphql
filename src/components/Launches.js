import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Container, List, Box, Button, ListItem, Divider } from "@mui/material";
import LaunchWrapper from "./LaunchWrapper";
const LAUNCHES = gql`
  query getLaunches($limit: Int!, $offset: Int!) {
    launchesPast(limit: $limit, offset: $offset) {
      id
      mission_name
    }
  }
`;

const PAGE_SIZE = 10;

const Launches = () => {
  const [page, setPage] = useState(0);
  const { loading, error, data } = useQuery(LAUNCHES, {
    variables: { limit: PAGE_SIZE, offset: page * PAGE_SIZE },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Container fixed>
      <LaunchWrapper>
        <h2> The Past Launches in the Space X api</h2>
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          <nav aria-label="secondary mailbox folders">
            {data.launchesPast.map(({ mission_name, id }) => (
              <List>
                <ListItem
                  secondaryAction={<Link to={`/about/${id}`}>View</Link>}
                >
                  {mission_name}
                </ListItem>
                <Divider />
              </List>
            ))}
          </nav>
        </Box>
        <div className="actionBtn">
          <Button  onClick={() => setPage((e) => e - 1)} variant="outlined" disabled={!page}>
            Previous
          </Button>
          <span>Page {page + 1}</span>
          <Button onClick={() => setPage((e) => e + 1)} variant="outlined">
            Next
          </Button>
        </div>
      </LaunchWrapper>
    </Container>
  );
};
export default Launches;
