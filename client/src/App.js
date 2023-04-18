import RequestForm from "./RequestForm";
import NavBar from "./NavBar";
import './App.css'

function App() {
  return (
    <div>
      <header>
        <nav>
          <div>
            <NavBar></NavBar>
          </div>
        </nav>
        <div className="mt-5">
          <RequestForm></RequestForm>
        </div>
      </header>
    </div>
  );
}

export default App;
