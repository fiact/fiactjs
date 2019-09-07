import React = require('react');

interface AttacFunction {
  <S, R extends React.Reducer<S, any>> (
    Target: React.FunctionComponent,
    opts: React.PropsWithChildren<{state: React.ReducerState<R>, reducer: R}>
  ): React.FunctionComponent
}

export function getContextReducer(
  StateContext = React.createContext({})
) {
  const useCtxState = () => React.useContext(StateContext) as [any, Function];
  
  const attach: AttacFunction = (Target, { state, reducer }) => {
    return (props) => {

      return (
        <StateContext.Provider value={React.useReducer(reducer, state)}>
          <Target {...props} />
        </StateContext.Provider>
      )
    }
  }
  
  return {
    attach,
    useCtxState,
  };
}
