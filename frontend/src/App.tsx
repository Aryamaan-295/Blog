import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blog from './pages/Blog';
import Blogs from './pages/Blogs';
import Profile from './pages/Profile';
import WriteBlog from './pages/WriteBlog'
import AppBar from './components/AppBar';
import './App.css'
import Settings from './pages/Settings';


function MainLayout() {
  return(
    <>
      <div className='sticky top-0 z-20'>
        <AppBar />
      </div> 
      <Outlet />
    </>
  )
}

function ProtectedRoutes() {
  const token = localStorage.getItem("token");

  if(!token) {
    return(
      <Navigate to={"/signin"} />
    )
  }

  return(
    <>
      <Outlet />
    </>
  )
}

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/signup" element={ <Signup/> } />
            <Route path="/signin" element={ <Signin/> } />
          </Route>
          <Route element={ <ProtectedRoutes />}>
            <Route element={ <MainLayout />}>
              <Route path="/blogs" element={ <Blogs/> } />
              <Route path="/blog/:id" element={ <Blog/> } />
              <Route path='/profile/settings' element={ <Settings />} />
              <Route path="/profile/:id" element={ <Profile />} />
              <Route path="/edit" element={ <WriteBlog />} />
            </Route>
          </Route>
          <Route path='*' element={ <div>Not Found</div> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
