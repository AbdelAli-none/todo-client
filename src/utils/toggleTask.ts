const API = "http://localhost:1337/api"; // Change to your URL
const getJwt = () => localStorage.getItem("jwt");

export const toggleTaskComplete = async (
  documentId: string,
  currentlyCompleted: boolean
) => {
  const now = new Date().toISOString();

  // 1. Get the current task to read the saved first-completion date
  const res = await fetch(`${API}/todos/${documentId}`, {
    headers: { Authorization: `Bearer ${getJwt()}` },
  });
  const { data } = await res.json();
  const oldFirstDate = data.attributes.completedAtFirst;

  let newFirstDate = oldFirstDate;

  if (currentlyCompleted) {
    // Becoming UNDONE → erase the first completion date
    newFirstDate = null;
  } else {
    // Becoming DONE
    if (!oldFirstDate) {
      // First time ever completing this task → lock today
      newFirstDate = now;
    }
    // If it was completed before, we KEEP the original date (so streak doesn't jump)
  }

  // 2. Save
  await fetch(`${API}/todos/${documentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getJwt()}`,
    },
    body: JSON.stringify({
      data: {
        completed: !currentlyCompleted,
        completedAtFirst: newFirstDate,
      },
    }),
  });

  // Optional: tell the app to refresh streak instantly
  window.dispatchEvent(new Event("streak-refresh"));
};
