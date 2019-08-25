import * as React from 'react';
import { throttle } from '@tune-sync/common';

export interface InfiniteListProps {
  /**
   * Does the resource have more entities
   */
  hasMore: boolean;

  /**
   * Should show loading
   */
  isLoading: boolean;

  /**
   * Callback to load more entities
   */
  onLoadMore: Function;

  /**
   * Scroll threshold
   */
  threshold?: number;

  /**
   * Throttle rate
   */
  throttle?: number;

  /** Should load on mount */
  loadOnMount: boolean;
}

export class InfiniteList extends React.Component<InfiniteListProps, {}> {
  public static defaultProps = {
    threshold: 200,
    throttle: 64,
  };

  checkWindowScroll = throttle(() => {
    if (this.props.isLoading) {
      return;
    }

    if (
      this.props.hasMore &&
      this.sentinel.getBoundingClientRect().top - window.innerHeight <
        this.props.threshold!
    ) {
      this.props.onLoadMore();
    }
  }, this.props.throttle!);

  componentDidMount() {
    if (this.props.loadOnMount) {
      this.props.onLoadMore();
    }
    window.addEventListener('scroll', this.checkWindowScroll);
    window.removeEventListener('resize', this.checkWindowScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkWindowScroll);
    window.removeEventListener('resize', this.checkWindowScroll);
  }

  sentinel: any;

  render() {
    return (
      <div>
        {this.props.children}
        <div ref={i => (this.sentinel = i)} />
      </div>
    );
  }
}
