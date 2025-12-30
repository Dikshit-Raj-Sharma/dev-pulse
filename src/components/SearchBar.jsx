import React from 'react';
import { Search } from 'lucide-react';

function SearchBar({ username, setUsername, handleSearch, loading }) {
  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Enter Username"
          /* ADDED: dark:bg-slate-800 dark:border-slate-700 
             ADDED: dark:text-white dark:placeholder:text-slate-500 
          */
          className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white dark:placeholder:text-slate-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Search className="absolute left-3 top-3.5 text-slate-400 dark:text-slate-500" size={20} />
      </div>
      <button
        type="submit"
        disabled={loading}
        /* ADDED: dark:shadow-none (Blue shadows can look a bit weird on very dark backgrounds)
        */
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-200 dark:shadow-none disabled:opacity-50"
      >
        {loading ? "Searching..." : "Search Profile"}
      </button>
    </form>
  );
}
export default SearchBar;