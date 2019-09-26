import { getRenders } from "../_Common/reconciler-base";

export default getRenders({
    DB: {
        Schema: require('./elements/Schema').default,
        Table: require('./elements/Table').default,
        Column: require('./elements/Column').default,
        DBIndex: require('./elements/DBIndex').default
    },
    Model: require('./components/Model').default,
    Property: require('./components/Property').default,
})