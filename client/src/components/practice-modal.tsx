import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PracticeExercise {
  title: string;
  description: string;
  tasks: string[];
}

interface PracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercise?: PracticeExercise;
  lessonTitle?: string;
  editors?: ('html' | 'css' | 'php')[];
}

const DEFAULT_EXERCISE: PracticeExercise = {
  title: "WordPress Practice Environment",
  description: "Practice WordPress development skills in a safe environment",
  tasks: [
    "Explore the WordPress dashboard and familiarize yourself with the interface",
    "Practice writing custom CSS to style WordPress themes",
    "Experiment with PHP code in the functions.php editor",
    "Use the code editor to create custom WordPress templates"
  ]
};

export default function PracticeModal({ 
  isOpen, 
  onClose, 
  exercise = DEFAULT_EXERCISE, 
  lessonTitle = "General Practice",
  editors = ['html', 'css', 'php']
}: PracticeModalProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("instructions");
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  
  const [cssCode, setCssCode] = useState(`/* WordPress Custom CSS */
.site-header {
  background-color: #6366F1;
  padding: 20px;
}

.main-navigation a {
  color: white;
  text-decoration: none;
  margin: 0 15px;
}

.main-navigation a:hover {
  opacity: 0.8;
}`);

  const [phpCode, setPhpCode] = useState(`<?php
/**
 * WordPress Practice - ${lessonTitle}
 */

// Add custom function to functions.php
function custom_theme_setup() {
    // Add theme support
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu'),
        'footer' => __('Footer Menu'),
    ));
}
add_action('after_setup_theme', 'custom_theme_setup');
?>`);

  const [htmlCode, setHtmlCode] = useState(`<!-- WordPress Template Practice -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>WordPress Practice</title>
</head>
<body>
    <header class="site-header">
        <nav class="main-navigation">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>
    
    <main class="site-content">
        <h1>Welcome to WordPress</h1>
        <p>Practice your WordPress development skills here.</p>
    </main>
</body>
</html>`);

  const [wordpressAction, setWordpressAction] = useState("idle");
  const [previewHtml, setPreviewHtml] = useState("");
  const [notes, setNotes] = useState("");

  const simulateWordPressAction = (action: string) => {
    setWordpressAction("processing");
    
    setTimeout(() => {
      setWordpressAction("complete");
      toast({
        title: "Action Complete!",
        description: `Successfully ${action} in WordPress simulator`,
      });
      
      setTimeout(() => setWordpressAction("idle"), 2000);
    }, 1500);
  };

  const applyCode = () => {
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
        <style>${cssCode}</style>
        ${htmlCode}
      </div>
    `;
    setPreviewHtml(html);
    simulateWordPressAction("applied your code changes");
  };

  const toggleTaskCompletion = (taskIndex: number) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskIndex)) {
      newCompleted.delete(taskIndex);
    } else {
      newCompleted.add(taskIndex);
      toast({
        title: "Task completed!",
        description: `Great job! ${exercise.tasks.length - newCompleted.size} tasks remaining.`,
      });
    }
    setCompletedTasks(newCompleted);
  };

  const progressPercentage = (completedTasks.size / exercise.tasks.length) * 100;
  
  const totalTabs = 2 + editors.length;
  const gridColsClass = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
  }[totalTabs] || 'grid-cols-4';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            <i className="fas fa-graduation-cap text-blue-600 mr-2"></i>
            {exercise.title}
          </DialogTitle>
          <DialogDescription>
            {exercise.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Practice Progress</span>
            <span className="text-sm text-gray-500">{completedTasks.size} of {exercise.tasks.length} tasks</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className={`grid w-full ${gridColsClass}`}>
            <TabsTrigger value="instructions" data-testid="practice-tab-instructions">
              <i className="fas fa-list-check mr-2"></i>
              Tasks
            </TabsTrigger>
            <TabsTrigger value="dashboard" data-testid="practice-tab-dashboard">
              <i className="fas fa-tachometer-alt mr-2"></i>
              Dashboard
            </TabsTrigger>
            {editors.includes('html') && (
              <TabsTrigger value="html" data-testid="practice-tab-html">
                <i className="fas fa-code mr-2"></i>
                HTML
              </TabsTrigger>
            )}
            {editors.includes('css') && (
              <TabsTrigger value="css" data-testid="practice-tab-css">
                <i className="fas fa-paint-brush mr-2"></i>
                CSS
              </TabsTrigger>
            )}
            {editors.includes('php') && (
              <TabsTrigger value="php" data-testid="practice-tab-php">
                <i className="fas fa-code mr-2"></i>
                PHP
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="instructions" className="h-[500px] overflow-auto">
            <div className="space-y-4">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4 text-lg">
                    <i className="fas fa-tasks text-blue-600 mr-2"></i>
                    Practice Tasks for: {lessonTitle}
                  </h3>
                  <div className="space-y-3">
                    {exercise.tasks.map((task, idx) => (
                      <div 
                        key={idx}
                        className={`flex items-start p-4 rounded-lg border-2 transition-all cursor-pointer ${
                          completedTasks.has(idx) 
                            ? 'bg-green-50 border-green-300' 
                            : 'bg-white border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => toggleTaskCompletion(idx)}
                        data-testid={`task-item-${idx}`}
                      >
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 mt-0.5 ${
                          completedTasks.has(idx)
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300'
                        }`}>
                          {completedTasks.has(idx) && (
                            <i className="fas fa-check text-white text-xs"></i>
                          )}
                        </div>
                        <div className="flex-1">
                          <span className={`font-medium mr-2 ${
                            completedTasks.has(idx) ? 'text-green-900' : 'text-gray-900'
                          }`}>
                            Task {idx + 1}:
                          </span>
                          <span className={completedTasks.has(idx) ? 'text-green-800 line-through' : 'text-gray-700'}>
                            {task}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {completedTasks.size === exercise.tasks.length && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <i className="fas fa-trophy text-yellow-500 text-2xl"></i>
                        <div>
                          <h4 className="font-semibold text-green-900">Practice Complete! 🎉</h4>
                          <p className="text-sm text-green-700">Great job! You've completed all tasks for this lesson.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    <i className="fas fa-lightbulb text-yellow-500 mr-2"></i>
                    Practice Tips
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                      <span>Use the Code Editor tabs to practice writing WordPress code</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                      <span>Click the Preview button beside each editor to see your changes in real-time</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                      <span>Experiment with HTML, CSS, and PHP to build WordPress skills</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-600 mr-2 mt-0.5"></i>
                      <span>Check off tasks as you complete them to track your progress</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="dashboard" className="h-[500px] overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => simulateWordPressAction("created a new post")}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-file-alt text-blue-600 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Posts</h3>
                      <p className="text-sm text-gray-600">Create and manage posts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => simulateWordPressAction("created a new page")}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-copy text-green-600 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Pages</h3>
                      <p className="text-sm text-gray-600">Create and manage pages</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => simulateWordPressAction("uploaded media")}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-image text-purple-600 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Media</h3>
                      <p className="text-sm text-gray-600">Manage media library</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => {
                if (editors.includes('css')) {
                  setActiveTab('css');
                } else if (editors.includes('html')) {
                  setActiveTab('html');
                } else if (editors.includes('php')) {
                  setActiveTab('php');
                }
              }}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-palette text-indigo-600 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Appearance</h3>
                      <p className="text-sm text-gray-600">Customize your theme</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => simulateWordPressAction("installed a plugin")}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-plug text-orange-600 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Plugins</h3>
                      <p className="text-sm text-gray-600">Add functionality</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => simulateWordPressAction("updated settings")}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-cog text-red-600 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Settings</h3>
                      <p className="text-sm text-gray-600">Configure WordPress</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {wordpressAction !== "idle" && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  {wordpressAction === "processing" && (
                    <>
                      <div className="w-5 h-5 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-blue-800 font-medium">Processing...</span>
                    </>
                  )}
                  {wordpressAction === "complete" && (
                    <>
                      <i className="fas fa-check-circle text-green-600 text-xl"></i>
                      <span className="text-green-800 font-medium">Action completed successfully!</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="html" className="h-[500px] overflow-auto">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="flex flex-col space-y-2">
                <div className="bg-gray-900 rounded-lg overflow-hidden flex-1">
                  <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                    <span className="text-gray-300 text-sm font-mono">template.html</span>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <textarea
                    value={htmlCode}
                    onChange={(e) => setHtmlCode(e.target.value)}
                    className="w-full h-[calc(100%-40px)] bg-gray-900 text-blue-400 font-mono text-sm p-4 resize-none outline-none"
                    placeholder="Enter your HTML/WordPress template code here..."
                    data-testid="html-editor"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={applyCode}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    data-testid="button-preview-html"
                  >
                    <i className="fas fa-eye mr-2"></i>
                    Preview
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setHtmlCode(`<!-- WordPress Template Practice -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>WordPress Practice</title>
</head>
<body>
    <header class="site-header">
        <nav class="main-navigation">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>
    
    <main class="site-content">
        <h1>Welcome to WordPress</h1>
        <p>Practice your WordPress development skills here.</p>
    </main>
</body>
</html>`)}
                    data-testid="button-reset-html"
                  >
                    <i className="fas fa-undo mr-2"></i>
                    Reset
                  </Button>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden flex-1">
                  <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex items-center">
                    <i className="fas fa-eye text-gray-600 mr-2"></i>
                    <span className="text-gray-700 text-sm font-medium">Live Preview</span>
                  </div>
                  <div className="p-4 h-[calc(100%-40px)] overflow-auto">
                    {previewHtml ? (
                      <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <div className="text-center">
                          <i className="fas fa-eye-slash text-4xl mb-2"></i>
                          <p>Click Preview to see your code</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="css" className="h-[500px] overflow-auto">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="flex flex-col space-y-2">
                <div className="bg-gray-900 rounded-lg overflow-hidden flex-1">
                  <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                    <span className="text-gray-300 text-sm font-mono">style.css</span>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <textarea
                    value={cssCode}
                    onChange={(e) => setCssCode(e.target.value)}
                    className="w-full h-[calc(100%-40px)] bg-gray-900 text-green-400 font-mono text-sm p-4 resize-none outline-none"
                    placeholder="Enter your CSS code here..."
                    data-testid="css-editor"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={applyCode}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    data-testid="button-preview-css"
                  >
                    <i className="fas fa-eye mr-2"></i>
                    Preview
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setCssCode(`/* WordPress Custom CSS */
.site-header {
  background-color: #6366F1;
  padding: 20px;
}

.main-navigation a {
  color: white;
  text-decoration: none;
  margin: 0 15px;
}

.main-navigation a:hover {
  opacity: 0.8;
}`)}
                    data-testid="button-reset-css"
                  >
                    <i className="fas fa-undo mr-2"></i>
                    Reset
                  </Button>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden flex-1">
                  <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex items-center">
                    <i className="fas fa-eye text-gray-600 mr-2"></i>
                    <span className="text-gray-700 text-sm font-medium">Live Preview</span>
                  </div>
                  <div className="p-4 h-[calc(100%-40px)] overflow-auto">
                    {previewHtml ? (
                      <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <div className="text-center">
                          <i className="fas fa-eye-slash text-4xl mb-2"></i>
                          <p>Click Preview to see your code</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="php" className="h-[500px] overflow-auto">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="flex flex-col space-y-2">
                <div className="bg-gray-900 rounded-lg overflow-hidden flex-1">
                  <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                    <span className="text-gray-300 text-sm font-mono">functions.php</span>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <textarea
                    value={phpCode}
                    onChange={(e) => setPhpCode(e.target.value)}
                    className="w-full h-[calc(100%-40px)] bg-gray-900 text-purple-400 font-mono text-sm p-4 resize-none outline-none"
                    placeholder="Enter your PHP code here..."
                    data-testid="php-editor"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => simulateWordPressAction("validated your PHP code")}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    data-testid="button-preview-php"
                  >
                    <i className="fas fa-check mr-2"></i>
                    Validate Code
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setPhpCode(`<?php
/**
 * WordPress Practice - ${lessonTitle}
 */

// Add custom function to functions.php
function custom_theme_setup() {
    // Add theme support
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu'),
        'footer' => __('Footer Menu'),
    ));
}
add_action('after_setup_theme', 'custom_theme_setup');
?>`)}
                    data-testid="button-reset-php"
                  >
                    <i className="fas fa-undo mr-2"></i>
                    Reset
                  </Button>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="bg-purple-50 border-2 border-purple-300 rounded-lg overflow-hidden flex-1">
                  <div className="bg-purple-100 px-4 py-2 border-b border-purple-300 flex items-center">
                    <i className="fas fa-info-circle text-purple-600 mr-2"></i>
                    <span className="text-purple-700 text-sm font-medium">PHP Code Info</span>
                  </div>
                  <div className="p-4 h-[calc(100%-40px)] overflow-auto">
                    <div className="space-y-4 text-sm">
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-2">About PHP in WordPress</h4>
                        <p className="text-purple-800">PHP is server-side code that runs on the WordPress server. It cannot be previewed directly in the browser.</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-purple-200">
                        <h5 className="font-medium text-purple-900 mb-2">
                          <i className="fas fa-lightbulb text-yellow-500 mr-1"></i>
                          Common PHP Functions
                        </h5>
                        <ul className="space-y-1 text-purple-700 text-xs">
                          <li><code className="bg-purple-100 px-1 py-0.5 rounded">add_action()</code> - Hook into WordPress</li>
                          <li><code className="bg-purple-100 px-1 py-0.5 rounded">add_filter()</code> - Modify data</li>
                          <li><code className="bg-purple-100 px-1 py-0.5 rounded">register_nav_menus()</code> - Register menus</li>
                          <li><code className="bg-purple-100 px-1 py-0.5 rounded">add_theme_support()</code> - Add features</li>
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-purple-200">
                        <h5 className="font-medium text-purple-900 mb-2">
                          <i className="fas fa-shield-alt text-blue-500 mr-1"></i>
                          Security Best Practices
                        </h5>
                        <ul className="space-y-1 text-purple-700 text-xs">
                          <li>Always sanitize user input</li>
                          <li>Use nonces for form validation</li>
                          <li>Escape output data</li>
                          <li>Follow WordPress coding standards</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center pt-4 border-t mt-4">
          <div className="text-sm text-gray-600">
            <i className="fas fa-info-circle text-blue-600 mr-1"></i>
            This is a safe practice environment - experiment freely!
          </div>
          <div className="flex gap-2">
            {completedTasks.size === exercise.tasks.length && (
              <Button 
                variant="outline"
                className="bg-green-50 hover:bg-green-100 text-green-700 border-green-300"
                data-testid="button-practice-complete"
              >
                <i className="fas fa-check-circle mr-2"></i>
                Practice Complete!
              </Button>
            )}
            <Button onClick={onClose} data-testid="button-close-practice">
              Close Practice
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
