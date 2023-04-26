import React from 'react';
import styles from './Card.module.scss';
import ContentLoader from "react-content-loader";
import AppContext from '../../context';

function Card({ id, onFavourite, title, imageUrl, price, onPlus, favorited, added = false, loading = false }) {
    const {isItemAdded} = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const onClickPlus = () => {
        onPlus({ id, title, imageUrl, price });
    }

    const onClickFavorite = () => {
        onFavourite({ id, title, imageUrl, price });
        setIsFavorite(!isFavorite);
    }

    return (
        <div className={styles.card}>
            {loading ? (<ContentLoader
                speed={2}
                width={150}
                height={265}
                viewBox="0 0 150 265"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="109" y="79" rx="0" ry="0" width="0" height="24" />
                <rect x="109" y="103" rx="0" ry="0" width="0" height="82" />
                <rect x="0" y="10" rx="10" ry="10" width="150" height="155" />
                <rect x="0" y="171" rx="5" ry="5" width="150" height="15" />
                <rect x="0" y="199" rx="5" ry="5" width="100" height="15" />
                <rect x="0" y="233" rx="5" ry="5" width="80" height="25" />
                <rect x="117" y="226" rx="5" ry="5" width="32" height="32" />
            </ContentLoader>) : (
                <>
                    <div className={styles.favourite} onClick={onClickFavorite}>
                        <img src={isFavorite ? "img/liked.svg" : "/img/unliked.svg"} alt="Unliked" />
                    </div>
                    <img width={133} height={112} src={imageUrl} alt="1" />
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>Цена </span>
                            <b>{price} тенге.</b>
                        </div>
                        <img
                            className={styles.plus}
                            onClick={onClickPlus}
                            src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus" />
                    </div>
                </>)}
        </div>
    );
}

export default Card;