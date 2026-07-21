
export default function TeamBlock ({ 
    name, 
    flagCode,
    isWinner = false,
    isLoser = false,
    showProgressionMarker = false,
}) {

    const isLongName = name?.length > 15;

    const nameCheck = name?.length > 0;

    return (
        <div className="teamBlock">
            {nameCheck && (
                <div className="flagWrap">
                    <img
                        src={`https://flagcdn.com/w40/${flagCode}.png`}
                        alt={`${name} flag`}
                        className="wcFlag"
                    />
                </div>
            )}
            <div 
                className={`
                    teamName 
                    ${isLongName ? "longName" : ""}
                    ${isWinner ? "winner" : ""}
                    ${isLoser ? "loser" : ""}
                `}
            >
                {name ? name : "TBC"}

                {showProgressionMarker && (
                    <sup className="qualifierMark">*</sup>
                )}
            </div>
        </div>
    )
}