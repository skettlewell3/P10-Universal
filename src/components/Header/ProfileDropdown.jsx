import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProfileDropdown({ profile }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  const { signOut } = useAuth();

  const toggleMenu = () => setOpen(prev => !prev);

  const handleSignOut = async () => {
    const confirmSignOut = window.confirm(
      `Sign Out ${profile?.display_name}`
    );

    if (!confirmSignOut) return;
    
    await signOut();
    navigate("/", { replace: true})
    
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
          <div 
            className="profileDropdownItem"
            onClick={() => {
              navigate("/account");
              setOpen(false);
            }}
          
          >
            Account
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
            onClick={handleSignOut}
          >
            Sign Out
          </div>
        </div>
      )}
    </div>
  );
}