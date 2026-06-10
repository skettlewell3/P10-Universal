import { format } from "date-fns";

const getNow = () => new Date().getTime();

export default function PFCardDeadline({ fixture }) {
    const now = getNow();

    const openAt = new Date(fixture.prediction_open_at).getTime();
    const closeAt = new Date(fixture.prediction_close_at).getTime();

    if (now > closeAt) return null;

    if (now < openAt) {
        return (
            <div className="deadlineCell">
                <span className="deadlineLabel">Opens:</span>
                <span className="deadline">
                    {format(new Date(fixture.prediction_open_at), "dd/MM HH:mm")}
                </span>
            </div>
        );
    }

    return (
        <div className="deadlineCell">
            <span className="deadlineLabel">Closes:</span>
            <span className="deadline">
                {format(new Date(fixture.prediction_close_at), "dd/MM HH:mm")}
            </span>
        </div>
    );
}