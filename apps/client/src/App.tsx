import { BugList } from "./components/BugList";
import UserList from "./components/UserList";

function App() {


  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
      <BugList/>
      <UserList/>
    </div>
  )
}

export default App
