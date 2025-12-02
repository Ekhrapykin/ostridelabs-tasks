import { knex as createKnex } from 'knex';
import config from './knexfile';

export default createKnex(config.development);
