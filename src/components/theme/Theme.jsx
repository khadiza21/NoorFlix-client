import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
const Theme = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setIsDarkMode(savedTheme === "dark");
        }
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark-theme");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-theme");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
const useTheme = () => {
    return useContext(ThemeContext);
};

export { Theme, useTheme };
