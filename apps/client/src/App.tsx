import BugDetail from "./components/BugDetail";
import { BugList } from "./components/BugList";
import UserList from "./components/UserList";

function App() {

  


  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
      <BugList/>
      <UserList/>
      <BugDetail bugId={"1"}/>
    </div>
  )
}

export default App
