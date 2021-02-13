const initialState = {
  data: [],
  isLoading: false
};

export default function tournaments(state = initialState, action) {
  switch (action.type) {
    case 'GET_TOURNAMENTS':
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };
    case 'LOADING_TOURNAMENTS':
      return {
        data: [],
        isLoading: true
      };
    case 'UPDATE_TOURNAMENT':
      return {
        ...state,
        data: state.data.map(tournament =>
          tournament.id === action.payload.id
            ? { ...tournament, name: action.payload.name }
            : { ...tournament }
        )
      };
    case 'DELETE_TOURNAMENT':
      return {
        ...state,
        data: state.data.filter(
          tournament => tournament.id !== action.payload.id
        )
      };
    case 'CREATE_TOURNAMENT':
      return {
        ...state,
        data: [action.payload, ...state.data]
      };
    case 'ERROR':
      return {
        data: [],
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
