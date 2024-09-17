export const relativeDate = (isoDate) => {
    // Planned functionality for this util function:
    // "Just now" for within 2 minutes
    // "2 minutes ago" for within 60 minutes
    // "1 hour[s] ago" for within 24 hours
    // "1 day[s] ago" for within 7 days
    // "16 Sep" for within 6 months
    // "16 Sep 2024" for over 6 months

    // Temporary functionality during early development:
    // "Today" for within 24 hours
    // "16 Sep 2024" for all other dates
    const currentDate = new Date();
    const postDate = new Date(isoDate);
    const millisecondsSincePost = currentDate - postDate;

    if (millisecondsSincePost < 24 * 60 * 60 * 1000) return "Today";

    return postDate.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};
