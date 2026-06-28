export default function FixtureFilterChip({ display, onRemove }) {
    return (
        <div className="filterChip">
            <div className="chipLabels">
                <span>{display}</span>
            </div>
            <div className="chipX">
                <button 
                    className="chipXButton"
                    onClick={onRemove}
                >
                    ×
                </button>
            </div>
        </div>
    );
}