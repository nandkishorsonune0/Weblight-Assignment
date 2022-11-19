import moment from "moment";
import React, { useEffect, useState } from "react";
import { fetchStarredRepositories } from "../data/repositories";
import RepositoryItem from "./RepositoryItem";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

function RepositoryList() {
  const [repositorylist, setRepositorylist] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const currentDateTime = moment();
    currentDateTime.subtract(days, "days");
    setLoading(true);
    fetchStarredRepositories(currentDateTime.format("YYYY-MM-DD"), page)
      .then((data) => {
        if (page === 1) {
          setRepositorylist(data.items);
        } else {
          setRepositorylist((repository) => repository.concat(data.items));
        }

        setTotalResults(data.total_count);
        setLoading(false);
      })
      .catch((error) => {
        setRepositorylist([]);
        setTotalResults(0);
      });
  }, [days, page]);

  return (
    <div>
      <div className="float-end w-50">
        <select
          className="form-select"
          id="floatingSelect"
          value={days}
          onChange={(e) => {
            setDays(e.target.value);
            setPage(1);
          }}
        >
          <option value="30" selected>
            Select days
          </option>
          <option value="7">1 Week</option>
          <option value="14">2 Week</option>
          <option value="30">1 Month</option>
        </select>
      </div>
      <h1 className="my-2">Most Starred Repository</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={repositorylist.length}
        next={() => setPage(page + 1)}
        hasMore={repositorylist.length !== totalResults}
        loader={<Spinner />}
      >
        <div className=" text-dark">
          {repositorylist.map((repository, index) => {
            return <RepositoryItem repository={repository} key={index} />;
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default RepositoryList;
