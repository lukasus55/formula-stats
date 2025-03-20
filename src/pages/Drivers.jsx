import { Helmet } from "react-helmet-async";
import "./Drivers.css";
import DCSearch from "../components/DCSearch";
import { useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingMini from "./LoadingMini";
const DCSearchResults = lazy(() => import('../components/DCSearchResults'));
const DriversInfo = lazy(() => import('../components/DriversInfo'));

function Drivers () {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const searchParams = params.get("search")
    const driverParams = params.get("id")

    return (
        <>
            <Helmet>
                <title>F1 Statistics - Drivers</title>
                <meta name="description" content="F1 Stats - All driver seasons, races, wins, history and more" />
            </Helmet>

            <div className="drivers-container">
                <div className="drivers-title">
                    <h3>Drivers</h3>
                </div>

                <div className="drivers-box">
                    <DCSearch searchType={"drivers"}/>
                    {searchParams ? (
                        <Suspense key={location.pathname.toString()} fallback={<LoadingMini />}> 
                            <div className="dcsearch-results">
                                <DCSearchResults query={searchParams} searchType={"drivers"} />
                            </div>
                        </Suspense>
                        ) : ""}
                    {driverParams ? (
                        <Suspense key={location.pathname.toString()} fallback={<LoadingMini />}> 
                            <div className="drivers-info">
                                <DriversInfo driverId={driverParams} />
                            </div>
                        </Suspense>
                        ) : ""}
                </div>
            </div>

        </>
    );
};
  
export default Drivers;