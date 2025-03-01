import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { reportStore } from "../store/reportStore";
import { toast } from "react-toastify";

const ReportModal = ({ setReportShow, itemId, userId, itemType }) => {

  const { reportAdd, message, error, isLoading } = reportStore();

  const [selectedIssue, setSelectedIssue] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedIssue) {
      toast.error("Please select an issue type.");
      return;
    }
    try {
      setLoading(true);
      reportAdd(userId, itemId, itemType, selectedIssue, description);
      toast.success("Report added successfully");
      setReportShow(false);
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Failed to submit report. Please try again.");
    }
  };

  return (
    <div className="absolute w-full h-screen top-0 left-0 flex items-center justify-center bg-black/40">
      <div className="w-[400px] bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-2 rounded-full border border-gray-400 hover:bg-gray-200 transition"
          onClick={() => setReportShow(false)}
        >
          <RxCross2 className="text-xl" />
        </button>

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold text-white mb-5">
          Report an Issue
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Radio Options */}
          <div className="space-y-3 text-lg text-white">
            {[
              { id: "content", label: "Content Issue", value: "content_issue" },
              {
                id: "playback",
                label: "Playback Problem",
                value: "playback_problem",
              },
              {
                id: "download",
                label: "Download Problem",
                value: "download_problem",
              },
              {
                id: "crash",
                label: "Crashes During Playback",
                value: "crash_during_playback",
              },
            ].map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-3 cursor-pointer "
              >
                <input
                  type="radio"
                  name="issue"
                  id={item.id}
                  value={item.value}
                  checked={selectedIssue === item.value}
                  onChange={(e) => setSelectedIssue(e.target.value)}
                  className="w-5 h-5 accent-gray-600"
                  required
                />
                {item.label}
              </label>
            ))}
          </div>

          {/* Description Input */}
          <textarea
            className="w-full h-28 p-3 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-gray-500 outline-none"
            placeholder="Describe the problem..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 text-lg font-medium rounded-lg transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            disabled={loading}
          >
            {isLoading ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
