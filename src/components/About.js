import { gql, useQuery } from "@apollo/client";
import { Container, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import AboutWrapper from "./AboutWrapper";

const About = () => {
  var id = useParams();
  const ABOUT = gql`
    query getLaunch($id: ID!) {
      launch(id: $id) {
        id
        mission_name
        details
        launch_year
      }
    }
  `;
  const { loading, error, data } = useQuery(ABOUT, { variables: id });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Container fixed>
      <AboutWrapper>
        <h2 className="heading"> {data.launch.mission_name}</h2>
        <Divider />
        <p className="desc">{data.launch.details}</p>
        <span className="year">Launch Year - {data.launch.launch_year}</span>
      </AboutWrapper>
    </Container>
  );
};
export default About;
