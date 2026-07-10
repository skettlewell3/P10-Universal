export default function ScoreRow({ 
    display
}) {
    
    return (
        <div className="scoreRow">
            <div className="homeScore">{display.home}</div>
            <div className="vs">
                <span className="label">{display.label}</span>
                V
            </div>
            <div className="awayScore">{display.away}</div>
        </div>
    )
}