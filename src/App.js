import Header from "./componets/Header";
import styled from "styled-components"
import Home from "./componets/Home";

const Content = styled.div`
`

const Main = styled.div`
  width: 100vw;
  height: calc(100vh - 100px);
`

function App() {
  return (
    <Content>
      <Header></Header>
      <Main><Home></Home></Main>
    </Content>
  );
}

export default App;
