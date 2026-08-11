export default function FixtureCellHeader({ venue, metaHeader, className }) {
    return (
        <div className={`fixtureCellHeader ${className || ""}`}>
            <div className="resultHeader">
                {venue}
            </div>
            <div className="metaHeader">
                {metaHeader}
            </div>
        </div>
    )
}

