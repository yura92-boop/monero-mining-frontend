// **  Initial State
const initialState = {
  appStats: {
    data: {
      installed: 0,
      uninstalled: 0,
      devices: 0,
    },
    isLoading: false,
    error: null,
  },
  deviceList: {
    data: [],
    isLoading: false,
    error: null,
  },
  total: 0,
  data: [],
  selectedUser: null,
  isLoading: false,
  error: null,
}

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DASHBOARD/PUBLISHER/SET_APP_STATS':
      return {
        ...state,
        appStats: {
          ...state.appStats,
          ...action.payload,
        },
      }
    case 'DASHBOARD/PUBLISHER/SET_DEVICE_LIST':
      return {
        ...state,
        deviceList: {
          ...state.deviceList,
          ...action.payload,
        },
      }
    case 'SET_USERS':
      return {
        total: action.payload.total,
        data: action.payload.data,
        isLoading: false,
      }
    case 'SET_USER':
      return { ...state, selectedUser: action.payload, isLoading: false }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_USER_STATUS':
      return {
        ...state,
        selectedUser: { ...state.selectedUser, status: action.payload.status },
      }
    case 'UPDATE_USER':
      let id = action.payload._id
      return {
        ...state,
        isLoading: false,
        data: state.data.map(it => {
          if (it._id == id) {
            return action.payload
          }
          return it
        }),
      }
    default:
      return state
  }
}

export default dashboardReducer
