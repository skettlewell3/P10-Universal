import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFixtures } from "../../hooks/useFixtures";
import DashboardSnapshot from "./DashboardSnapshot";
import { FixturesLogo } from "./DashboardLogos";
import FixtureSnapshot from "./FixtureSnapshot";

export default function DashButtonFixture({ label, to }) {
    const navigate = useNavigate();
    const { snapshotFixtures } = useFixtures();

    const [showLogo, setShowLogo] = useState(true);

    const handleClick = () => {
        navigate(to);
    };

    useEffect(() => {
        if (!snapshotFixtures?.length) return;

        const timer = setTimeout(() => {
            setShowLogo(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [snapshotFixtures]);

    return (
        <button
            className="dashboardButton"
            onClick={handleClick}
        >
            <div className="dashContent">

                <div className="dashButtonLabel">
                    <span>{label}</span>
                </div>

                {showLogo ? (
                    <FixturesLogo />
                ) : (
                    <DashboardSnapshot
                        screens={snapshotFixtures.map(fixture => (
                            <FixtureSnapshot
                                key={fixture.fixture_id}
                                fixture={fixture}
                            />
                        ))}
                        interval={5000}
                        loopFrom={0}
                    />
                )}

            </div>
        </button>
    );
}