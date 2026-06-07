import { useState } from "react";

export default function FlavourDropdown() {
    const [open, setOpen] = useState(false);

    return (
        <div id="flavourDropdown" className={open ? "open" : ""}>
            <button 
                id="flavourDropdownToggle"
                onClick={() => setOpen(!open)}
            >
                <img src="https://placehold.co/35" alt="" id="flavourLogo" />
                <div class="flavourName">World1-1</div>
            </button>
            {open && (
            <ul id="flavourDropdownMenu">
                <li>
                    <img src="https://placehold.co/25" alt="" className="flavourLogo" />
                    <span>World1-1</span>
                </li>
                <li>
                    <img src="https://placehold.co/25" alt="" className="flavourLogo" />
                    <span>Perfect10</span>
                </li>
            </ul>
            )}
        </div>
    );
}