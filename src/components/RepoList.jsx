import React from "react";
import { Star, GitFork, ExternalLink } from "lucide-react";

const RepoList = ({ repos }) => {
  if (!repos || repos.length === 0) return null;

  const topRepos = [...repos]
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return b.forks_count - a.forks_count;
    })
    .slice(0, 3);

  return (
    <div className="mt-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* ADDED: dark:text-white */}
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 px-2">
        Featured Projects
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topRepos.map((repo) => (
          <div key={repo.id}>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              /* ADDED: dark:bg-slate-900 dark:border-slate-800 */
              className="h-full flex flex-col justify-between group p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div>
                <div className="flex justify-between items-start">
                  {/* ADDED: dark:text-slate-100 dark:group-hover:text-blue-400 */}
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate mr-2">
                    {repo.name}
                  </h4>
                  <ExternalLink
                    size={16}
                    className="text-slate-300 group-hover:text-blue-400 shrink-0"
                  />
                </div>
                {/* ADDED: dark:text-slate-400 */}
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                  {repo.description || "No description provided."}
                </p>
              </div>

              {/* ADDED: dark:border-slate-800 */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800 mt-6">
                {/* Language Badge Styling */}
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded uppercase">
                  {repo.language || "Other"}
                </span>

                <div className="flex gap-3 text-slate-400">
                  <span className="flex items-center gap-1 text-xs font-medium">
                    <Star size={14} className="text-amber-400" />{" "}
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium">
                    <GitFork size={14} /> {repo.forks_count}
                  </span>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepoList;