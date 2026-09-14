"""Modern glassmorphism + neon UI components for deepkrak3n."""

const GlassmorphicCard = ({
  children,
  className = "",
  neonColor = "cyan",
}: {
  children: React.ReactNode;
  className?: string;
  neonColor?: "cyan" | "purple" | "pink" | "green" | "blue";
}) => {
  const neonColorMap = {
    cyan: "from-cyan-400 to-blue-500",
    purple: "from-purple-400 to-pink-500",
    pink: "from-pink-400 to-rose-500",
    green: "from-green-400 to-emerald-500",
    blue: "from-blue-400 to-cyan-500",
  };

  return (
    <div
      className={`
        relative backdrop-blur-md bg-white/10 border border-white/20
        rounded-2xl p-6 shadow-2xl overflow-hidden
        hover:bg-white/15 transition-all duration-300
        before:absolute before:inset-0 before:bg-gradient-to-br
        before:${neonColorMap[neonColor]} before:opacity-0 before:blur-xl
        before:transition-opacity before:duration-300 before:-z-10
        hover:before:opacity-20
        ${className}
      `}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const NeonButton = ({
  children,
  onClick,
  variant = "primary",
  isLoading = false,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "danger";
  isLoading?: boolean;
  disabled?: boolean;
}) => {
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-lg shadow-cyan-500/50",
    secondary:
      "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 shadow-lg shadow-purple-500/50",
    success:
      "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 shadow-lg shadow-green-500/50",
    danger:
      "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 shadow-lg shadow-red-500/50",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        px-8 py-3 rounded-lg font-semibold text-white
        transition-all duration-300 transform
        hover:scale-105 hover:shadow-2xl
        active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
        backdrop-blur-sm border border-white/20
        ${variantClasses[variant]}
        ${isLoading ? "animate-pulse" : ""}
      `}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Searching...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

const SuccessRateIndicator = ({ rate }: { rate: number }) => {
  const percentage = Math.min(Math.max(rate, 0), 100);
  const color =
    percentage >= 80
      ? "from-green-400 to-emerald-500"
      : percentage >= 60
        ? "from-yellow-400 to-amber-500"
        : "from-red-400 to-pink-500";

  return (
    <div className="relative w-full h-12 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 overflow-hidden">
      <div
        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${color} transition-all duration-500 flex items-center justify-center`}
        style={{ width: `${percentage}%` }}
      >
        {percentage > 15 && (
          <span className="text-white font-bold text-sm drop-shadow-lg">
            {percentage}%
          </span>
        )}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        {percentage <= 15 && (
          <span className="text-white font-bold text-sm drop-shadow-lg">
            {percentage}%
          </span>
        )}
      </div>
    </div>
  );
};

const ProfileCard = ({
  profile,
  neonColor = "cyan",
}: {
  profile: any;
  neonColor?: string;
}) => {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "from-red-500 to-pink-500";
      case "medium":
        return "from-yellow-500 to-orange-500";
      case "low":
        return "from-green-500 to-emerald-500";
      default:
        return "from-cyan-500 to-blue-500";
    }
  };

  return (
    <GlassmorphicCard neonColor={neonColor}>
      <div className="space-y-4">
        {/* Header with Site Name and Confidence */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              {profile.site}
            </h3>
            <p className="text-sm text-cyan-300">{profile.detection_type}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50">
              <span className="text-cyan-300 font-semibold text-sm">
                {(profile.confidence * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* URL */}
        <a
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 text-sm truncate underline transition-colors"
        >
          {profile.url}
        </a>

        {/* Metadata Section */}
        {profile.metadata && (
          <div className="grid grid-cols-2 gap-3 text-sm">
            {profile.metadata.display_name && (
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wide">
                  Name
                </p>
                <p className="text-white font-semibold truncate">
                  {profile.metadata.display_name}
                </p>
              </div>
            )}
            {profile.metadata.follower_count && (
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wide">
                  Followers
                </p>
                <p className="text-green-400 font-semibold">
                  {profile.metadata.follower_count.toLocaleString()}
                </p>
              </div>
            )}
            {profile.metadata.verified && (
              <div className="col-span-2">
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-green-500/20 border border-green-400/50">
                  <span className="text-green-400">✓</span>
                  <span className="text-green-300 text-xs">Verified</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Risk Assessment */}
        {profile.risk_level && (
          <div className="space-y-2">
            <p className="text-white/60 text-xs uppercase tracking-wide">Risk Level</p>
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full bg-gradient-to-r ${getRiskColor(
                  profile.risk_level
                )} shadow-lg`}
              />
              <span className="capitalize font-semibold text-white">
                {profile.risk_level}
              </span>
              <span className="text-xs text-white/60">
                ({(profile.risk_score * 100).toFixed(0)})
              </span>
            </div>
            {profile.risk_flags && profile.risk_flags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {profile.risk_flags.map((flag: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded bg-red-500/20 border border-red-400/50 text-red-300"
                  >
                    {flag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Latency */}
        {profile.latency_ms !== undefined && (
          <div className="text-xs text-white/60">
            Response time: <span className="text-cyan-300">{profile.latency_ms}ms</span>
          </div>
        )}
      </div>
    </GlassmorphicCard>
  );
};

const StatsPanel = ({
  stats,
}: {
  stats: {
    total_checked: number;
    total_found: number;
    scan_duration_seconds: number;
    average_confidence: number;
  };
}) => {
  const successRate = Math.round(
    (stats.total_found / stats.total_checked) * 100
  );
  const platformsPerSecond = (
    stats.total_checked / stats.scan_duration_seconds
  ).toFixed(1);

  return (
    <GlassmorphicCard neonColor="purple" className="mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <p className="text-white/60 text-xs uppercase tracking-wide">Scanned</p>
          <p className="text-3xl font-bold text-cyan-400">
            {stats.total_checked}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-white/60 text-xs uppercase tracking-wide">Found</p>
          <p className="text-3xl font-bold text-green-400">
            {stats.total_found}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-white/60 text-xs uppercase tracking-wide">
            Success Rate
          </p>
          <p className="text-3xl font-bold text-purple-400">{successRate}%</p>
        </div>
        <div className="space-y-2">
          <p className="text-white/60 text-xs uppercase tracking-wide">Speed</p>
          <p className="text-3xl font-bold text-blue-400">
            {platformsPerSecond}
            <span className="text-sm">/s</span>
          </p>
        </div>
      </div>

      {/* Success Rate Bar */}
      <div className="mt-6">
        <p className="text-white/60 text-xs uppercase tracking-wide mb-2">
          Overall Success Rate
        </p>
        <SuccessRateIndicator rate={successRate} />
      </div>
    </GlassmorphicCard>
  );
};

export {
  GlassmorphicCard,
  NeonButton,
  SuccessRateIndicator,
  ProfileCard,
  StatsPanel,
};
