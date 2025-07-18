import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layout/MainLayout';
import Home from '../Pages/Home';
import MakeAnnouncement from '../Component/MakeAnnouncement';
import AuthLayout from '../Layout/AuthLayout';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import PostDetails from '../Pages/PostDetails';
import PaymentSuccess from '../Pages/PaymentSuccess';
import Dashboard from '../Layout/Dashboard';
import MyProfile from '../Pages/MyProfile';
import AddPost from '../Pages/AddPost';
import MyPosts from '../Pages/MyPosts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
       element: <Home/>,
      },
      {
        path:'/make-announcement',
        element:<MakeAnnouncement></MakeAnnouncement>
      },
      {
        path:'/auth',
        element:<AuthLayout/>,
        children:[
          {
            path:'/auth/login',
            element:<Login/>
          },
          {
            path:'/auth/register',
            element:<Register/>
          }
        ]
      },
      {
        path:'/post/:id',
        element:<PostDetails/>,
      },
      {
        path:'/payment-success',
        element:<PaymentSuccess/>
      },
      {
        path:'/dashboard',
        element:<Dashboard/>,
        children:[
          {
            path:'/dashboard/myprofile',
            element:<MyProfile/>
          },
          {
            path:'/dashboard/addpost',
            element:<AddPost/>
          },
          {
            path:'/dashboard/myposts',
            element:<MyPosts/>
          }
        ]
      }
    ],
  },
]);
