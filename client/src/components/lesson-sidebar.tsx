import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface LessonSidebarProps {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  lessons: Array<{
    id: string;
    categoryId: string;
    type: 'free' | 'premium';
  }>;
  progress: Array<{
    lessonId: string;
    status: 'not_started' | 'in_progress' | 'completed';
  }>;
}

export default function LessonSidebar({ categories, lessons, progress }: LessonSidebarProps) {
  const getCategoryProgress = (categoryId: string) => {
    const categoryLessons = lessons.filter(lesson => lesson.categoryId === categoryId);
    const completedLessons = categoryLessons.filter(lesson => {
      const lessonProgress = progress.find(p => p.lessonId === lesson.id);
      return lessonProgress?.status === 'completed';
    });
    
    return {
      completed: completedLessons.length,
      total: categoryLessons.length,
      percentage: categoryLessons.length > 0 ? (completedLessons.length / categoryLessons.length) * 100 : 0
    };
  };

  const getCategoryData = () => [
    {
      name: "Hosting & Installation",
      ...getCategoryProgress(categories.find(c => c.slug === 'hosting')?.id || ''),
      color: "bg-primary",
      locked: false
    },
    {
      name: "WordPress Fundamentals",
      ...getCategoryProgress(categories.find(c => c.slug === 'fundamentals')?.id || ''),
      color: "bg-secondary",
      locked: false
    },
    {
      name: "Content & Structure", 
      ...getCategoryProgress(categories.find(c => c.slug === 'content')?.id || ''),
      color: "bg-purple-500",
      locked: false
    },
    {
      name: "Theme Development",
      ...getCategoryProgress(categories.find(c => c.slug === 'themes')?.id || ''),
      color: "bg-green-500",
      locked: false
    },
    {
      name: "Plugin Development",
      ...getCategoryProgress(categories.find(c => c.slug === 'plugins')?.id || ''),
      color: "bg-blue-500",
      locked: false
    },
    {
      name: "API & Headless",
      ...getCategoryProgress(categories.find(c => c.slug === 'api')?.id || ''),
      color: "bg-orange-500",
      locked: false
    },
    {
      name: "Performance & SEO",
      ...getCategoryProgress(categories.find(c => c.slug === 'performance')?.id || ''),
      color: "bg-red-500",
      locked: false
    }
  ];

  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-24">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Progress</h3>
          
          <div className="space-y-4">
            {getCategoryData().map((category, index) => (
              <div key={index} className="lesson-category">
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-medium ${category.locked ? 'text-gray-500' : 'text-gray-900'}`}>
                    {category.name}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${
                      category.percentage > 0 ? 'text-secondary' : 'text-gray-500'
                    }`}>
                      {category.completed}/{category.total}
                    </span>
                    {category.locked && (
                      <i className="fas fa-lock text-gray-400 text-sm"></i>
                    )}
                  </div>
                </div>
                <Progress 
                  value={category.percentage} 
                  className="h-2"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <Button 
              className="w-full bg-accent text-white hover:bg-yellow-500"
              onClick={() => alert("Redirect to premium upgrade page")}
            >
              <i className="fas fa-crown mr-2"></i>
              Upgrade to Premium
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
