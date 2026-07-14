
export default function GWTeamBlock ({ name, style }) {
    const isLongName = name?.length >= 11;

    return (
        <div className="teamBlock"  style={style}>
            <div 
                className={`teamName ${
                    isLongName ? "longName" : ""
                }`}
            >
                {name ? name : "TBC"}
            </div>
        </div>
    )
}