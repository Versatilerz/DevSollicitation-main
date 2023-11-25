import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./routes/Home";
import MembersPage from "./routes/Members";
import SportsPage from "./routes/Sports";
import RootLayout from "./routes/Root";
import ErrorPage from "./routes/Error";
import MemberPage from "./routes/Member";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/members", element: <MembersPage /> },
      { path: "/members/:memberId", element: <MemberPage /> },
      { path: "/sports", element: <SportsPage /> },
      { path: "/error", element: <ErrorPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
