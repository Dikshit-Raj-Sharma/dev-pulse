import React from "react";
import { Search } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import ProfileCard from "./components/ProfileCard";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

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
          <SearchBar
            username={username}
            setUsername={setUsername}
            handleSearch={handleSearch}
            loading={loading}
          />
          <ProfileCard userData={userData} />
        </div>
      </div>
    </>
  );
}

export default App;
