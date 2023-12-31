import _ from 'lodash'

export default function updateNestedObject (change, oldState) {
  const clone = _.cloneDeep(oldState)
  return _.merge(clone, change)
}
