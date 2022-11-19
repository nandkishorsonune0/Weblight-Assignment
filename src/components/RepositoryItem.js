import moment from "moment";
import React from "react";
//import Moment from "react-moment";

function RepositoryItem(props) {
  return (
    <div className="text-dark fw-bold d">
      <div className="card mb-3 border border-3 rounded-2">
        <div className="row g-2">
          <div className="col-md-3">
            <img
              src={props.repository.owner.avatar_url}
              className="img-fluid rounded-start align-middle border rounded-2"
              alt="Avtar URL"
              style={{ width: "20wh", height: "25vh" }}
            />
          </div>
          <div className="col-md-9">
            <div className="card-body">
              <h5 className="card-title fs-4">{props.repository.full_name}</h5>
              <p className="text-muted fs-5">{props.repository.description}</p>
              <div>
                <span className="badge bg-light p-3 mx-2 text-dark fs-6 border">
                  {props.repository.stargazers_count} Stars
                </span>
                <span className="badge bg-light p-3 mx-2 text-dark fs-6 border">
                  {props.repository.open_issues_count} Issues
                </span>
              </div>
              <p className="card-text fs-6 ">
                <small className="text-muted">
                  Last push by{" "}
                  <strong>
                    <em>{props.repository.owner.login}</em>
                  </strong>
                  {` at ${moment(props.repository.pushed_at).fromNow()}`}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepositoryItem;
