import { useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Lesson {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  videoUrl?: string;
  duration?: number;
  type: 'free' | 'premium';
  practiceExercise?: string;
  resources?: string;
  order: number;
  categoryId: string;
}

interface LessonProgress {
  progressPercentage: number;
  status: 'not_started' | 'in_progress' | 'completed';
}

interface PracticeExercise {
  title: string;
  description: string;
  tasks: string[];
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith('# ')) {
      elements.push(<h1 key={key++} className="text-3xl font-bold text-gray-900 mt-8 mb-4">{line.substring(2)}</h1>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className="text-2xl font-semibold text-gray-900 mt-6 mb-3">{line.substring(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={key++} className="text-xl font-semibold text-gray-800 mt-4 mb-2">{line.substring(4)}</h3>);
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(<p key={key++} className="font-semibold text-gray-900 mb-2">{line.substring(2, line.length - 2)}</p>);
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} className="ml-6 mb-1 text-gray-700 list-disc">{line.substring(2)}</li>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2"></div>);
    } else if (line.trim()) {
      elements.push(<p key={key++} className="text-gray-700 mb-3 leading-relaxed">{line}</p>);
    }
  }

  return <div className="space-y-1">{elements}</div>;
}

export default function LessonPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [practiceModalOpen, setPracticeModalOpen] = useState(false);

  const { data: lesson, isLoading } = useQuery<Lesson>({
    queryKey: ["/api/lessons/slug", slug],
  });

  const { data: allLessons } = useQuery<Lesson[]>({
    queryKey: ["/api/lessons"],
  });

  const { data: progress } = useQuery<LessonProgress>({
    queryKey: ["/api/progress", lesson?.id],
    enabled: !!lesson?.id && !!user,
  });

  const markCompleteMutation = useMutation({
    mutationFn: async () => {
      if (!lesson) return;
      const response = await apiRequest('POST', '/api/progress', {
        lessonId: lesson.id,
        status: 'completed',
        progressPercentage: 100
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
      toast({
        title: "Lesson completed!",
        description: "Great job! Keep up the momentum.",
      });
    }
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
            <Button onClick={() => window.location.href = '/'} data-testid="button-back-dashboard">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isLocked = lesson.type === 'premium' && (user as any)?.accessLevel !== 'premium';
  const progressPercentage = progress?.progressPercentage || 0;
  const isCompleted = progress?.status === 'completed';

  const categoryLessons = allLessons?.filter(l => l.categoryId === lesson.categoryId).sort((a, b) => a.order - b.order) || [];
  const currentIndex = categoryLessons.findIndex(l => l.id === lesson.id);
  const previousLesson = currentIndex > 0 ? categoryLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < categoryLessons.length - 1 ? categoryLessons[currentIndex + 1] : null;

  let practiceExercise: PracticeExercise | null = null;
  if (lesson.practiceExercise) {
    try {
      practiceExercise = JSON.parse(lesson.practiceExercise);
    } catch (e) {
      console.error("Failed to parse practice exercise:", e);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button 
              variant="ghost" 
              onClick={() => window.location.href = '/'}
              className="flex items-center space-x-2"
              data-testid="button-back-dashboard-header"
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{lesson.description}</p>
          
          {progress && user && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Your Progress</span>
                <span className="text-sm text-gray-500">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          )}
        </div>

        {isLocked ? (
          <Card className="text-center p-8">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-lock text-accent text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium Content</h2>
              <p className="text-gray-600 mb-6">
                This lesson is part of our premium curriculum. Upgrade to access advanced WordPress development techniques.
              </p>
              <Button className="bg-accent hover:bg-yellow-500 text-white" data-testid="button-upgrade-premium">
                <i className="fas fa-crown mr-2"></i>
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
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

            <Card>
              <CardContent className="pt-6 px-6 pb-6">
                {lesson.content ? (
                  <MarkdownContent content={lesson.content} />
                ) : (
                  <p className="text-gray-600">Detailed lesson content will be displayed here.</p>
                )}
              </CardContent>
            </Card>

            {practiceExercise && (
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        <i className="fas fa-code text-blue-600 mr-2"></i>
                        Practice Exercise
                      </h2>
                      <p className="text-gray-600">{practiceExercise.description}</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-blue-900 mb-2">Tasks to complete:</p>
                    <ul className="space-y-1">
                      {practiceExercise.tasks.map((task, idx) => (
                        <li key={idx} className="text-sm text-blue-800 flex items-start">
                          <i className="fas fa-check-circle text-blue-600 mr-2 mt-0.5"></i>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white" 
                    onClick={() => setPracticeModalOpen(true)}
                    data-testid="button-start-practice"
                  >
                    <i className="fas fa-code mr-2"></i>
                    Start Practice
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-6 border-t border-gray-200">
              <Button 
                variant="outline" 
                onClick={() => previousLesson && (window.location.href = `/lesson/${previousLesson.slug}`)}
                disabled={!previousLesson}
                className="flex-1 sm:flex-none"
                data-testid="button-previous-lesson"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Previous Lesson
              </Button>
              
              <Button 
                onClick={() => markCompleteMutation.mutate()}
                disabled={isCompleted || markCompleteMutation.isPending}
                className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                data-testid="button-mark-complete"
              >
                {isCompleted ? (
                  <>
                    <i className="fas fa-check-circle mr-2"></i>
                    Completed
                  </>
                ) : (
                  <>
                    Mark as Complete
                    <i className="fas fa-check ml-2"></i>
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => nextLesson && (window.location.href = `/lesson/${nextLesson.slug}`)}
                disabled={!nextLesson}
                className="flex-1 sm:flex-none"
                data-testid="button-next-lesson"
              >
                Next Lesson
                <i className="fas fa-arrow-right ml-2"></i>
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={practiceModalOpen} onOpenChange={setPracticeModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              <i className="fas fa-code text-blue-600 mr-2"></i>
              {practiceExercise?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600 mb-4">{practiceExercise?.description}</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-3">Complete these tasks:</p>
              <ul className="space-y-2">
                {practiceExercise?.tasks.map((task, idx) => (
                  <li key={idx} className="flex items-start text-gray-700">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">
                <i className="fas fa-lightbulb text-yellow-500 mr-2"></i>
                <strong>Tip:</strong> Practice in your local WordPress installation or use a development environment to complete these exercises.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
