import React, { useEffect, useState } from "react";
import axios from "axios";
import './Styles.css';
import Card from '../card/Card';
import PopupMessage from "../dialog/PopupMessage";
import Loading from "../loading/Loading";
import Article from "../../dto/Article";

const Landing = (props) => {
    const { throwAlert, finalMsg } = props;
    const { listSize, index, qtyPage } = props;
    const [listArticles, setListArticles] = useState([]);
    const [urlTerm, setUrlTerm] = useState(localStorage.getItem('urlTerm') || "");
    const [showLoading, setShowLoading] = useState(false);
    useEffect(() => {
        const intervalId = setInterval(() => {
            const storedUrlTerm = localStorage.getItem('urlTerm');
            const urlChanged = localStorage.getItem('urlChanged');
            if (storedUrlTerm && (storedUrlTerm !== urlTerm || urlChanged === 'true')) {
                setUrlTerm(storedUrlTerm);
                localStorage.setItem('urlChanged', 'false');
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [urlTerm]);

    useEffect(() => {
        const getArticles = async () => {
            const headers = {
                "Content-Type": "application/json"
            };
            try {
                if(localStorage.getItem('loading') === 'true'){
                    setShowLoading(true);
                    localStorage.setItem('loading', 'false');
                }
                const url = `http://localhost:5000/feed/${urlTerm}`;
                const response = await axios.get(url, { headers });
                const parsedArticles = parseArticles(response.data.mostread.articles);
                if (!localStorage.getItem('storedArticles') || localStorage.getItem('urlChanged') === 'true') {
                    parseStoredArticles(parsedArticles);
                    localStorage.setItem('urlChanged', 'false');
                }
                setListArticles(parsedArticles);
                throwAlert(false);
            } catch (error) {
                throwAlert(true);
                finalMsg(error.message || "An error occurred");
                localStorage.removeItem('urlTerm');
                localStorage.removeItem('storedArticles');
                setUrlTerm(null);
            }
            setShowLoading(false);
        };

        if (urlTerm) {
            getArticles();
            const intervalId = setInterval(() => {
                getArticles();
            }, 3000);
            return () => clearInterval(intervalId);
        }
    }, [urlTerm]);

    const parseArticles = (articles) => {
        return articles.map(article => ({
            title: article.title,
            thumbnail: article.thumbnail ? article.thumbnail.source : null,
            description: article.description || 'No description available',
            url: article.content_urls ? article.content_urls.desktop.page : null,
        }));
    };

    const renderArticles = () => {
        if (!listArticles || listArticles.length === 0) return "There's no articles";
        listSize(listArticles.length);
        const startIndex = (index - 1) * qtyPage;
        const endIndex = startIndex + qtyPage;
        const storedArticles = JSON.parse(localStorage.getItem('storedArticles')) || [];
        return listArticles.slice(startIndex, endIndex).map((item, idx) => {
            const storedArticle = storedArticles[idx];
            const readed = storedArticle && storedArticle.title === item.title ? storedArticle.readed : false;
            return (
                <div key={idx}>
                    <Card article={item} readed={readed} />
                </div>
            );
        });
    };

    const parseStoredArticles = (articles) => {
        const stored = articles.map(article => new Article(article.title, false));
        localStorage.setItem('storedArticles', JSON.stringify(stored));
        return stored;
    };

    return (
        <div className="landing">
            {showLoading ? <Loading/> : renderArticles()}
        </div>
    );
};

export default Landing;
