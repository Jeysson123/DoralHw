import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles.scss';
import logo from '../../images/logo.png';

const Sidebar = (props) => {
    const { throwAlert, finalMsg } = props;
    const [urlTerm, setUrlTerm] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [languages, setLanguages] = useState([]);
    const [dateTouched, setDateTouched] = useState(false);
    const [optionTouched, setOptionTouched] = useState(false);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await axios.get('https://en.wikipedia.org/w/api.php?action=query&meta=siteinfo&siprop=languages&format=json&origin=*');
                const languagesList = response.data.query.languages;
                setLanguages(languagesList);
            } catch (error) {
                console.error('Error fetching languages:', error);
            }
        };

        fetchLanguages();
    }, []);

    const handleSearch = (e) => {

        e.preventDefault();
        localStorage.setItem('loading', 'true');
        setDateTouched(true);
        setOptionTouched(true);

        if (!selectedDate || !selectedOption) {
            throwAlert(true);
            finalMsg('Fields required');
            return;
        }

        const [year, month, day] = selectedDate.split("-");
        const newUrlTerm = `${selectedOption}/${year}/${month}/${day}`;
        if (localStorage.getItem('urlTerm') !== newUrlTerm) {
            localStorage.setItem('urlChanged', 'true');
            localStorage.removeItem('storedArticles');
        }
        setUrlTerm(newUrlTerm);
        storedUrlTerm(newUrlTerm);
    };

    const storedUrlTerm = (term) => {
        localStorage.setItem('urlTerm', term);
    };

    return (
        <label htmlFor="sidebar__show" className='sidebar__x'>
            <span className="sidebar__x-bar"></span>
            <input type="checkbox" name="sidebar__show" className="sidebar__show" id="sidebar__show" />
            <div className="sidebar">
                <img src={logo} className="sidebar__logo" alt="Logo" />
                <input
                    type="date"
                    name="sidebar__date"
                    id="sidebar__date"
                    style={{border: dateTouched && !selectedDate ? '2px solid red' : ''}}
                    className="sidebar__date"
                    onChange={(e) => setSelectedDate(e.target.value)}
                />

                <select
                    name="sidebar__select"
                    id="sidebar__select"
                    style={{border: optionTouched && !selectedOption ? '2px solid red' : ''}}
                    className="sidebar__select"
                    onChange={(e) => setSelectedOption(e.target.value)}>
                    <option value="">Select Language</option>
                    {languages.map((language) => (
                        <option key={language.code} value={language.code}>
                            {language['*']}
                        </option>
                    ))}
                </select>
                <input type="button" className='sidebar__btn' value="Search" onClick={handleSearch} />
                <section className="sidebar__social">
                       <a href="https://doralhw.org/" title='Our Website' target='blank'>
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"/></svg>
                       </a>

                       <a href="https://www.facebook.com/DoralHealthandWellness/" title='Our Facebook' target='blank'>
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"/></svg>
                       </a>

                       <a href="https://www.instagram.com/doralhealthandwellness" title='Out Instagram' target="_blank">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                       </a>
                </section>
            </div>
        </label>
    );
}

export default Sidebar;
