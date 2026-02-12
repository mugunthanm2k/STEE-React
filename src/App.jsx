import { Logger } from "./logger";
import { useFocusGuard } from "./useFocusGuard";

const logger = new Logger();

export default function App() {
  const { violations, show, setShow } = useFocusGuard(logger);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      
      {/* Overlay Warning */}
      {show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl text-center w-[320px]">
            <h2 className="text-red-600 text-xl font-bold mb-4">
              ⚠ Focus Lost
            </h2>
            <p className="text-gray-700 mb-4">
              Violations: <span className="font-bold">{violations}</span>
            </p>
            <button
              onClick={() => setShow(false)}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Return to Test
            </button>
          </div>
        </div>
      )}

      {/* Main UI */}
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4">
          Secure Test Environment
        </h1>

        <p className="mb-4 text-gray-600">
          Violations: <span className="font-bold">{violations}</span>
        </p>

        <textarea
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your answer..."
        ></textarea>
      </div>
    </div>
  );
}
