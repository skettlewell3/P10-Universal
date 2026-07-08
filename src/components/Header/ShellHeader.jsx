import FlavourDropdown from "./FlavourDropdown";
import ProfileIdentity from "./ProfileIdentity";
import ProfileTickerRow from "./ProfileTickerRow";

export default function ShellHeader () {

    return (
        <div id="shellHeader">
            <div className="profileRow" >
                <ProfileIdentity />
                <FlavourDropdown />
            </div>
            <ProfileTickerRow />
        </div>
    )
}