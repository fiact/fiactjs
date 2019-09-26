import { getRenders } from '../_Common/reconciler-base';

const Components = {
  Schema: require('./elements/Schema').default,
  Table: require('./elements/Table').default,
  Column: require('./elements/Column').default,
  DBIndex: require('./elements/DBIndex').default
}

export default getRenders(Components)