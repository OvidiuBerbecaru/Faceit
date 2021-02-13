import {
  GET_TOURNAMENTS,
  LOADING_TOURNAMENTS,
  UPDATE_TOURNAMENT,
  DELETE_TOURNAMENT,
  CREATE_TOURNAMENT,
  ERROR
} from '../actionTypes/index';
import { API_TOURNAMENTS_URL } from '../constants/api';
import axios from 'axios';

export const getAllTournaments = () => dispatch => {
  dispatch({ type: LOADING_TOURNAMENTS });
  axios
    .get(API_TOURNAMENTS_URL)
    .then(res => {
      dispatch({ type: GET_TOURNAMENTS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err });
    });
};

export const editTournamentName = (id, name) => dispatch => {
  axios
    .patch(`${API_TOURNAMENTS_URL}/${id}`, { name })
    .then(() => {
      dispatch({ type: UPDATE_TOURNAMENT, payload: { id, name } });
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err });
    });
};

export const deleteTournament = id => dispatch => {
  axios
    .delete(`${API_TOURNAMENTS_URL}/${id}`)
    .then(() => {
      dispatch({ type: DELETE_TOURNAMENT, payload: { id } });
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err });
    });
};

export const createTournament = name => dispatch => {
  axios
    .post(API_TOURNAMENTS_URL, { name })
    .then(res => {
      dispatch({ type: CREATE_TOURNAMENT, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err });
    });
};

export const searchTournament = name => dispatch => {
  dispatch({ type: LOADING_TOURNAMENTS });
  axios
    .get(API_TOURNAMENTS_URL, { params: { name } })
    .then(res => {
      dispatch({ type: GET_TOURNAMENTS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err });
    });
};
