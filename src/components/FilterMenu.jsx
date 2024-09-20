import { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import TopicCard from "./TopicCard";
import { getTopics } from "../utils/api";

const FilterMenu = ({ topic }) => {
    const [allTopics, setAllTopics] = useState();
    const [topicsIsLoaded, setTopicsIsLoaded] = useState(false);
    useEffect(() => {
        getTopics().then((topics) => {
            setAllTopics(topics);
            setTopicsIsLoaded(true);
        });
    }, []);

    return (
        <div className="column">
            <FilterBar topic={topic} />
            {location.pathname === "/topic"
                ? topicsIsLoaded
                    ? allTopics.map((mapTopic) => <TopicCard key={mapTopic.slug} topic={mapTopic} />)
                    : null
                : null}
        </div>
    );
};

export default FilterMenu;
