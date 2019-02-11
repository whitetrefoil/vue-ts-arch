import { ActionContext, ActionTree, MutationTree, Payload } from 'vuex'


type PayloadCreator<D> = (data: D) => Payload&{ data: D }


export function addMutation<S, D>(
  tree: MutationTree<S>,
  name: string,
  mutation: (state: S, data: D) => any,
): PayloadCreator<D> {
  tree[name] = (state: S, payload: { type: typeof name; data: D }) => mutation(state, payload.data)

  return (data: D) => ({
    type: name,
    data,
  })
}


export function addAction<S, R, D = void>(
  tree: ActionTree<S, R>,
  name: string,
  action: (context: ActionContext<S, R>, data: D) => any,
): PayloadCreator<D> {
  tree[name] = (context: ActionContext<S, R>, payload: { type: typeof name; data: D }) => action(context, payload.data)

  return (data: D) => ({
    type: name,
    data,
  })
}
