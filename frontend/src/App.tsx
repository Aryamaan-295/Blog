import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blog from './pages/Blog';
import Blogs from './pages/Blogs';
import Profile from './pages/Profile';
import WriteBlog from './pages/WriteBlog'
import AppBar from './components/AppBar';
import './App.css'


function MainLayout() {
  return(
    <>
      <AppBar />
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
          <Route element={ <MainLayout />}>
            <Route path="/blogs" element={ <Blogs/> } />
            <Route path="/blog/:id" element={ <Blog/> } />
            <Route path="/profile/:id" element={ <Profile />} />
            <Route path="/edit" element={ <WriteBlog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
