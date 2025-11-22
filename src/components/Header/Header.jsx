import React,{useEffect,useRef,useState} from 'react'
import {Container, Logo, LogoutBtn,Hamburger,ThemeBtn,Search} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import companyLogo from "../../assets/companyLogo.png"
import { useNavigate } from 'react-router-dom'
import { ImagePlus} from "lucide-react"; // icons

function Header({ onToggle }) {

  const navigate = useNavigate()

  function goToHome() {
    navigate("/add-post");
  }

  const authStatus = useSelector((state) => state.auth.status)
  const themeMode = useSelector((state) => state.theme.themeMode);

  // ✅ Apply theme to HTML tag for Tailwind dark mode
  useEffect(() => {
    const html = document.querySelector('html');
    html.classList.remove('light', 'dark');
    html.classList.add(themeMode);
  }, [themeMode]);



  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // mobile/tablet only
  const lastScrollY = useRef(0);

  // useEffect(() => {

  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 1024);
  //   };
  //   window.addEventListener("resize", handleResize);

  //   const handleScroll = () => {
  //     if (!isMobile) return; // ⛔ desktop → do nothing

  //     const currentScroll = window.scrollY;
  //     const diff = currentScroll - lastScrollY.current;

  //     // scrolling down
  //     if (diff > 20 && currentScroll > 150) setHidden(true);
  //     // scrolling up
  //     else if (diff < -20) setHidden(false);

  //     lastScrollY.current = currentScroll;
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [isMobile]);
  


  useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 1024);
  };
  window.addEventListener("resize", handleResize);

  const handleScroll = () => {
    if (!isMobile) return;

    const currentScroll = window.scrollY;
    const diff = currentScroll - lastScrollY.current; // ✔ FIXED

    if (diff > 10 && currentScroll > 30) setHidden(true);
    else if (diff < -20) setHidden(false);

    lastScrollY.current = currentScroll;
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
  };
}, [isMobile]);


  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // blur when scroll > 10px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed  justify-between items-center flex  gap-4 top-0 left-0 w-full h-16  
        dark:bg-slate-900/70
          ${scrolled
          ? "bg-white/40 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-300/20 transition-all duration-200"
          : "bg-white backdrop-blur-md text-slate-900 transition-all duration-50"}

           ${ hidden ? "-translate-y-full" : "translate-y-0"}
          `}
    >

      <div className=' min-w-[140px]  flex gap-2 items-center'>

         {/* Hamburger icon */}
      <div className='ml-2 hidden sm:block '>
          <Hamburger onToggle={onToggle}/>
        </div>

        {/* company logo */}
        <div className='flex justify-center items-center '>
        <img src={companyLogo} alt="" className=' h-[clamp(40px,1vw,48px)] w-auto' />
        <p className=' text-black dark:text-white -ml-1 text-[20px] font-bold bg-clip-text 
          '>CAMPUS </p>
        </div>

      </div>

      <div className='flex-auto flex justify-center px-2 min-w-0 '>
        <Search/>
      </div>
         {authStatus && (
            <div onClick={goToHome} className=' min-w-[100px] gap-1 justify-center items-center text-black dark:text-white flex-shrink-0 
             hidden sm:flex  px-2 py-1 bg-black/20 dark:bg-white/20 rounded-2xl mr-2 dark:hover:bg-white/40 hover:bg-black/40'>
            <ImagePlus/>
            <p>create</p>
          </div>
        )}

        <div className='mr-1'>
        <ThemeBtn/>
        </div>

    </header>
  )
}

export default Header