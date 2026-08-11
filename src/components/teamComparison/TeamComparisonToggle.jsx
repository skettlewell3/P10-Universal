export default function TeamComparisonToggle({ comparisonMode, setComparisonMode }) {
    return (
        <div className="comparisonToggle">
            <span
                className={comparisonMode === "generic" ? "active" : ""}
                onClick={() => setComparisonMode("generic")}
            >
                Overall
            </span>

            <span
                className={comparisonMode === "direct" ? "active" : ""}
                onClick={() => setComparisonMode("direct")}
            >
                Direct
            </span>
        </div>
    );
}