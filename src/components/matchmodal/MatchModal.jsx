import { useEffect, useState } from "react";
import MatchNav from "./MatchNav";
import MatchFixtureCard from "./MatchFixtureCard";
import FormContainer from "./FormContainer";

export default function MatchModal({
    fixture,
    fixtures,
    navigationFixtures,
    onClose,
}) {
    const [currentFixture, setCurrentFixture] = useState(fixture);

    useEffect(() => {
        setCurrentFixture(fixture);
    }, [fixture]);

    if (!currentFixture) return null;

    const isUpcoming = currentFixture.fixture_status === "upcoming";

    const index = navigationFixtures.findIndex(
        f => f.fixture_id === currentFixture.fixture_id
    );

    const prevFixture =
        index > 0
            ? navigationFixtures[index - 1]
            : null;

    const nextFixture =
        index < navigationFixtures.length - 1
            ? navigationFixtures[index + 1]
            : null;

    const goPrev = () => {
        if (prevFixture) {
            setCurrentFixture(prevFixture);
        }
    };

    const goNext = () => {
        if (nextFixture) {
            setCurrentFixture(nextFixture);
        }
    };

    return (
        <>
            <div
                id="modalOverlay"
                onClick={onClose}
            />

            <div id="teamModal">
                <div id="teamModalCard">

                    <div className="modalHeader">

                        <MatchNav
                            currentFixture={currentFixture}
                            goPrev={goPrev}
                            goNext={goNext}
                            hasPrev={!!prevFixture}
                            hasNext={!!nextFixture}
                        />

                        <button
                            id="teamModalClose"
                            onClick={onClose}
                        >
                            ✕
                        </button>

                    </div>

                    <div className="modalCardBody">

                        <MatchFixtureCard
                            fixture={currentFixture}
                        />

                        <FormContainer
                            fixtures={fixtures}
                            currentFixture={currentFixture}
                        />

                        {/* <LeagueSnapshot
                            fixture={currentFixture}
                        />

                        <TeamComparison
                            fixture={currentFixture}
                        /> */}

                        {!isUpcoming && (
                            <MatchLeaderboard
                                fixture={currentFixture}
                            />
                        )}

                    </div>

                </div>
            </div>
        </>
    );
}