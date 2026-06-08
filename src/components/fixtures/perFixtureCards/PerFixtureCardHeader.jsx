import { format } from "date-fns";

export default function PerFixtureCardHeader({ fixture }) {

    const localKO = format(new Date(fixture.kickoff_at), "dd MMM HH:mm")

    const now = Date.now();

    const open = new Date(fixture.prediction_open_at).getTime();
    const closed = new Date(fixture.prediction_closed_at).getTime();

    let windowCheck = "closedAfter";

    if (now < open) windowCheck = "closedBefore";
    else if (now >= open && now <= closed) windowCheck = "open";
    else if (now >= closed && fixture.fixture_status === "live") windowCheck = "closedAfter";
    else windowCheck = "blank";


    const windowMap = {
        closedBefore: {
            label: "Opens Soon",
            color: "blue"
        },
        open: {
            label: "Open",
            color: "blue"
        },
        closedAfter: {
            label: "Closed",
            color: "grey"
        },
        blank: {
            label: "",
            color: "white"
        }
    };

    const getTimeRemaining = (target) => {
        const total = new Date(target).getTime() - Date.now();
        if (total <= 0) return null;

        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        const days = Math.floor(total / 1000 / 60 / 60 / 24);

        return { days, hours, minutes };
    }
    let windowCountdown = null;
    if (windowCheck === "closedBefore") {
      windowCountdown = getTimeRemaining(fixture.prediction_open_at);
    }

    if (windowCheck === "open") {
      windowCountdown = getTimeRemaining(fixture.prediction_close_at);
    }

    const windowMeta = windowMap[windowCheck];

    const statusMap = {
        upcoming: {label: 'Upcoming', color: 'amber'},
        live: {label: 'Live', color: 'green'},
        finished: {label: 'Finished', color: 'red'}
    };

    const statusMeta = statusMap[fixture.fixture_status];

    return (
        <div className="fixtureCardHeader perFixtureCardHeader">
            {statusMeta && (
                <div className={`fixtureStatus ${statusMeta.color}`}>
                    <span className="dot" />
                    {statusMeta.label}
                </div>
            )}

            <div className="fcHeaderCenter">
                <div className="day">{localKO}</div>
            </div>

            {windowMeta && windowMeta.label && (
                <div className={`perPredictionStatus ${windowMeta.color}`}>
                    {windowMeta.label}
                    <span className="dot" />
                </div>
            )}

        </div>
    )
}