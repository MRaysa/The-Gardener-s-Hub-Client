import { createBrowserRouter } from "react-router";
import Root from "../pages/Root";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import ExploreGardeners from "../pages/ExploreGardeners";
import ShareAGardenTip from "../pages/ShareAGardenTip";
import MyTips from "../pages/MyTips";
import BrowseTips from "../pages/BrowseTips";
import TipDetailsPage from "../pages/TipDetailsPage";
import UpdateTipPage from "../pages/UpdateTipPage";
import PrivateRoute from "../routes/PrivateRoute";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import Dashboard from "../components/dashboard/Dashboard";
import AllCommunityGardenTips from "../components/dashboard/AllCommunityGardenTips";
import DashboardShareTip from "../components/dashboard/DashboardShareTip";
import DashboardMyTips from "../components/dashboard/DashboardMyTips";
import DashboardUpdateTips from "../components/dashboard/DashboardUpdateTips";
import Profile from "../components/dashboard/Profile";
const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/signin",
        Component: SignIn,
      },
      {
        path: "/signup",
        Component: SignUp,
      },
      {
        path: "/explore-gardeners",
        Component: ExploreGardeners,
      },
      {
        path: "/share-tip",
        // Component: ShareAGardenTip,
        element: (
          <PrivateRoute>
            <ShareAGardenTip />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-tips",
        // Component: MyTips,
        element: (
          <PrivateRoute>
            <MyTips />
          </PrivateRoute>
        ),
      },
      {
        path: "/browse-tips",
        Component: BrowseTips,
      },
      {
        path: "/tips/:id",
        // Component: TipDetailsPage,
        element: (
          <PrivateRoute>
            <TipDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-tip/:id",
        Component: UpdateTipPage,
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "/contact-us",
        Component: ContactUs,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "all-gardeners",
        element: <AllCommunityGardenTips />,
      },
      {
        path: "add-tips",
        element: <DashboardShareTip />,
      },
      {
        path: "my-garden-tips",
        element: <DashboardMyTips />,
      },
      {
        path: "my-tips/update-tip/:id",
        element: <DashboardUpdateTips />,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
    ],
  },
]);

export default router;
