import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from './Utils/Error'
import AppLayout from "./Components/AppLayout/AppLayout"
import DashBoard from "./Components/AppLayout/DashBoard/DashBoard";
import Gallery from "./Components/AppLayout/Gallery/Gallery";
import Activities, { loader as activitiesLoader } from "./Components/AppLayout/Activities/Activities";
import Pricing, { loader as pricingLoader } from './Components/AppLayout/Pricing/Pricing'
import Contact from "./Components/AppLayout/Contact/Contact"
import Login from "./Components/AppLayout/Login/Login";
import Register from "./Components/AppLayout/Register/Register"
import { AuthProvider } from './Contexts/AuthContext.jsx'
import Schedule, { loader as scheduleLoader } from "./Components/AppLayout/Schedule/Schedule.jsx";
import ForgotPassword from "./Components/AppLayout/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./Components/AppLayout/ResetPassword/ResetPassword.jsx";



const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />, //* display this when route is not defined/found
    //* `children` is the content inside of `<Outlet/>` element from `AppLayout.jsx`
    children: [
      { path: '/', element: <DashBoard /> },
      { path: '/gallery', element: <Gallery /> },
      { path: '/activities', element: <Activities />, loader: activitiesLoader },
      { path: '/pricing', element: <Pricing />, loader: pricingLoader },
      { path: '/schedule', element: <Schedule />, loader: scheduleLoader },
      { path: '/contact', element: <Contact /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/forgotPassword', element: <ForgotPassword /> },
      { path: '/resetPassword', element: <ResetPassword /> },
    ]
  }
])

function App() {
  return (
    <AuthProvider>
     
        <RouterProvider router={router} />
      
    </AuthProvider>
  )
}

export default App
