import React from 'react';
import Card from '../components/Card';
import axios from 'axios';
import AppContext from '../context';


function Orders () 
{
    const {onAddToFavorite, onAddToCart}=React.useContext(AppContext);
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get('https:6421558234d6cd4ebd706c7b.mockapi.io/orders');
                setOrders(data.map((obj) => obj.items).flat());
                setIsLoading(false);
            } catch (error) {
                alert('Произошла Ошибка!');
                console.error(error);
            }
        })();
    }, []);
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои заказы</h1>
            </div>

            <div className="d-flex flex-wrap">
            {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                            <Card
                            key={index}
                            {...item}
                            loading={isLoading}
                            />
                        )
                        )
                }
            </div>
        </div>
    )
}

export default Orders;