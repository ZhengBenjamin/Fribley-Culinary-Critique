import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/home" className="navbar-brand">Fribley Culinary Critique</Link>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/ratings" className="nav-link">Ratings</Link>
              <Link to="/suggest" className="nav-link">Suggest</Link>
              <Link to="/suggestions" className="nav-link">User Suggestions</Link>
              <Link to="/about" className="nav-link">About</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;