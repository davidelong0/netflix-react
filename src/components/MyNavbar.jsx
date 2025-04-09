import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MyNavbar = () => {
  return (
    <Navbar variant="dark" expand="lg" style={{ backgroundColor: '#221f1f' }}>
      <Navbar.Brand as={Link} to="/">
        <img
          src="assets/logo.png"
          alt="logo"
          style={{ width: '100px', height: '55px' }}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className="font-weight-bold">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/tv-shows" className="font-weight-bold">
            TV Shows
          </Nav.Link>
          <Nav.Link as={Link} to="/movies" className="font-weight-bold">
            Movies
          </Nav.Link>
          <Nav.Link as={Link} to="/recently-added" className="font-weight-bold">
            Recently Added
          </Nav.Link>
          <Nav.Link as={Link} to="/my-list" className="font-weight-bold">
            My List
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default MyNavbar
