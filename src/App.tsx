import './App.css';
import { Login } from './components/Login';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RegisterParticipant } from './participants/RegisterParticipant';
import { CreateEvent } from "./admins/CreateEvent";
import { Dashboard } from './admins/Dashboard';
import { ListUsers } from './admins/ListUsers';
import { ListTeams } from './admins/ListTeams';
import { ListEvents } from './admins/ListEvents';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Dashboard />,
  },
  {
    path: "/user/list",
    element: <ListUsers />,
  },
  {
    path: "/team/list",
    element: <ListTeams />,
  },
  {
    path: "/event/list",
    element: <ListEvents />,
  },
  {
    path: "/create-event", // Nueva ruta para el formulario
    element: <CreateEvent />,
  },
  {
    path: "/register",
    element: <RegisterParticipant />,
  },
  
  {
    path: "/recover-password",
    element: <div>Hola desde pocoyo</div>,
  },
  
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
