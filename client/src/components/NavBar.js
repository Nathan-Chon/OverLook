import AppDrawer from './AppDrawer';
import './NavBar.css'
import { Outlet } from 'react-router-dom';

export default function NavBar() {

  return(
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light border-bottom justify-content-between">
        <AppDrawer className="px-3"></AppDrawer>
        <h1 className='navbar-brand'>OVERLOOK</h1>
      </nav>
      <Outlet />
    </div>
  )
}
