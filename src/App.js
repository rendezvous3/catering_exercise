import React, { useEffect, useState, useReducer, createContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Menu from './components/Menu';
import Cart from './components/Cart';
import './App.css';
import organizeItemsByFoodType from './utilities';
import selectedItemsReducer from './store/selectedItemsReducer';

export const SelectedItemsContext = createContext();

const App = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [menuItems, setMenuItems] = useState({});
  const [itemsCount, setItemsCount] = useState(0);
  // using useReducer hook for this specific piece of state to avoid prop drilling
  // it also enables effective use of React.memo() on Menu component
  // this way whenever we add item to a cart, menu won't rerender
  const [selectedItems, dispatch] = useReducer(selectedItemsReducer, {});

  useEffect(() => {
    // using proxy server for fetching to get around CORS issues
    const fetchData = async () => {
      const response = await fetch(
        'https://nameless-journey-79320.herokuapp.com/https://www.olo.com/menu.json'
      );
      const data = await response.json();
      const menuItems = organizeItemsByFoodType(data.MenuItems);
      // batching useState setters to reduce rerender count
      ReactDOM.unstable_batchedUpdates(() => {
        setItemsCount(data.MenuItems.length);
        setRestaurantName(data.Restaurant);
        setMenuItems(menuItems);
      });
    };
    fetchData();
  }, []);

  return (
    <SelectedItemsContext.Provider value={{ selectedItems, dispatch }}>
      <Router>
        <div className='container'>
          <h1 className='app-title'>Cattering Planner</h1>

          <nav>
            <ul className='nav-list'>
              <li>
                <Link to='/'>Menu</Link>
              </li>
              <li>
                <Link to='/cart'>{`Cart (${
                  Object.keys(selectedItems).length
                })`}</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path='/cart'>
              {/* {Object.keys(selectedItems).length ? ( */}
              <Cart selectedItems={selectedItems} />
              {/* ) : null} */}
            </Route>
            <Route path='/'>
              {Object.keys(menuItems).length ? (
                <Menu
                  restaurantName={restaurantName}
                  appetizers={menuItems.appetizer}
                  entrees={menuItems.entree}
                  desserts={menuItems.dessert}
                  itemsCount={itemsCount}
                />
              ) : null}
            </Route>
          </Switch>
        </div>
      </Router>
    </SelectedItemsContext.Provider>
  );
};

export default App;
