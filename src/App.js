import React from 'react'
import {Route} from 'react-router-dom'
import { Routes } from 'react-router-dom'
import axios from 'axios'

import Header from './components/Header'
import Drawer from './components/Drawer'
import AppContext from './context'

import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Orders from './pages/Orders'

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorite, setFavorite] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      try {
        const cartRespons = await axios.get('https://627500465dc4f5764b9ccafb.mockapi.io/cart');
        const favoritesRespons = await axios.get('https://627500465dc4f5764b9ccafb.mockapi.io/favorite');
        const itemsRespons = await axios.get('https://627500465dc4f5764b9ccafb.mockapi.io/items');
  
        setIsLoading(false);
  
        setItems(itemsRespons.data);
        setCartItems(cartRespons.data);
        setFavorite(favoritesRespons.data);
      } catch (error) {
        alert('Ошибка при запросе данных ;(')
      }
    } 

    fetchData()
  }, [])

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://627500465dc4f5764b9ccafb.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://627500465dc4f5764b9ccafb.mockapi.io/cart', obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
  };


const onPemoveItem = (id) => {
  try {
    axios.delete(`https://627500465dc4f5764b9ccafb.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
  } catch (error) {
    alert('Ошибка при удалении из корзины');  
    console.error(error);
  }
}

const onAddToFavorite = async (obj) => {
try{
  if (favorite.find(favObj => Number(favObj.id) === Number(obj.id))){
    await axios.delete(`https://627500465dc4f5764b9ccafb.mockapi.io/favorite/${obj.id}`);
    setFavorite((prev) => prev.filter((item) => item.id !== obj.id));
  }else{
    const { data } = await axios.post('https://627500465dc4f5764b9ccafb.mockapi.io/favorite', obj);
    setFavorite(prev =>[...prev, data]);
  }
}catch(error){
  alert('Не удалось добавить в фаворить')
  console.error(error);
}
}

const onChangeSearchInput = (event) => {
  setSearchValue(event.target.value)
}

const isItemAdded = (id) => {
  return cartItems.some((obj) => Number(obj.parentId) === Number(id));
}


return (
  <AppContext.Provider value={{ items, cartItems, favorite, isItemAdded, onAddToFavorite, setCartOpened, setCartItems }}>

    <div className="wrapper clear">

    <Drawer 
    items={cartItems} 
    onClose={() => setCartOpened(false)} 
    onRemove={onPemoveItem} 
    opened={cartOpened}
    />
      {/* {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(true)} onRemove={onPemoveItem} opened={cartOpened} />} */}
      
      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route path='' element={
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />

        } />
        <Route path='favorit' element={<Favorites onAddToFavorite={onAddToFavorite} />} />

        <Route path='orders' element={<Orders onAddToFavorite={onAddToFavorite} />} />

      </Routes>

    </div>

  </AppContext.Provider>
);

}

export default App;



