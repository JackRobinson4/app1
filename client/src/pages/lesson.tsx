import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Lesson {
  id: string;
  title: string;
  description: string;
  content?: string;
  videoUrl?: string;
  duration?: number;
  type: 'free' | 'premium';
  practiceExercise?: string;
  resources?: string;
}

interface Progress {
  progressPercentage: number;
}

export default function LessonPage() {
  const { slug } = useParams();
  const { user } = useAuth();

  const { data: lesson, isLoading } = useQuery<Lesson>({
    queryKey: ["/api/lessons/slug", slug],
  });

  const { data: progress } = useQuery<Progress>({
    queryKey: ["/api/progress", lesson?.id],
    enabled: !!lesson?.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
            <p className="text-gray-600 mb-4">The lesson you're looking for doesn't exist.</p>
            <Button onClick={() => window.location.href = '/'}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isLocked = lesson.type === 'premium' && (user as any)?.accessLevel !== 'premium';
  const progressPercentage = progress?.progressPercentage || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button 
              variant="ghost" 
              onClick={() => window.location.href = '/'}
              className="flex items-center space-x-2"
            >
              <i className="fas fa-arrow-left"></i>
              <span>Back to Dashboard</span>
            </Button>
            
            <div className="flex items-center space-x-4">
              <Badge variant={lesson.type === 'premium' ? 'secondary' : 'default'}>
                {lesson.type === 'premium' ? 'Premium' : 'Free'}
              </Badge>
              {lesson.duration && (
                <span className="text-sm text-gray-500">
                  <i className="fas fa-clock mr-1"></i>
                  {lesson.duration} min
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Lesson Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{lesson.description}</p>
          
          {progress && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-500">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          )}
        </div>

        {isLocked ? (
          /* Locked Content */
          <Card className="text-center p-8">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-lock text-accent text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium Content</h2>
              <p className="text-gray-600 mb-6">
                This lesson is part of our premium curriculum. Upgrade to access advanced WordPress development techniques.
              </p>
              <Button className="bg-accent hover:bg-yellow-500 text-white">
                <i className="fas fa-crown mr-2"></i>
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Lesson Content */
          <div className="space-y-8">
            {/* Video Section */}
            {lesson.videoUrl && (
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <i className="fas fa-play-circle text-6xl mb-4 opacity-50"></i>
                        <p className="text-lg">Video Player</p>
                        <p className="text-sm opacity-75">Video URL: {lesson.videoUrl}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lesson Content */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Lesson Content</h2>
                <div className="prose max-w-none">
                  {lesson.content ? (
                    <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                  ) : (
                    <p className="text-gray-600">Detailed lesson content will be displayed here.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Practice Exercise */}
            {lesson.practiceExercise && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Practice Exercise</h2>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-blue-800">
                      Complete the hands-on exercise to reinforce your learning.
                    </p>
                  </div>
                  <Button className="bg-primary hover:bg-blue-600">
                    <i className="fas fa-code mr-2"></i>
                    Start Practice
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Resources */}
            {lesson.resources && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Resources</h2>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <i className="fas fa-download mr-2"></i>
                      Download Lesson Materials
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <i className="fas fa-file-code mr-2"></i>
                      Code Examples
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <i className="fas fa-external-link-alt mr-2"></i>
                      Additional Reading
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8">
              <Button variant="outline">
                <i className="fas fa-arrow-left mr-2"></i>
                Previous Lesson
              </Button>
              
              <Button>
                Mark as Complete
                <i className="fas fa-check ml-2"></i>
              </Button>
              
              <Button variant="outline">
                Next Lesson
                <i className="fas fa-arrow-right ml-2"></i>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
