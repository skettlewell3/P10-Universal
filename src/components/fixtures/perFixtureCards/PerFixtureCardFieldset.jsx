export default function PerFixtureCardFieldset({ fixture }) {
    const isFinished = fixture.fixture_status === "finished";
    const isOpen = fixture.predictions_open && fixture.fixture_status === "upcoming";

    return (
        <div className="fixtureFieldset">
            
            <div className="scoreRow">

                {/* HOME INPUT / RESULT */}
                {isOpen ? (
                    <input
                        type="number"
                        className="predInput homePred"
                        min="0"
                        max="10"
                        // disabled={loading}
                        placeholder={
                            isFinished ? fixture.ft_home_goals : "-"
                        }
                    />
                ) : (
                    <div className="homeScore">{fixture.final_home_goals}</div>
                )}
                

                <div className="vs">v</div>

                {/* AWAY INPUT / RESULT */}
                {isOpen ? (                    
                    <input
                        type="number"
                        className="predInput awayPred"
                        min="0"
                        max="10"
                        // disabled={loading}
                        placeholder={
                            isFinished ? fixture.ft_home_goals : "-"
                        }
                    />                    
                ) : (
                    <div className="awayScore">{fixture.final_away_goals}</div>
                )}

            </div>

            <div className="actionRow">

                {isOpen && (
                    <button type="button">
                        Submit
                    </button>
                )}

                {isFinished && (
                    <div className="resultSummary">
                        {fixture.ft_home_goals} - {fixture.ft_away_goals}
                    </div>
                )}

                {!isOpen && !isFinished && (
                    <div className="lockedState">
                        Closed
                    </div>
                )}

            </div>

        </div>
    );
}