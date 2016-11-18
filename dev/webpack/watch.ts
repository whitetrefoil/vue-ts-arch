import { smart } from 'webpack-merge'
import development from './development'

export default smart(development, {
  watch: true,
})
