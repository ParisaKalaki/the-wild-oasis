import GlobalStyles from "./styles/GlobalStyles";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "./dashboard";

function App() {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;
