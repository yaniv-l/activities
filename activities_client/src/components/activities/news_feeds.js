import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class NewsFeeds extends Component {
  componentWillMount() {
    this.props.fetchNewsFeed();
  }

  renderActivities() {
    if (this.props.feeds != 'undefined'
      && this.props.feeds !== null
      && Array.isArray(this.props.feeds)) {
      return this.props.feeds.map((activity) => {
        return (
          <li
            key={activity._id}
            // <!--onClick will invoke redux action creator which is exposed
            // under this.props since we mapDispatchToProps -->
            // onClick={() => this.props.selectBook(activity)}
            className="list-group-item"
          >{ activity.message }
          </li>
        );
      });
    }
    else {
      return 'No current activities, loading...'; }
  }

  render() {
    return (
      <div>{this.renderActivities()}</div>
    );
  }
}

function mapStateToProps(state) {
  return { feeds: state.activities.feeds };
}

export default connect(mapStateToProps, actions)(NewsFeeds);
