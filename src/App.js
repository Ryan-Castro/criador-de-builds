import Header from "./componets/Header";
import styled from "styled-components"

const Content = styled.div`
  margin: 0px;
  padding: 0px;
`

function App() {
  return (
    <Content>
      <Header/>
      <h1>hello world!!</h1>
    </Content>
  );
}

export default App;
