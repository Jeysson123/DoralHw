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
                    {/* Social Media Links */}
                </section>
            </div>
        </label>
    );
}

export default Sidebar;
