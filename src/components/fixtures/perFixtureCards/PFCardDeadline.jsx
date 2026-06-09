import { format } from "date-fns"

export default function PFCardDeadline({ fixture }) {

    const openAt = format(
        new Date(fixture.prediction_open_at),
        "dd/MM HH:mm"
    );
    const closeAt = format(
        new Date(fixture.prediction_close_at),
        "dd/MM HH:mm"
    );

    return (
        <div className="deadlineCell">
            <span className="deadlineLabel">Open: </span>
            <span className="deadline">
                {openAt}
            </span>
        </div>
    )
}