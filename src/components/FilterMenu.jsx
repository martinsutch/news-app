import { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import TopicCard from "./TopicCard";
import { getTopics } from "../utils/api";

const FilterMenu = ({ topic, lastTopic }) => {
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
      <FilterBar topic={topic} lastTopic={lastTopic} />
      {location.pathname === "/topic" ? (
        topicsIsLoaded ? (
          <>
            <TopicCard key="all" topic="all" lastTopic={lastTopic} />
            {allTopics.map((mapTopic) => (
              <TopicCard
                key={mapTopic.slug}
                topic={mapTopic}
                lastTopic={lastTopic}
              />
            ))}
          </>
        ) : null
      ) : null}
    </div>
  );
};

export default FilterMenu;
