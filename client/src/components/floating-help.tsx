import { Button } from "@/components/ui/button";

export default function FloatingHelp() {
  const openHelp = () => {
    alert("Help chat would open here");
  };

  const openProgress = () => {
    alert("Progress tracking modal would open here");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="flex flex-col space-y-3">
        <Button
          onClick={openHelp}
          className="w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:bg-blue-600 p-0"
        >
          <i className="fas fa-question text-lg"></i>
        </Button>
        <Button
          onClick={openProgress}
          className="w-12 h-12 bg-secondary text-white rounded-full shadow-lg hover:bg-green-600 p-0"
        >
          <i className="fas fa-chart-line text-lg"></i>
        </Button>
      </div>
    </div>
  );
}
