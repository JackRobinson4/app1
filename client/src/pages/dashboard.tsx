import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { isUnauthorizedError } from "@/lib/authUtils";
import ProgressOverview from "@/components/progress-overview";
import LessonSidebar from "@/components/lesson-sidebar";
import LessonCard from "@/components/lesson-card";
import PracticeModal from "@/components/practice-modal";
import FloatingHelp from "@/components/floating-help";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface DashboardData {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  lessons: Array<{
    id: string;
    title: string;
    description: string;
    slug: string;
    duration?: number;
    type: 'free' | 'premium';
    order: number;
    categoryId: string;
  }>;
  progress: Array<{
    lessonId: string;
    status: 'not_started' | 'in_progress' | 'completed';
    progressPercentage: number;
  }>;
  stats: {
    overallProgress: number;
    completedLessons: number;
    totalLessons: number;
    streak: number;
    certificates: number;
  };
}

export default function Dashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isPracticeModalOpen, setIsPracticeModalOpen] = useState(false);

  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard"],
    enabled: isAuthenticated,
  });

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading || isDashboardLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your learning dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load dashboard data</p>
        </div>
      </div>
    );
  }

  const { categories, lessons, progress, stats } = dashboardData;

  const filteredLessons = selectedCategory === "all" 
    ? lessons 
    : lessons.filter((lesson: any) => {
        const category = categories.find((cat: any) => cat.id === lesson.categoryId);
        return category?.slug === selectedCategory;
      });

  const userName = (user as any)?.firstName || (user as any)?.email?.split('@')[0] || 'Student';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <i className="fab fa-wordpress text-white text-lg"></i>
                </div>
                <h1 className="text-xl font-bold text-gray-900">WordPress Mastery</h1>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-primary font-medium">Dashboard</a>
              <a href="#" className="text-gray-700 hover:text-primary font-medium">Lessons</a>
              <a href="#" className="text-gray-700 hover:text-primary font-medium">Practice</a>
              <a href="#" className="text-gray-700 hover:text-primary font-medium">Community</a>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-primary">
                <i className="fas fa-bell text-lg"></i>
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">{userName}</span>
                <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                  {(user as any)?.profileImageUrl ? (
                    <img 
                      src={(user as any).profileImageUrl} 
                      alt="User Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary flex items-center justify-center text-white text-sm font-medium">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.location.href = '/api/logout'}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-sign-out-alt"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <ProgressOverview 
          userName={userName}
          stats={stats}
        />

        {/* Lesson Categories */}
        <div className="mb-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-5 lg:grid-cols-9">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="foundations">Foundations</TabsTrigger>
              <TabsTrigger value="hosting">Hosting</TabsTrigger>
              <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="themes">Themes</TabsTrigger>
              <TabsTrigger value="plugins">Plugins</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lesson Sidebar */}
          <LessonSidebar 
            categories={categories}
            lessons={lessons}
            progress={progress}
          />

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Current Lesson Highlight */}
              {lessons.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-primary p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold mb-2">Continue Your Learning</h2>
                        <p className="text-blue-100">Pick up where you left off</p>
                      </div>
                      <Button 
                        className="bg-white text-primary hover:bg-gray-100"
                        onClick={() => setIsPracticeModalOpen(true)}
                      >
                        <i className="fas fa-code mr-2"></i>
                        Practice Mode
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Lesson Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredLessons.map((lesson: any) => {
                  const lessonProgress = progress.find((p: any) => p.lessonId === lesson.id);
                  return (
                    <LessonCard
                      key={lesson.id}
                      lesson={lesson}
                      progress={lessonProgress}
                      userAccessLevel={(user as any)?.accessLevel || 'free'}
                    />
                  );
                })}
              </div>

              {filteredLessons.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-book-open text-gray-400 text-xl"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons found</h3>
                  <p className="text-gray-600">Check back later for new content in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Practice Modal */}
      <PracticeModal 
        isOpen={isPracticeModalOpen}
        onClose={() => setIsPracticeModalOpen(false)}
      />

      {/* Floating Help */}
      <FloatingHelp />
    </div>
  );
}
