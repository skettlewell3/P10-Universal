export default function ResolutionRow({
    fixture
}) {

    const RESOLUTION_LABELS = {
        extra_time: "won in extra time",
        penalties: "won on penalties",
    }

    if (!fixture.resolution_type) {
        return null;
    }
    
    return (
        <div className="resolution">
            (*) {RESOLUTION_LABELS[fixture.resolution_type]}
        </div>
    )
}