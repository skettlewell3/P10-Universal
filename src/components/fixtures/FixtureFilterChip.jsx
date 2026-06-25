export default function FixtureFilterChip({ label, value, onRemove }) {
    return (
        <div className="filterChip">
            <div className="chipLabels">
                <span>{label}</span>
                <span>{value}</span>
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