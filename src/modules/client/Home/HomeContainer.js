import { compose, withState } from 'recompose';

import HomeView from './HomeView';

export default compose(
  withState('tabIndex', 'setTabIndex', 0),
  withState('tabs', 'setTabs', ['融媒体资讯', '精选', 'VR直播']),
)(HomeView);
