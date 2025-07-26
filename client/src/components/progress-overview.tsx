import { Card, CardContent } from "@/components/ui/card";

interface ProgressOverviewProps {
  userName: string;
  stats: {
    overallProgress: number;
    streak: number;
    certificates: number;
    completedLessons: number;
    totalLessons: number;
  };
}

export default function ProgressOverview({ userName, stats }: ProgressOverviewProps) {
  const { overallProgress, streak, certificates } = stats;
  
  // Calculate stroke offset for circular progress
  const circumference = 2 * Math.PI * 40;
  const strokeOffset = circumference - (overallProgress / 100) * circumference;

  return (
    <div className="mb-8">
      <Card className="bg-gradient-to-r from-primary to-purple-600 text-white overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back, {userName}!</h2>
              <p className="text-blue-100 mb-4">
                You're {overallProgress}% through your WordPress mastery journey
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-fire text-orange-300"></i>
                  <span className="font-medium">{streak} day streak</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-trophy text-yellow-300"></i>
                  <span className="font-medium">{certificates} certificates earned</span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="w-24 h-24 relative">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    stroke="rgba(255,255,255,0.2)" 
                    strokeWidth="8" 
                    fill="none"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    stroke="#10B981" 
                    strokeWidth="8" 
                    fill="none" 
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeOffset}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-in-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{overallProgress}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
