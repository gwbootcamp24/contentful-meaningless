import {NavLink} from 'react-router-dom';

function Navbar({gameCategories}) {
  console.log(gameCategories)
    return (
        <nav key="nav0992">
            <NavLink key="navHome" to='/'>
                Home
            </NavLink>

            {gameCategories.map((cat) =>{
              return(
          <>
            <NavLink key={`nav${cat}`} to={cat}>
              {cat}
          </NavLink>

          </>
          )
            }

      )}

            
        </nav>
    );
}

export default Navbar;