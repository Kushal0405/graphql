import styled from "styled-components";

const LaunchWrapper = styled.div`
  margin: 0 auto !important;
  .MuiBox-root {
    max-width: 100%;
  }
  .MuiListItemSecondaryAction-root {
    a {
      text-decoration: none;
      color: #0057b7;
    }
  }
  .actionBtn {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
export default LaunchWrapper;
