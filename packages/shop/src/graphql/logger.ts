import bunyan from 'bunyan';
import { GraphQLExtension } from 'apollo-server';
import { logManager } from '../logManager';
import util from 'util';

const log = logManager.getLogger('root.graphql');

function truncateQuery(str: string, num: number) {
  if (str.length > num) {
    return str.slice(0, num) + `......(truncated: ${num}/${str.length})`;
  } else {
    return str;
  }
}

export const graphqlLogger: GraphQLExtension = {
  requestDidStart({ queryString, parsedQuery, variables }) {
    if (queryString.includes('IntrospectionQuery')) {
      // no log of introspection
      return;
    }

    log.info(
      'Query:\n',
      truncateQuery(queryString, log.level() === bunyan.INFO ? 500 : 2000),
      '\n',
    );
    log.info('Variables', variables);
  },

  willSendResponse({ graphqlResponse }) {
    if (graphqlResponse.data) {
      if (graphqlResponse.data['__schema'] || graphqlResponse.data['_service']) {
        // no log of introspection & service (gateway)
        return;
      }
    }
    log.debug('Result:', util.inspect(graphqlResponse, false, 4, true /* enable colors */));
  },
};
