import React from 'react'
import styles from './Card.module.scss'

// import AppContext from '../../context';

import ContentLoader from 'react-content-loader';

function Card({ 
    id, 
    onFevorite, 
    title, 
    imageUrl, 
    price, 
    onPlus, 
    favorited=false, 
    added= false, 
    loading= false }){
const [isAdded, setIsAdded] = React.useState(added)
const [isFavorite, setIsFavorite]= React.useState(favorited)

const onClickPlus = () => {
    onPlus({id, title, imageUrl, price})
    setIsAdded(!isAdded);
}

const onClickFevorite = () => {
    onFevorite({id, title, imageUrl, price})
    setIsFavorite(!isFavorite)
}

// return(
//     <div className={styles.card}>
//         {loading ? }
//     </div>
// )


    return (
        <div className={styles.card}>
            {loading ? (
                <ContentLoader
                    speed={2}
                    width={155}
                    height={250}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
                    <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                    <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                    <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
                </ContentLoader>
            ) : (
                <>
                <div className="fevorite" onClick={onClickFevorite}>
                <img src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg' } alt="Unliked" />
            </div>

            <img width={133} height={112} src={imageUrl} alt="sneakers" />
            <h5>{title}</h5>

            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>

                <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg" } alt="svg" />

            </div>
                    {/* {onFevorite && (
                        <div className={styles.favorite} onClick={onClickFevorite}>
                            <img src={isFavorite ? 'img/liked.svg' : 'img/unliked.svg'} alt="Unliked" />
                        </div>
                    )}
                    <img width="100%" height={135} src={imageUrl} alt="Sneakers" />
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>Цена:</span>
                            <b>{price} руб.</b>
                        </div>
                        {onPlus && (
                            <img
                                className={styles.plus}
                                onClick={onClickPlus}
                                src={isAdded(id) ? 'img/btn-checked.svg' : 'img/btn-plus.svg'}
                                alt="Plus"
                            />
                        )} */}
                    {/* </div> */}
                </>
            )}
        </div>
    )
}

export default Card; 

