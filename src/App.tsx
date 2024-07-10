import styled from 'styled-components';
import './App.css'
import Editor from './components/editor/Editor';

const CenterHeader = styled.h2`
  text-align: center;
`

function App() {

  return (
    <>
      <CenterHeader>
        Online Editor
      </CenterHeader>
      <Editor />
    </>

  )
}

export default App
