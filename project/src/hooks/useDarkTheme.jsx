import { useState } from "react"

function useDarkMode() {
    const [darkmode, setDarkMode] = useState(false);

    function changeDarkTheme() {
        document.body.classList.toggle("dark")
        setDarkMode(!darkmode)
    }
  return [darkmode, changeDarkTheme]
}

export default useDarkMode