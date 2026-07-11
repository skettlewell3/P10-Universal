export default function ResolutionRow({
    fixture
}) {

    const RESOLUTION_LABELS = {
        extra_time: "won in extra eime",
        penalties: "won on penalties",
    }

    return (
        <div className="resolution">
            (*) {RESOLUTION_LABELS[fixture.resolution_type]}
        </div>
    )
}