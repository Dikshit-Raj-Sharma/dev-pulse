import React from "react";
import { Search } from "lucide-react";
import { useState } from "react";
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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username) return;
    setLoading(true);
    setErr(null);
    setUserData(null);
    setRepos([]);
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUserData(response.data);
      console.log("User data found:", response.data);

      const reposResponse = await axios.get(
        `${response.data.repos_url}?per_page=30&sort=updated`
      );
      setRepos(reposResponse.data);
      console.log("Repos found:", reposResponse.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setErr("User Not Found. Check the spelling!");
      } else {
        setErr("An error occurred while fetching data.");
      }
    } finally {
      setLoading(false);
    }

    console.log("Looking for GitHub user:", username);
  };
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
      {/* Notice max-w-5xl for a wider dashboard view */}
      <div className="w-full max-w-5xl transition-all duration-700">
        {/* Search Section stays at the top */}
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-100 mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            DevPulse
          </h1>
          <p className="text-slate-500 mb-6 text-sm">
            Analyze tech DNA in seconds.
          </p>
          {err && (
            <p className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold mb-4 border border-red-100 animate-pulse">
              {err}
            </p>
          )}
          <SearchBar
            username={username}
            setUsername={setUsername}
            handleSearch={handleSearch}
            loading={loading}
          />
        </div>

        {/* DASHBOARD GRID - Pops in only when data is found */}
        {userData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in slide-in-from-bottom-8 duration-1000">
            <div className="flex flex-col h-full">
              <ProfileCard userData={userData} />
            </div>
            <div className="flex flex-col h-full">
              <LanguageCharts repos={repos} />
            </div>
          </div>
        )}
        {/* REPO LIST can go here, spanning full width */}
        <RepoList repos={repos} />
      </div>
    </div>
  );
}

export default App;
