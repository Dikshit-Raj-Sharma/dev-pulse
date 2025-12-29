import React from "react";
import { Search } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import ProfileCard from "./components/ProfileCard";
import LanguageCharts from "./components/LanguageCharts";

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
    <>
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            DevPulse
          </h1>
          <p className="text-slate-500 mb-8">
            Type a GitHub username to see their tech DNA.
          </p>
          {err && <p className="text-red-500 text-sm mb-4">{err}</p>}
          {/* The Grid Container: 1 column by default, 2 columns on 'medium' screens and up */}
          <SearchBar
            username={username}
            setUsername={setUsername}
            handleSearch={handleSearch}
            loading={loading}
          />
          <ProfileCard userData={userData} />

          <LanguageCharts repos={repos} />
        </div>
      </div>
    </>
  );
}

export default App;
