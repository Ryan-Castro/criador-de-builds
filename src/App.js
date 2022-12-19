import Header from "./componets/Header";
import styled from "styled-components"
import Home from "./sections/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BuildLOL from "./sections/BuildLOL";
import Info from "./sections/Info";
import Version from "./sections/Version";
import BuildTFT from "./sections/BuildTFT";

const Content = styled.div`
`

const Main = styled.div`
  width: 100vw;
  height: calc(100vh - 100px);
  overflow: visible;
`

function App() {

  return (
    <Content>
      <Header></Header>
      <Main >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/buildlol" element={<BuildLOL/>}/>
            <Route path="/buildtft" element={<BuildTFT/>}/>
            <Route path="/info" element={<Info/>}/>
            <Route path="/version" element={<Version/>}/>
          </Routes>
        </BrowserRouter>
      </Main>
    </Content>
  );
}

export default App;
