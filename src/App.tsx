import './App.css';
import { Login } from './components/Login';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RegisterParticipant } from './components/participants/RegisterParticipant';
//import { CreateEvent } from "./admins/CreateEvent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <RegisterParticipant />,
  },
  {
    path: "/recover-password",
    element: <div>Hola desde pocoyo</div>,
  },
  //{
    //path: "/create-event", // Nueva ruta para el formulario
    //element: <CreateEvent />,
  //},
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
