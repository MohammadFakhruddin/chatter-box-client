import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Routes/Routes'
import AuthProvider from './Provider/AuthProvider'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>

      <div className='font-manrope'>
        <RouterProvider router={router}></RouterProvider>

      </div>
    </AuthProvider>

  </StrictMode>,
)
