import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./component/Login";
import Register from "./component/Register";
import EmployeeDashboard from "./component/EmployeeDashboard"
import AdminDashboard from "./component/AdminDashboard";
import LeaveForm from "./component/LeaveForm";

function App() {

    return (

        <BrowserRouter>

            <Routes>
 

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

 
                <Route
                    path="/register"
                    element={<Register />}
                />
 

                <Route
                    path="/employee"
                    element={<EmployeeDashboard />}
                />

 
                <Route
                    path="/employee/apply-leave"
                    element={<LeaveForm />}
                />

 

                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
 