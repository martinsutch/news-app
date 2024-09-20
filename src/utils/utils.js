export const relativeDate = (isoDate) => {
    const currentDate = new Date();
    const postDate = new Date(isoDate);
    const secondsSincePost = Math.floor((currentDate - postDate) / 1000);

    const minutes = Math.floor(secondsSincePost / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (secondsSincePost < 120) return "Just now";
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
    if (months < 6) return postDate.toLocaleDateString("en-GB", { day: "numeric", month: "short" });

    return postDate.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};
