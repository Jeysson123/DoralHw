import React from "react";
import './Styles.css';

const Card = (props) => {
    const { article, readed } = props;

    const openUrlInNewTab = (url) => {
        const storedArticles = JSON.parse(localStorage.getItem('storedArticles')) || [];
        const updatedArticles = storedArticles.map(art => {
            if (art.title === article.title && !readed) {
                return { ...art, readed: true };
            }
            return art;
        });
        localStorage.setItem('storedArticles', JSON.stringify(updatedArticles));
        window.open(url, '_blank');
    };

    return (
        <div>
            <div className="card" onClick={() => openUrlInNewTab(article.url)}
                style={{ border: readed ? '2px solid red' : '', background : readed ? 'lightgray' : ''}}>
                <div className="img-container">
                    <img src={article.thumbnail} alt="Img" />
                </div>
                <div className="info-container">
                    <h1>{article.title}</h1>
                    <h4>{article.description}</h4>
                </div>
            </div>
        </div>
    );
};

export default Card;
