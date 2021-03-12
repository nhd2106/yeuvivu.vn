
import DNavbar from "./Navbar";
import styled from 'styled-components';
const NavigationsStyled = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  color: white;
  .top-header {
    background-color: #ffa900;
    .top-brand {
      cursor: pointer;
    }
  }
  .brand 
    cursor: pointer;
    background-color: white;
    border-radius: 50%;
  }
  .active {
    color: yellow;
    text-decoration: none !important;
  }
  a {
    color: black;
    // text-transform: uppercase;
    font-weight: 500;
    // &:hover {
    //   text-decoration: none;
    //   color: yellow;
    // }
  }
  .MuiDrawer-paper {
    background-color: "#";
  }
  .MuiToolbar-root {
    color: black;
  }
  @media (max-width: 600px) {
    .MuiAppBar-root {
      background: #F4AE15!important;
    }
  }
`;
export default function Header({ navigations }) {
  return (
    <>
      <NavigationsStyled>
        <DNavbar />
      </NavigationsStyled>
    </>
  );
}
