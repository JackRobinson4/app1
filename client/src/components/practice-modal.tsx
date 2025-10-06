import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PracticeModal({ isOpen, onClose }: PracticeModalProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [cssCode, setCssCode] = useState(`/* Add your custom CSS */
.site-header {
  background-color: #6366F1;
  padding: 20px;
}

.main-navigation a {
  color: white;
  text-decoration: none;
}`);

  const [phpCode, setPhpCode] = useState(`<?php
// Add custom function to functions.php
function custom_theme_setup() {
    add_theme_support('post-thumbnails');
    register_nav_menus(array(
        'primary' => __('Primary Menu'),
    ));
}
add_action('after_setup_theme', 'custom_theme_setup');
?>`);

  const [wordpressAction, setWordpressAction] = useState("idle");
  const [previewHtml, setPreviewHtml] = useState("");

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

  const applyCSS = () => {
    const html = `
      <div style="font-family: Arial, sans-serif;">
        <style>${cssCode}</style>
        <header class="site-header">
          <nav class="main-navigation">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>
        </header>
        <main style="padding: 20px;">
          <h1>Welcome to WordPress</h1>
          <p>Your custom CSS has been applied!</p>
        </main>
      </div>
    `;
    setPreviewHtml(html);
    simulateWordPressAction("applied custom CSS");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            <i className="fas fa-graduation-cap text-blue-600 mr-2"></i>
            WordPress Practice Environment
          </DialogTitle>
          <DialogDescription>
            Practice WordPress development in a safe, simulated environment
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" data-testid="practice-tab-dashboard">
              <i className="fas fa-tachometer-alt mr-2"></i>
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="css" data-testid="practice-tab-css">
              <i className="fas fa-paint-brush mr-2"></i>
              CSS Editor
            </TabsTrigger>
            <TabsTrigger value="php" data-testid="practice-tab-php">
              <i className="fas fa-code mr-2"></i>
              PHP Editor
            </TabsTrigger>
            <TabsTrigger value="exercises" data-testid="practice-tab-exercises">
              <i className="fas fa-tasks mr-2"></i>
              Exercises
            </TabsTrigger>
          </TabsList>

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

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab("css")}>
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

          <TabsContent value="css" className="h-[500px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg overflow-hidden h-[400px]">
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
                    className="w-full h-full bg-gray-900 text-green-400 font-mono text-sm p-4 resize-none outline-none"
                    placeholder="Enter your CSS code here..."
                    data-testid="css-editor"
                  />
                </div>
                <Button 
                  onClick={applyCSS}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  data-testid="button-apply-css"
                >
                  <i className="fas fa-play mr-2"></i>
                  Apply CSS & Preview
                </Button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden h-[450px]">
                <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
                  <span className="text-gray-700 text-sm font-medium">Live Preview</span>
                </div>
                {previewHtml ? (
                  <iframe
                    srcDoc={previewHtml}
                    className="w-full h-full border-0"
                    title="CSS Preview"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <i className="fas fa-eye-slash text-4xl mb-3"></i>
                      <p>Click "Apply CSS & Preview" to see your changes</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="php" className="h-[500px]">
            <div className="grid grid-cols-1 gap-4 h-full">
              <div className="bg-gray-900 rounded-lg overflow-hidden h-[450px]">
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
                  className="w-full h-full bg-gray-900 text-purple-400 font-mono text-sm p-4 resize-none outline-none"
                  placeholder="Enter your PHP code here..."
                  data-testid="php-editor"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    simulateWordPressAction("validated PHP code");
                  }}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                  data-testid="button-validate-php"
                >
                  <i className="fas fa-check mr-2"></i>
                  Validate Code
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setPhpCode(`<?php\n// Add your PHP code here\n\n?>`)}
                  data-testid="button-reset-php"
                >
                  <i className="fas fa-undo mr-2"></i>
                  Reset
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="exercises" className="h-[500px] overflow-auto">
            <div className="space-y-4">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Exercise 1: Create a Custom Header</h3>
                      <p className="text-sm text-gray-600">Style your WordPress header with custom colors</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Beginner</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-sm mb-3">
                    <p className="font-medium text-gray-900 mb-2">Tasks:</p>
                    <ol className="list-decimal list-inside space-y-1 text-gray-700">
                      <li>Navigate to the CSS Editor tab</li>
                      <li>Change header background to #6366F1</li>
                      <li>Make navigation links white</li>
                      <li>Apply and preview your changes</li>
                    </ol>
                  </div>
                  <Button 
                    onClick={() => setActiveTab("css")}
                    variant="outline"
                    size="sm"
                  >
                    Start Exercise
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Exercise 2: Register Navigation Menu</h3>
                      <p className="text-sm text-gray-600">Add theme support for custom menus using PHP</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Intermediate</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-sm mb-3">
                    <p className="font-medium text-gray-900 mb-2">Tasks:</p>
                    <ol className="list-decimal list-inside space-y-1 text-gray-700">
                      <li>Go to the PHP Editor tab</li>
                      <li>Use register_nav_menus() function</li>
                      <li>Register a 'primary' menu location</li>
                      <li>Validate your code</li>
                    </ol>
                  </div>
                  <Button 
                    onClick={() => setActiveTab("php")}
                    variant="outline"
                    size="sm"
                  >
                    Start Exercise
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Exercise 3: WordPress Dashboard Tour</h3>
                      <p className="text-sm text-gray-600">Explore the WordPress admin dashboard</p>
                    </div>
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Beginner</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-sm mb-3">
                    <p className="font-medium text-gray-900 mb-2">Tasks:</p>
                    <ol className="list-decimal list-inside space-y-1 text-gray-700">
                      <li>Go to the Dashboard tab</li>
                      <li>Click on Posts, Pages, and Media cards</li>
                      <li>Explore the Appearance section</li>
                      <li>Check Settings</li>
                    </ol>
                  </div>
                  <Button 
                    onClick={() => setActiveTab("dashboard")}
                    variant="outline"
                    size="sm"
                  >
                    Start Exercise
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center pt-4 border-t mt-4">
          <div className="text-sm text-gray-600">
            <i className="fas fa-info-circle text-blue-600 mr-1"></i>
            This is a safe practice environment - experiment freely!
          </div>
          <Button onClick={onClose} data-testid="button-close-practice">
            Close Practice
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
