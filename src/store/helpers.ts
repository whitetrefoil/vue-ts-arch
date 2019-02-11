import { ActionContext, ActionTree, MutationTree, Payload } from 'vuex'


type PayloadCreator<D> = (data: D) => Payload&{ data: D }

export function addMutation<S, D>(
  tree: MutationTree<S>,
  name: string,
  mutation: (state: S, payload: { type: typeof name; data: D }) => any,
): PayloadCreator<D> {
  tree[name] = mutation

  return (data: D) => ({
    type: name,
    data,
  })
}


export function addAction<S, R, D = void>(
  tree: ActionTree<S, R>,
  name: string,
  action: (context: ActionContext<S, R>, payload: { type: typeof name; data: D }) => any,
): PayloadCreator<D> {
  tree[name] = action

  return (data: D) => ({
    type: name,
    data,
  })
}
