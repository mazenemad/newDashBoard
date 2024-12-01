import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth,Terms} from "@/layouts";
import { useAuth } from "./hooks/Auth";

function App() {
  const {auth} = useAuth()
  return (
    <Routes>
      {auth ? <Route path="/dashboard/*" element={<Dashboard />} /> :
      <Route path="/auth/*" element={<Auth />} />}
      <Route path="/terms/*" element={<Terms />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
