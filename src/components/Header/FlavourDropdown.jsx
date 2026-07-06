import { useState } from "react";
import { useFlavour } from "../../hooks/useFlavour";

export default function FlavourDropdown() {
    const [open, setOpen] = useState(false);

    const {
        flavours,
        resolvedFlavour,
        selectedFlavourId,
        setSelectedFlavour,
    } = useFlavour();

    function handleSelect(flavourId) {
        if (flavourId === selectedFlavourId) {
            setOpen(false);
            return;
        }

        setSelectedFlavour(flavourId);
        setOpen(false);
    }

    return (
        <div id="flavourDropdown" className={open ? "open" : ""}>
            <button 
                id="flavourDropdownToggle"
                onClick={() => setOpen(prev => !prev)}
            >
                <img src={
                        resolvedFlavour?.logo_url ??
                        "https://placehold.co/35" 
                    } 
                    alt="" id="flavourLogo" 
                />
                <div class="flavourName">
                    {resolvedFlavour?.flavour_name}
                </div>
            </button>
            {open && (
                <ul id="flavourDropdownMenu">
                    {flavours.map(flavour => (
                        <li 
                            key={flavour.flavour_id}
                            onClick={() => 
                                handleSelect(flavour.flavour_id)
                            }
                            className={
                                flavour.flavour_id === selectedFlavourId
                                    ? "active"
                                    : ""
                            }                        
                        >
                            <img 
                                src={
                                    flavour.logo_url ?? 
                                    "https://placehold.co/25"
                                } 
                                alt=""
                                className="flavourLogo" 
                            />
                            <span>
                                {flavour.flavour_name}
                            </span>
                        </li>
                    ))}                    
                </ul>
            )}
        </div>
    );
}