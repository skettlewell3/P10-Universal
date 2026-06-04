export default function AppContainer({ children }) {
    return (
        <div id="appContainer">
            {children}
            <div id="modal-root"></div> 
        </div>
    )
}