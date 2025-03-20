"use client";

import { Helmet } from "react-helmet-async";
import './Home.css';

function Home () {
    return (
        <>
          <Helmet>
            <title>F1 Statistics - Home Page</title>
            <meta name="description" content="F1 Stats from all seasons. Drivers and constructor rankings, seasons stats, calendar and much more." />
          </Helmet>
          
          <div className="home-container">
            <div className="home-title">
                <h3>Home</h3>
            </div>
          </div>

        </>
    );
};
  
export default Home;