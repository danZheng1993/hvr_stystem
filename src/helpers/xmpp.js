import { client } from '@xmpp/client';

import constants from '../constants';

export default client({
  service: `ws://${constants.XMPP_DOMAIN}:${constants.XMPP_PORT}/xmpp-websocket`,
  resource: 'chat',
  password: 'pwd',
});
