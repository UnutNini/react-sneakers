import React from "react";

import Card from "../components/Card";

function Home({
    items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
    isLoading,
    }) {
        // const { isItemAdded } = React.useContext(AppContext);


    const renderItems = () => {
        const filtredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
            <Card
                key={index}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                // added= {isItemAdded(item && item.id)}
                loading={isLoading}
                {...item}
            />
        ));
    };

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>
                    {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
                </h1>
                <div className="search-block d-flex">
                    <img src="img/search.svg" alt="Search" />
                    {searchValue && (
                        <img
                            onClick={() => setSearchValue("")}
                            className="clear cu-p"
                            src="img/btn-remove.svg"
                            alt="Clear"
                        />
                    )}
                    <input
                        onChange={onChangeSearchInput}
                        value={searchValue}
                        placeholder="Поиск..."
                    />
                </div>
            </div>
            <div className="d-flex flex-wrap">{renderItems()}</div>
        </div>
    );
}

export default Home;

// import Card from '../components/Card'

// function Home({
//     items,
//     cartItems,
//     searchValue,
//     setSearchValue,
//     onChangeSearchInput,
//     onAddToFavorite,
//     onAddToCart,
//     isLoading
// }) {

//         const renderItems= () => {
//             return items
//                     .filter(item => item.title.toLowerCase().includes(searchValue))
//                     .map((item, index) => (
//                         <Card
//                             key={index}
//                             onFevorite={(obj) => onAddToFavorite(obj)}
//                             onPlus={(obj) => onAddToCart(obj)}
//                             added={cartItems.some(obj => Number(obj.id) === Number(item.obj))}
//                             {...item}
//                         />
//                     ))}

//         return(
//         <div className="content p-40">
//             <div className="d-flex align-center justify-between mb-40">
//                 <h1>{searchValue ? `Поиск по запросу "${searchValue}"` : 'Все кроссовки'}</h1>
//                 <div className="search-block d-flex">
//                     <img src="/img/search.svg" alt="Search" />
//                     {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg" alt="Clear" />}
//                     <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
//                 </div>
//             </div>

//             <div className="d-flex flex-wrap">
//                 {renderItems()}

//             </div>

//         </div>
//     )
// }

// export default Home;
