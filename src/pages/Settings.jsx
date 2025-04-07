import { Helmet } from "react-helmet-async";
import "./Settings.css";
import { useToggleState } from "../components/Helpers";
import { Moon, Clock } from 'lucide-react';
import { useState } from "react";

function Settings() {

    const [timeZone, setTimeZone] = useState(localStorage.getItem("timeZone"));
    const [theme, setTheme] = useState(localStorage.getItem("theme"));

    function handleThemeChange() {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
        window.location.reload()
    }

    function handleTrackTimeZoneChange() {
        setTimeZone("track");
        localStorage.setItem('timeZone', "track");
    }
    function handleUserTimeZoneChange() {
        setTimeZone("user");
        localStorage.setItem('timeZone', "user");
    }
    function handleCentralTimeZoneChange() {
        setTimeZone("central");
        localStorage.setItem('timeZone', "central");
    }

    return (
        <>
            <Helmet>
                <title>F1 Statistics - Settings</title>
                <meta name="description" content="F1 Stats - Settings" />
            </Helmet>

            <div className="settings-container">

                <div className="settings-title">
                    <h3>Settings</h3>
                </div>

                <section className="settings-section settings-preferences" id="preferences">
                    <div className="settings-box">
                        <div className="settings-section-title"> Preferences </div>
                        <div className="settings-section-description"> Customize how the website looks and behaves to match your personal preferences. </div>
                        <div className="settings-single-setting">
                            <div className="settings-toggle-container">
                                <input type="checkbox" className="settings-toggle-checkbox" id="settings_theme_checkbox" onChange={handleThemeChange} checked={theme === "dark"}/>
                                <label className="settings-toggle-switch" htmlFor="settings_theme_checkbox">
                                <span className="settings-toggle-slider"></span>
                                </label>
                            </div>
                            <div className="settings-single-setting-title"> Dark Theme </div>
                        </div>
                    </div>
                </section>

                <section className="settings-section settings-timezone" id="timezone">
                    <div className="settings-box">
                        <div className="settings-section-title"> Time Zone </div>
                        <div className="settings-section-description"> Choose which time zone will be used when displaying session times in schedule. </div>
                        <div className="settings-single-setting">
                            <div className="settings-toggle-container">
                                <input type="checkbox" className="settings-toggle-checkbox" id="settings_user_time_zone_checkbox" onChange={handleUserTimeZoneChange} checked={timeZone === "user"}/>
                                <label className="settings-toggle-switch" htmlFor="settings_user_time_zone_checkbox">
                                <span className="settings-toggle-slider"></span>
                                </label>
                            </div>
                            <div className="settings-single-setting-title"> Use Your Time Zone </div>
                        </div>
                        <div className="settings-single-setting">
                            <div className="settings-toggle-container">
                                <input type="checkbox" className="settings-toggle-checkbox" id="settings_track_time_zone_checkbox" onChange={handleTrackTimeZoneChange} checked={timeZone === "track"}/>
                                <label className="settings-toggle-switch" htmlFor="settings_track_time_zone_checkbox">
                                <span className="settings-toggle-slider"></span>
                                </label>
                            </div>
                            <div className="settings-single-setting-title"> Use Tracks Time Zones </div>
                        </div>
                        <div className="settings-single-setting">
                            <div className="settings-toggle-container">
                                <input type="checkbox" className="settings-toggle-checkbox" id="settings_central_time_zone_checkbox" onChange={handleCentralTimeZoneChange} checked={timeZone === "central"}/>
                                <label className="settings-toggle-switch" htmlFor="settings_central_time_zone_checkbox">
                                <span className="settings-toggle-slider"></span>
                                </label>
                            </div>
                            <div className="settings-single-setting-title"> Use UTC+0 Time Zone </div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
};
  
export default Settings;