import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div>
      <nav>
        <li>
          <Link to='/dashboard'>Dashboard</Link>
        </li>
      </nav>
    </div>
  )
}

export default Header
