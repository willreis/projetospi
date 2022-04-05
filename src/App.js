import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Rotas from "./Rotas";
import Styled from "styled-components";
import { BrowserRouter } from "react-router-dom";

const Container = Styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar content";
    min-height: 100vh;
`;


function App() {
  return (
    <>
      <BrowserRouter>
        <Container>
          <Header Style={"grid-area: header"} />
          <Sidebar Style={"grid-area: sidebar"} />
          <Rotas Style={"grid-area: content"} />
        </Container>
      </BrowserRouter>
    </>
  )
}

export default App;