import AppRoutes from "./routes/AppRoutes.tsx";
import { BrowserRouter } from "react-router-dom";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
