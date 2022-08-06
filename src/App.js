import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Launches from "./components/Launches";

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route exact path="/" element={<Launches />} />
        <Route path="/about/:id" element={<About />} />
      </Routes>
    </ApolloProvider>
  );
};

export default App;
