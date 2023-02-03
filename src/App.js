import "./App.css";

import { ToastContainer } from "react-toastify";
import IndexRoutes from "./Routes/IndexRoutes";

function App() {
  return (
    <div className="App">
      <IndexRoutes/>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
