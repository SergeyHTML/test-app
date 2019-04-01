export default store => next => action => {
  // console.log('--', store.getState());
  // console.log('--', 'dispatching', action);
  next(action)
}