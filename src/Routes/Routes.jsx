import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layout/MainLayout';
import Home from '../Pages/Home';
import MakeAnnouncement from '../Component/MakeAnnouncement';
import AuthLayout from '../Layout/AuthLayout';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import PostDetails from '../Pages/PostDetails';
import Dashboard from '../Layout/Dashboard';
import MyProfile from '../Pages/MyProfile';
import AddPost from '../Pages/AddPost';
import MyPosts from '../Pages/MyPosts';
import Membership from '../Pages/Membership';
import CommentsPage from '../Pages/CommentsPage';
import AdminDashboard from '../Layout/adminDashboard';
import ManagesUsers from '../Pages/ManagesUsers';
import ReportedActivities from '../Pages/ReportedActivities';
import AdminProfile from '../Pages/AdminProfile';
import PaymentSuccess from '../Pages/PaymentSuccess';
import PrivateRoute from '../Provider/PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home />,
      },

      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          {
            path: '/auth/login',
            element: <Login />
          },
          {
            path: '/auth/register',
            element: <Register />
          }
        ]
      },
      {
        path: '/post/:id',
        element:
          <PrivateRoute>
            <PostDetails />,
          </PrivateRoute>

      },
      {
        path: '/membership',
        element:
          <PrivateRoute>
            <Membership></Membership>

          </PrivateRoute>


      },
      {
        path: '/payment-success',
        element: <PrivateRoute>
          <PaymentSuccess />
        </PrivateRoute>
      },
      {
        path: '/dashboard',
        element: <PrivateRoute>
          <Dashboard />
        </PrivateRoute>,
        children: [
          {
            path: '/dashboard/myprofile',
            element: <MyProfile />
          },
          {
            path: '/dashboard/addpost',
            element: <AddPost />
          },
          {
            path: '/dashboard/myposts',
            element: <MyPosts />
          },
        ]
      },
      {
        path: '/comments/:id',
        element: <PrivateRoute>

          <CommentsPage></CommentsPage>
        </PrivateRoute>
      },
      {
        path: '/admin-dashboard',
        element: <PrivateRoute>
          <AdminDashboard></AdminDashboard>
        </PrivateRoute>,
        children: [
          {
            path: '/admin-dashboard/manage-users',
            element: <ManagesUsers></ManagesUsers>
          },
          {
            path: '/admin-dashboard/reported-activities',
            element: <ReportedActivities></ReportedActivities>
          },
          {
            path: '/admin-dashboard/admin-profile',
            element: <AdminProfile></AdminProfile>
          },
          {
            path: '/admin-dashboard/make-announcement',
            element: <MakeAnnouncement></MakeAnnouncement>
          },

        ]
      }
    ],
  },
]);
