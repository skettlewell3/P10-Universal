export default function SubmitSlideUp({
    validDrafts, 
    handleBulkSubmit, 
    predictionsLoading
}) {    
    return (
        <div className="bulkSubmitBar">
            <button onClick={handleBulkSubmit} disabled={predictionsLoading}>
                Submit All 
            </button>
        </div>
    )
}