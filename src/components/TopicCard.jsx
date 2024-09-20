import { Link } from "react-router-dom";

const TopicCard = ({ topic }) => {
    return (
        <Link to={`/../../topic/${topic.slug}`}>
            <div className="card internal-row">
                <strong className="">{topic.slug}</strong>
                <span className="">{topic.description}</span>
            </div>
        </Link>
    );
};

export default TopicCard;
