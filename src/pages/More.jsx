import { Helmet } from "react-helmet-async";
import "./More.css";
import { Link } from "react-router-dom";

function More () {

    return (
        <>
            <Helmet>
                <title>F1 Statistics - More</title>
                <meta name="robots" content="noindex" />
                <meta name="description" content="F1 Stats - More pages." />
            </Helmet>

            <div className="more-container">

                <div className="more-title">
                    <h3>More</h3>
                </div>

                <ul className="more-list">
                    <li> <Link to="/about"> About </Link> </li>
                    <li> <Link to="/contact"> Contact </Link> </li>
                    <li> <Link to="/legal/cookie-policy"> Cookie Policy </Link> </li>
                    <li> <Link to="/settings"> Settings </Link> </li>
                </ul>

            </div>
        </>
    );
};
  
export default More;