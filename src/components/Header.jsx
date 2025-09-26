import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: '#1e1e1e',
        borderRadius: '10px',
        width: '200px',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <nav>
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            gap: '1.5rem',
          }}
        >
          <li>
            <Link
              to="/dashboard"
              style={{
                textDecoration: 'none',
                color: '#646cff',
                fontWeight: '600',
                fontSize: '1.1rem',
              }}
              onMouseEnter={e => e.target.style.color = '#4848ff'}
              onMouseLeave={e => e.target.style.color = '#646cff'}
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
