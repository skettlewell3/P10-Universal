import { COUNTRY_FLAG_MAP } from "../../../config"

export default function TeamBlock ({ name, short }) {
    const flagCode = COUNTRY_FLAG_MAP[short];

    return (
        <div className="teamBlock">
            <img 
                src={`https://flagcdn.com/w40/${flagCode}.png`}
                alt={`${name} flag`} className="wcFlag" />
            <div>{name}</div>
        </div>
    )
}