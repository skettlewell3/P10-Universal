import { COUNTRY_FLAG_MAP } from "../../../config"

export default function TeamBlock ({ name, short }) {
    const flagCode = COUNTRY_FLAG_MAP[short];

    const isLongName = name?.length > 15;

    return (
        <div className="teamBlock">
            <div className="flagWrap">
                <img
                    src={`https://flagcdn.com/w40/${flagCode}.png`}
                    alt={`${name} flag`}
                    className="wcFlag"
                />
            </div>
            <div 
                className={`teamName ${
                    isLongName ? "longName" : ""
                }`}
            >
                {name}
            </div>
        </div>
    )
}