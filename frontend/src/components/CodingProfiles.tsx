import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Terminal, Target, Trophy, Star, Activity, Award } from 'lucide-react';

interface LeetCodeData {
  status: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
}

interface CodeforcesData {
  status: string;
  result: Array<{
    handle: string;
    rating: number;
    rank: string;
    maxRating: number;
    maxRank: string;
  }>;
}

const CodingProfiles = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const [lcData, setLcData] = useState<LeetCodeData | null>(null);
  const [cfData, setCfData] = useState<CodeforcesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [lcRes, cfRes] = await Promise.all([
          fetch('https://leetcode-stats-api.herokuapp.com/Rana_Darpan'),
          fetch('https://codeforces.com/api/user.info?handles=Error200')
        ]);
        
        if (lcRes.ok) setLcData(await lcRes.json());
        if (cfRes.ok) setCfData(await cfRes.json());
      } catch (error) {
        console.error('Failed to fetch coding stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cfProfile = cfData?.result?.[0];

  return (
    <section className="relative section-padding overflow-hidden" id="stats">
      <div className="absolute inset-0 mesh-gradient opacity-10 dark:opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block text-brand-500 dark:text-brand-400 font-semibold text-sm tracking-widest uppercase mb-4">
            Competitive Programming
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-text-primary">
            Coding <span className="gradient-text">Profiles</span>
          </h2>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 gap-6 lg:gap-10">
          
          {/* LeetCode Profile */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="card-3d h-full"
          >
            <div className="glass rounded-3xl p-6 md:p-8 gradient-border relative h-full flex flex-col group overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Code2 className="w-32 h-32 text-orange-400" />
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                  <Code2 className="w-7 h-7 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary">LeetCode</h3>
                  <a href="https://leetcode.com/u/Rana_Darpan/" target="_blank" rel="noreferrer" className="text-brand-600 dark:text-brand-400 text-sm hover:underline">
                    @Rana_Darpan
                  </a>
                </div>
              </div>

              {loading ? (
                <div className="flex-1 flex items-center justify-center min-h-[200px]">
                  <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
                </div>
              ) : lcData && lcData.status === "success" ? (
                <div className="flex-1 flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="glass bg-black/5 dark:bg-white/5 rounded-2xl p-4 border border-black/5 dark:border-white/5">
                      <Target className="w-5 h-5 text-orange-400 mb-2" />
                      <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Total Solved</p>
                      <p className="text-2xl font-bold text-text-primary">{lcData.totalSolved}</p>
                    </div>
                    <div className="glass bg-black/5 dark:bg-white/5 rounded-2xl p-4 border border-black/5 dark:border-white/5">
                      <Activity className="w-5 h-5 text-green-500 dark:text-green-400 mb-2" />
                      <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Acceptance</p>
                      <p className="text-2xl font-bold text-text-primary">{lcData.acceptanceRate}%</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-emerald-500 dark:text-emerald-400 font-medium">Easy</span>
                        <span className="text-text-secondary">{lcData.easySolved}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5">
                        <div className="bg-emerald-500 dark:bg-emerald-400 h-1.5 rounded-full" style={{ width: `${(lcData.easySolved / lcData.totalSolved) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-amber-500 dark:text-amber-400 font-medium">Medium</span>
                        <span className="text-text-secondary">{lcData.mediumSolved}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5">
                        <div className="bg-amber-500 dark:bg-amber-400 h-1.5 rounded-full" style={{ width: `${(lcData.mediumSolved / lcData.totalSolved) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-rose-500 dark:text-rose-400 font-medium">Hard</span>
                        <span className="text-text-secondary">{lcData.hardSolved}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5">
                        <div className="bg-rose-500 dark:bg-rose-400 h-1.5 rounded-full" style={{ width: `${(lcData.hardSolved / lcData.totalSolved) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-slate-400">Failed to load statistics.</p>
              )}
            </div>
          </motion.div>

          {/* Codeforces Profile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-3d h-full"
          >
            <div className="glass rounded-3xl p-6 md:p-8 gradient-border relative h-full flex flex-col group overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Terminal className="w-32 h-32 text-blue-400" />
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <Terminal className="w-7 h-7 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary">Codeforces</h3>
                  <a href="https://codeforces.com/profile/Error200" target="_blank" rel="noreferrer" className="text-brand-600 dark:text-brand-400 text-sm hover:underline">
                    @Error200
                  </a>
                </div>
              </div>

              {loading ? (
                <div className="flex-1 flex items-center justify-center min-h-[200px]">
                  <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                </div>
              ) : cfProfile ? (
                <div className="flex-1 flex flex-col justify-center">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="glass bg-black/5 dark:bg-white/5 rounded-2xl p-5 border border-black/5 dark:border-white/5 text-center transition-transform hover:-translate-y-1">
                      <Star className="w-6 h-6 text-yellow-500 dark:text-yellow-400 mx-auto mb-3" />
                      <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Current Rating</p>
                      <p className="text-3xl font-display font-bold text-text-primary">{cfProfile.rating || 'N/A'}</p>
                    </div>
                    <div className="glass bg-black/5 dark:bg-white/5 rounded-2xl p-5 border border-black/5 dark:border-white/5 text-center transition-transform hover:-translate-y-1">
                      <Trophy className="w-6 h-6 text-brand-500 dark:text-brand-400 mx-auto mb-3" />
                      <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Max Rating</p>
                      <p className="text-3xl font-display font-bold text-text-primary">{cfProfile.maxRating || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="glass bg-black/5 dark:bg-white/5 rounded-2xl p-5 border border-black/5 dark:border-white/5 text-center flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-purple-500 dark:text-purple-400" />
                      <span className="text-text-secondary font-medium tracking-wide">Rank</span>
                    </div>
                    <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 capitalize">
                      {cfProfile.rank || 'N/A'}
                    </span>
                  </div>
                  <div className="glass bg-black/5 dark:bg-white/5 rounded-2xl p-5 border border-black/5 dark:border-white/5 text-center flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
                      <span className="text-text-secondary font-medium tracking-wide">Max Rank</span>
                    </div>
                    <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-yellow-300 dark:to-orange-400 capitalize">
                      {cfProfile.maxRank || 'N/A'}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-text-secondary">Failed to load statistics.</p>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CodingProfiles;
