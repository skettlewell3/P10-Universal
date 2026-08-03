import { useLocation, useNavigate } from "react-router-dom";

export default function ContentBanner({ title }) {
    const navigate = useNavigate();
    const location = useLocation();

    const pageTitle = title
        ? title 
        : location.pathname
            .slice(1)
            .replace(/-/g, " ")
            .toUpperCase()
    ;

    return (
        <div className="contentBanner">
            <button
                className="backButton"
                onClick={() => navigate(-1)}
                aria-label="Go Back"
            >
                <img src="/assets/svg/backArrow.svg" alt="Go Back" />
            </button>

            <div className="pageTitle">
                {pageTitle}
            </div>
        </div>
    )
}