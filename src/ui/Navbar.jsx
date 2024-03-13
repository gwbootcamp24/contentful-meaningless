import {NavLink} from 'react-router-dom';

function Navbar({gameCategories}) {
  console.log(gameCategories)
    return (
        <nav>
            <NavLink to='/'>
                Home
            </NavLink>

            {gameCategories.map((cat) =>{
              return(
          <>
            <NavLink to={cat}>
              {cat}
          </NavLink>
          </>
          )
            }

      )}

            <NavLink to='/'>
                Adventures
            </NavLink>
        </nav>
    );
}

export default Navbar;