import React, { useState, useEffect } from "react"; // Added useEffect here
import { Search } from "lucide-react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import ProfileCard from "./components/ProfileCard";
import LanguageCharts from "./components/LanguageCharts";
import RepoList from "./components/RepoList.jsx";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [repos, setRepos] = useState([]);
  
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username) return;
    setLoading(true);
    setErr(null);
    setUserData(null);
    setRepos([]);

    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(response.data);
      const reposResponse = await axios.get(`${response.data.repos_url}?per_page=30&sort=updated`);
      setRepos(reposResponse.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setErr("User Not Found. Check the spelling!");
      } else {
        setErr("An error occurred while fetching data.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-6 right-6 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700 z-50 transition-all hover:scale-110 active:scale-95"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 md:p-8 transition-colors duration-500">
        <div className="w-full max-w-5xl transition-all duration-700">
          <div className="max-w-md mx-auto bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">DevPulse</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">Analyze tech DNA in seconds.</p>
            {err && (
              <p className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold mb-4 border border-red-100 animate-pulse">
                {err}
              </p>
            )}
            <SearchBar username={username} setUsername={setUsername} handleSearch={handleSearch} loading={loading} />
          </div>

          {userData && (
            <div className="w-full max-w-5xl mx-auto pb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch animate-in fade-in zoom-in slide-in-from-bottom-8 duration-1000 mb-8">
                <div className="flex flex-col h-full">
                  <ProfileCard userData={userData} />
                </div>
                <div className="flex flex-col h-full">
                  <LanguageCharts repos={repos} />
                </div>
              </div>
              <RepoList repos={repos} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;