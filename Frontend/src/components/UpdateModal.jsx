import { useState, useEffect } from "react";

/*
The key thing to notice — two of them are data (isOpen, currentTask) and two are functions (onClose, onSubmit).
Passing functions as props is how a child talks back to the parent. The modal doesn't update state itself — it just calls onClose() or onSubmit() and lets App handle everything.
That's the pattern:

Parent passes data down → Child calls functions to send data back up

This is one of the most fundamental concepts in React. Once this clicks, a lot of other things will start making sense too.
*/
const UpdateModal = ({ isOpen, onClose, onSubmit, currentTask }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Pre-fill fields with the current task's values whenever modal opens
  useEffect(() => { // 4⬅️
    if (isOpen && currentTask) {
      setTitle(currentTask.title || "");
      setContent(currentTask.content || "");
    }
  }, [isOpen, currentTask]);
  /*
  Every time the modal opens, this useEffect fires and loads the current task's values into the local input state.
  */

  
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    onSubmit({ title, content });
  };

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose}>

        {/* Modal Box */}
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>

          {/* Close Button */}
          <button className="modal-close-btn" onClick={onClose} title="Cancel">
            ✕
          </button>

          <h2 className="modal-title">Update Task</h2>

          {/* Input: Title */}
          <div className="modal-field">
            <label className="modal-label">Title Label</label>
            <input
              className="modal-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>

          {/* Input: Content */}
          <div className="modal-field">
            <label className="modal-label">Content Label</label>
            <input
              className="modal-input"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter content details"
            />
          </div>

          {/* Submit */}
          <button className="modal-submit-btn" onClick={handleSubmit}>
            Update Task
          </button>

        </div>
      </div>
    </>
  );
};

export default UpdateModal;