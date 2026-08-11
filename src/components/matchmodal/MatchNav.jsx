export default function MatchNav({ 
    currentFixture, 
    goPrev, 
    goNext,
    hasPrev,
    hasNext
}) {
    return (
        <div className="matchNav">
            <button
              className="navArrow"
              onClick={goPrev}
              disabled={!hasPrev}
            >
              <svg viewBox="0 0 24 24" className="arrow-icon" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="matchNavFixture">
                <span>{currentFixture.home_team_name}</span>
                <span>v</span>
                <span>{currentFixture.away_team_name}</span>
            </div>
            <button
              className="navArrow"
              onClick={goNext}
              disabled={!hasNext}
            >
              <svg viewBox="0 0 24 24" className="arrow-icon" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
        </div>
    )
}