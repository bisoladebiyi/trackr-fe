export const timeAgo = (isoDateString) => {
  const then = new Date(isoDateString);
  const now = new Date();
  const diffMs = now - then;
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 1) {
    return "just now";
  } else if (diffHours < 24) {
    const hours = Math.floor(diffHours);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(diffHours / 24);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }
};

export const groupApplicationsByStatus = (applications) => {
  const STATUSES = [
    "Applied",
    "Interviewing",
    "Offer",
    "Hired",
    "Rejected",
    "Ghosted",
  ];

  const result = {};
  STATUSES.forEach((status) => {
    result[status] = [];
  });

  applications.forEach((app) => {
    const formatted = {
      id: app.id,
      jobName: app.job_name,
      companyName: app.company_name,
      link: app.link.startsWith("http") ? app.link : `https://${app.link}`,
      salary: app.salary
    };
    if (result[app.status]) {
      result[app.status].push(formatted);
    }
  });

  return result;
};
