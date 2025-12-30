import React from "react";

const ProfileCard = ({ userData }) => {
  if (!userData) return null;

  return (
    /* ADDED: dark:bg-slate-900 dark:border-slate-800 */
    <div className="h-full p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-top-4 flex flex-col justify-between">
      
      {/* Top Section: Avatar and Name */}
      <div className="flex items-center gap-4">
        <img
          src={userData.avatar_url}
          alt={userData.name}
          /* Updated border for dark mode */
          className="w-20 h-20 rounded-full border-2 border-white dark:border-slate-700 shadow-md"
        />
        <div>
          {/* ADDED: dark:text-white */}
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {userData.name || userData.login}
          </h2>
          {/* Blue text stays blue, it looks great on dark! */}
          <p className="text-blue-600 dark:text-blue-400 font-medium">@{userData.login}</p>
        </div>
      </div>

      {/* Bio Section */}
      {userData.bio && (
        /* ADDED: dark:text-slate-400 */
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
          "{userData.bio}"
        </p>
      )}

      {/* Stats Grid */}
      {/* ADDED: dark:border-slate-800 */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="text-center">
          <p className="text-[10px] text-slate-500 dark:text-slate-500 uppercase font-bold tracking-wider">
            Repos
          </p>
          {/* ADDED: dark:text-slate-100 */}
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {userData.public_repos}
          </p>
        </div>
        
        {/* ADDED: dark:border-slate-800 */}
        <div className="text-center border-x border-slate-200 dark:border-slate-800">
          <p className="text-[10px] text-slate-500 dark:text-slate-500 uppercase font-bold tracking-wider">
            Followers
          </p>
          {/* ADDED: dark:text-slate-100 */}
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {userData.followers}
          </p>
        </div>

        <div className="text-center">
          <p className="text-[10px] text-slate-500 dark:text-slate-500 uppercase font-bold tracking-wider">
            Following
          </p>
          {/* ADDED: dark:text-slate-100 */}
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {userData.following}
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <a
        href={userData.html_url}
        target="_blank"
        rel="noreferrer"
        /* ADDED: dark:hover:text-blue-400 */
        className="block w-full text-center mt-6 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
      >
        View GitHub Profile →
      </a>
    </div>
  );
};

export default ProfileCard;