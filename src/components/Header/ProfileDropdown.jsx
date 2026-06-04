import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(prev => !prev);

  const handleLogout = () => {
    const confirmLogout = window.confirm(`Logout ${user?.display_name}`);
    if (confirmLogout) onLogout(user);
  };

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div id="profileDropdown" ref={ref}>
      <button id="profileDropdownToggle" onClick={toggleMenu}>
        <img src="/assets/logos/FullLogo_Transparent_smallr.png" />
      </button>

      {open && (
        <div className="profileDropdownMenu left">
          <div className="profileDropdownItem disabled">
            Account <span className="tag">Soon!</span>
          </div>
          <div className="profileDropdownItem disabled">
            Create Club <span className="tag">Soon!</span>
          </div>
          <div className="profileDropdownItem disabled">
            Join Club <span className="tag">Soon!</span>
          </div>
          <div 
            className="profileDropdownItem disabled"
            // onClick={() => {
            //   navigate("/hof");
            //   setOpen(false);
            // }}
          >
            Hall of Fame <span className="tag">Soon!</span>
          </div>
          <div 
            className="profileDropdownItem disabled"
            // onClick={() => {
            //   navigate("/rules");
            //   setOpen(false);
            // }}
          >
            Rules <span className="tag">Soon!</span>
          </div>
          <div 
            className="profileDropdownItem logout"
            onClick={handleLogout}
          >
            Log Out
          </div>
        </div>
      )}
    </div>
  );
}