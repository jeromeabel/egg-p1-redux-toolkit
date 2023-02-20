# React Redux ToolKit - Primer

## Installation

```bash
$ pnpm create vite hello-redux-tk --template react
$ cd hello-redux-tk/ && pnpm install
$ pnpm install react-redux @reduxjs/toolkit
```

## Steps

- features/counter/counterSlice.js : createSlice
  - name
  - initialState = { value: 10 };
  - reducers: { inc : state => state.value+=1 }
  - export { inc } = .actions
  - export .reducer
- app/store.js : export store = configureStore( reducer: { counter: counterReducer })
- main.jsx : `<Provider store={store}><App /></Provider>`
- components/Counter/Counter.jsx : import { increment }
  - count = useSelector( state => state.counter.value )
    -{count}
  - onClick={() => dispatch(increment())}
