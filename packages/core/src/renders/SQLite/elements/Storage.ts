import { getContextReducer } from '../../../utils/store';

const { attach, useCtxState } = getContextReducer();

const DFT_SCHEMA_ITEM = {
    driver: null,
    tables: {}
}
const state = {
    schema: { default: DFT_SCHEMA_ITEM }
}

const reducer: React.Reducer<typeof state, any> = (state, action) => {
    if (!action.schema_id) return state

    let schema_item = null
    let schema = state.schema;

    switch (action.type) {
        case 'add-schema':
            schema = {
                ...schema,
                [action.schema_id]: {
                    driver: action.driver,
                    tables: {}
                }
            }

            return {
                ...state,
                schema
            }
        default:
            schema_item = state.schema[action.schema_id]
            if (!schema_item)
                return state;
        case 'set-table':
            schema_item.tables[action.table] = {
                ...schema_item.tables[action.table],
                columns: action.table.columns
            }
            state.schema[action.schema_id] = schema_item
            
            return { ...state }
    }
};

export const computer = {
    getDriverBySchemaId: (state: any, schema_id: string) => {
        const {
            schema: {
                [schema_id]: {
                    driver = null
                } = {}
            }
        } = state || {};
        return driver
    }
}

export const connect = (App: React.FunctionComponent) => attach(App, { state, reducer })
export { useCtxState };
