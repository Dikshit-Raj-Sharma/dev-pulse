import React from "react";
import { Search } from "lucide-react";
import { useState } from "react";
import axios from 'axios';


function App() {


  const [username, setUsername] = useState("");
  const [userData, setUserData]=useState(null);
  const [loading, setLoading]=useState(false);
  const [err, setErr]=useState(null);


  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username) return;
    setLoading(true);
    setErr(null);
    setUserData(null);

    try{
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(response.data);
      console.log("User data found:", response.data);
    }catch(err){
      if(err.response && err.response.status===404){
        setErr("User Not Found. Check the spelling!");
      }else{
        setErr("An error occurred while fetching data.")
      }
    }finally{
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
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Username"
                className="w-full pl-10 pr-40 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Search
                className="absolute left-3 top-3.5 text-slate-400"
                size={20}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-200"
            >
              {loading ? "Loading..." : "Search Profile"}
              
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
