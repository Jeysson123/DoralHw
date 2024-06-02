import React, { useState } from "react";
import SideBar from "../components/sidebar/Sidebar";
import Landing from "../components/landing/Landing";
import Pagination from "../components/pagination/Pagination";
import PopupMessage from "../components/dialog/PopupMessage";
import Loading from "../components/loading/Loading";

const HomePage = () => {
    const [totalArticles, setTotalArticles] = useState(0);
    const [indexPage, setIndexPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMsg, setPopupMsg] = useState("");

    const handleSizeArticles = (size) => {
        setTotalArticles(size);
    }

    const handleIndexPage = (index) => {
        setIndexPage(index);
    }

    const handlePerPage = (perPage) => {
        setPerPage(perPage);
    }

    const handlePopup = (canShowPopup) => {
        setShowPopup(canShowPopup);
    }

    const handlePopupMsg = (msg) => {
        setPopupMsg(msg);
    }

    return (
        <>
        {showPopup && <PopupMessage message={popupMsg} onClose={() => setShowPopup(false)} />}
        <SideBar throwAlert={handlePopup} finalMsg={handlePopupMsg} />
        <Landing listSize={handleSizeArticles} index={indexPage} qtyPage={perPage} throwAlert={handlePopup} finalMsg={handlePopupMsg} />
        <Pagination size={totalArticles} indexHome={handleIndexPage} perPageHome={handlePerPage}/>
        </>
    )
}

export default HomePage;