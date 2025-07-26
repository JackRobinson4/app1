import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface LessonCardProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    slug: string;
    duration?: number;
    type: 'free' | 'premium';
    order: number;
  };
  progress?: {
    status: 'not_started' | 'in_progress' | 'completed';
    progressPercentage: number;
  };
  userAccessLevel: string;
}

export default function LessonCard({ lesson, progress, userAccessLevel }: LessonCardProps) {
  const isLocked = lesson.type === 'premium' && userAccessLevel !== 'premium';
  const isCompleted = progress?.status === 'completed';
  const isInProgress = progress?.status === 'in_progress';
  const progressPercentage = progress?.progressPercentage || 0;

  const getStatusBadge = () => {
    if (isCompleted) {
      return <Badge className="bg-secondary text-white">Completed</Badge>;
    }
    if (isInProgress) {
      return <Badge className="bg-primary text-white">In Progress</Badge>;
    }
    if (isLocked) {
      return (
        <Badge className="bg-accent text-white">
          <i className="fas fa-crown mr-1"></i>Premium
        </Badge>
      );
    }
    return <Badge variant="outline" className="bg-green-100 text-green-800">Free</Badge>;
  };

  const getIcon = () => {
    if (isCompleted) {
      return <i className="fas fa-check text-white"></i>;
    }
    if (isInProgress) {
      return <i className="fas fa-play text-white"></i>;
    }
    if (isLocked) {
      return <i className="fas fa-lock text-gray-500"></i>;
    }
    return <i className="fas fa-play text-primary"></i>;
  };

  const getIconBg = () => {
    if (isCompleted) {
      return "bg-secondary";
    }
    if (isInProgress) {
      return "bg-primary";
    }
    if (isLocked) {
      return "bg-gray-300";
    }
    return "bg-gray-100 border-2 border-primary";
  };

  const handleClick = () => {
    if (isLocked) {
      // Show upgrade modal or redirect to upgrade page
      alert("Upgrade to premium to access this lesson");
      return;
    }
    window.location.href = `/lesson/${lesson.slug}`;
  };

  const getActionButton = () => {
    if (isLocked) {
      return (
        <Button 
          className="bg-accent hover:bg-yellow-500 text-white text-sm font-medium"
          onClick={(e) => {
            e.stopPropagation();
            alert("Redirect to premium upgrade");
          }}
        >
          Unlock
        </Button>
      );
    }
    if (isCompleted) {
      return (
        <Button 
          variant="outline"
          className="text-primary border-primary hover:bg-primary hover:text-white text-sm font-medium"
          onClick={handleClick}
        >
          Review
        </Button>
      );
    }
    if (isInProgress) {
      return (
        <Button 
          className="bg-primary text-white hover:bg-blue-600 text-sm font-medium"
          onClick={handleClick}
        >
          Continue
        </Button>
      );
    }
    return (
      <Button 
        variant="outline"
        className="border-primary text-primary hover:bg-primary hover:text-white text-sm font-medium"
        onClick={handleClick}
      >
        Start
      </Button>
    );
  };

  return (
    <Card 
      className={`hover:shadow-md transition-shadow cursor-pointer ${
        isLocked ? 'opacity-75' : ''
      } ${isInProgress ? 'border-2 border-primary' : 'border border-gray-200'}`}
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${getIconBg()} rounded-lg flex items-center justify-center`}>
              {getIcon()}
            </div>
            <div>
              <h3 className={`font-semibold ${isLocked ? 'text-gray-500' : 'text-gray-900'}`}>
                {lesson.title}
              </h3>
              <p className="text-sm text-gray-500">Lesson {lesson.order}</p>
            </div>
          </div>
          {getStatusBadge()}
        </div>
        
        <p className={`text-sm mb-4 ${isLocked ? 'text-gray-500' : 'text-gray-600'}`}>
          {lesson.description}
        </p>
        
        {isInProgress && (
          <div className="mb-4">
            <Progress value={progressPercentage} className="h-2" />
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <i className="fas fa-clock"></i>
            <span>{lesson.duration || 30} min</span>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            {getActionButton()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
