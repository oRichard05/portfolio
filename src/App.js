import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Terminal from "./pages/Terminal";
import OS from "./pages/OS";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/terminal" />} />
                <Route path="/terminal" element={<Terminal />} />
                <Route path="/OS" element={<OS />} />
            </Routes>
        </Router>
    );
}

export default App;
