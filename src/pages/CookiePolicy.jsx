import { Helmet } from "react-helmet-async";
import "./CookiePolicy.css";

function CookiePolicy () {

    return (
        <>
            <Helmet>
                <title>F1 Statistics - Cookie Policy</title>
                <meta name="description" content="F1 Stats - Our Cookies Policy" />
            </Helmet>

            <div className="cookie-container">

                <div className="cookie-title">
                    <h3>Cookie policy</h3>
                </div>

                <div className="cookie-details">
                    This website does not currently use any cookies.
                </div>


            </div>
        </>
    );
};
  
export default CookiePolicy;