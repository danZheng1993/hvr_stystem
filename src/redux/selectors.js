import { get } from 'lodash'

export const authStateSelector = (state) =>
  get(state, 'auth')
  
export const verifyStateSelector = (state) =>
  get(state, 'auth.verified')

export const profileSelector = (state) =>
  get(state, 'auth.me', null)

export const userDetailSelector = (state) =>
  get(state, 'user.user', {})

export const usersListSelector = (state) =>
  get(state, 'user.users', [])

export const recordDetailSelector = (state) =>
  get(state, 'tracking.record', {})

export const recordsListSelector = (state) =>
  get(state, 'tracking.records', [])

export const trackingStateSelector = (state) =>
  get(state, 'tracking', {})

export const typeDetailSelector = (state) =>
  get(state, 'type.type', {})

export const typesListSelector = (state) =>
  get(state, 'type.types', [])

  export const typesloadingSelector = (state) =>
  get(state, 'type.loading', false)

export const typeStateSelector = (state) =>
  get(state, 'type', {})

export const sceneDetailSelector = (state) =>
  get(state, 'scene.scene', {})

export const scenesListSelector = (state) =>
  get(state, 'scene.scenes', [])

  export const scenesloadingSelector = (state) =>
  get(state, 'scene.loading', false)

export const sceneStateSelector = (state) =>
  get(state, 'scene', {})

export const serviceDetailSelector = (state) =>
  get(state, 'service.service', {})

export const servicesListSelector = (state) =>
  get(state, 'service.services', [])

  export const servicesloadingSelector = (state) =>
  get(state, 'service.loading', false)

export const serviceStateSelector = (state) =>
  get(state, 'service', {})

export const subcategoryDetailSelector = (state) =>
  get(state, 'subcategory.subcategory', {})

export const subcategorysListSelector = (state) =>
  get(state, 'subcategory.subcategorys', [])

  export const subcategorysloadingSelector = (state) =>
  get(state, 'subcategory.loading', false)

export const subcategoryStateSelector = (state) =>
  get(state, 'subcategory', {})

export const userStateSelector = (state) =>
  get(state, 'user', {})

export const reportSelector = (state) =>
  get(state, 'user.report', {})

export const recordsParamsSelector = (state) =>
  get(state, 'tracking.params', {})

export const usersParamsSelector = (state) =>
  get(state, 'user.params', {})
