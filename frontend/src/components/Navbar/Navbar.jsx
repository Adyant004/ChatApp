import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("data-theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("data-theme", theme);
    document.querySelector("html").setAttribute("data-theme",theme);
  }, [theme]);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className="navbar bg-base-100 font-Reddit">
      <div className="flex-1">
        <a href="#" className="font-bold cursor-pointer text-3xl">ChatApp</a>
      </div>
      <div className="flex-none">
        <select
          id="mySelect"
          value={theme}
          onChange={handleThemeChange}
          className="select select-bordered w-full max-w-xs"
        >
          <option disabled value="">
            Select theme
          </option>
          <option value="cupcake">Cupcake</option>
          <option value="synthwave">Synthwave</option>
          <option value="retro">Retro</option>
          <option value="cyberpunk">Cyberpunk</option>
          <option value="valentine">Valentine</option>
          <option value="forest">Forest</option>
          <option value="coffee">Coffee</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
