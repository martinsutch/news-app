import { Link } from "react-router-dom";

const TopicCard = ({ topic, lastTopic }) => {
  const selected =
    (topic === "all" && !lastTopic) ||
    (topic !== "all" && lastTopic === topic.slug);
  return (
    <Link to={topic === "all" ? "/../../" : `/../../topic/${topic.slug}`}>
      <div className={`card internal-row ${selected ? "yellow" : null}`}>
        <strong className="">{topic === "all" ? "All" : topic.slug}</strong>
        <span className="">
          {topic === "all" ? "Show all topics" : topic.description}
        </span>
      </div>
    </Link>
  );
};

export default TopicCard;
