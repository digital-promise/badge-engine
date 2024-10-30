export default function updateAction(state: object, payload: object) {
  console.log("state: ", state);
  console.log("payload: ", payload);
  return {
    ...state,
    ...payload,
  };
}
