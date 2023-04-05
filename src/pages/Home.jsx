import Card from '../components/Card';

function Home({
    cartItems, 
    items, 
    searchValue, 
    setSearchValue, 
    onChangeSearchInput, 
    onAddToFavorite, 
    onAddToCart,
    isLoading}) 
{
    const renderItems = () => { 
        return (isLoading ? [...Array()]) : items); 
        .map((item, index) => (
            <Card
                key={index}
                onFavourite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                {...item}
                added = {cartItems.some (obj => Number(obj.id) == Number(item.id))}
                loading={false}
            />
        )
        );

    };

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="search" />
                    {searchValue &&
                        <img
                            onClick={() => setSearchValue('')}
                            className="clear cu-p" src="/img/btn-remove.svg" alt="clear" />}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
                </div>
            </div>

            <div className="d-flex flex-wrap">
                {renderItems()}
            </div>
        </div>
    )
}

export default Home;