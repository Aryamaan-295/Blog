import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blog from './pages/Blog';
import Blogs from './pages/Blogs';
import './App.css'
import AppBar from './components/AppBar';

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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
