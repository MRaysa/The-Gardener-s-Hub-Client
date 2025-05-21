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
        Component: ShareAGardenTip,
      },
      {
        path: "/my-tips",
        Component: MyTips,
      },
      {
        path: "/browse-tips",
        Component: BrowseTips,
      },
      {
        path: "/tip-details",
        Component: TipDetailsPage,
      },
    ],
  },
]);

export default router;
