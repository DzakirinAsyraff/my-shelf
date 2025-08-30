import { useState } from "react";
import cds from "./data/cds.json";
import CDGallery from "./components/CDGallery";
import CDDetails from "./components/CDDetails";
import './App.css'

function App() {
  const [selectedCD, setSelectedCD] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">💿 My CD Collection</h1>
      <CDGallery cds={cds} onSelect={setSelectedCD} />
      <CDDetails cd={selectedCD} onClose={() => setSelectedCD(null)} />
    </div>
  );
}

export default App;
