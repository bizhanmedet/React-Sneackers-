import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import React from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { useState } from 'react';
import { useEffect } from 'react';
import AppContext from './context';
import Orders from './pages/Orders';


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
    async function fetchData() {

      const cartResponse = await axios.get('https://6407163677c1a905a0ecf46b.mockapi.io/cart');
      const favoritesResponse = await axios.get('https://6421558234d6cd4ebd706c7b.mockapi.io/favorites');
      const itemsResponse = await axios.get('https://6407163677c1a905a0ecf46b.mockapi.io/items');

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
      if(
        cartItems.find((item) => Number(item.id) === Number(obj.id))){
        axios.delete(`https://6407163677c1a905a0ecf46b.mockapi.io/cart/${obj.id}`);
        setCartItems ((prev) => prev.filter((item) => Number(item.id) !== Number (obj.id)));
      } else{
        axios.post('https://6407163677c1a905a0ecf46b.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, obj]);
      }
  };
  const onRemoveItem = (id) => {
    console.log(id);
    axios.delete(`https://6407163677c1a905a0ecf46b.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if(favorites.find((favObj) => Number(favObj.id) === Number(obj.id))){
        axios.delete(`https://6421558234d6cd4ebd706c7b.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post('https://6421558234d6cd4ebd706c7b.mockapi.io/favorites', obj);
        setFavorites(prev => [...prev, data]);
      }
    } catch (error) {
      alert('не удалось добавить в закладки')
    }
    
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  }

  return (
      <AppContext.Provider value={{cartItems, favorites, items, isItemAdded, onAddToFavorite, setCartOpened, setCartItems, onAddToCart}}>
            <div className="wrapper clear">
      <div>
      (<Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} /> opened={cartOpened})
      </div>
      <Header onClickCart={() => setCartOpened(true)} />

      <Route path="/" exact>
        <Home
          cartItems={cartItems}
          items={items}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          isLoading={isLoading}
        />
      </Route>

      <Route path="/favorites" exact>
        <Favorites />
      </Route>

      <Route path="/orders" exact>
        <Orders />
      </Route>

    </div>
        </AppContext.Provider>
  );

}

export default App;
