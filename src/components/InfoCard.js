import React from 'react';
import styled from 'styled-components';
import theme from '../theme';
import { editTournamentName, deleteTournament } from '../actions/tournaments';
import H6 from './Styles/H6';
import Button from './Styles/Button';
import { useDispatch } from 'react-redux';

const StyledInfoCard = styled.section`
  display: flex;
  flex-direction: column;
  background-color: ${theme.palette.background.base};
  padding: 24px;
  margin-top: 24px;
`;

const InfoCard = ({ name, organizer, game, participants, startDate, id }) => {
  const dispatch = useDispatch();

  const handleEditClick = () => {
    const name = prompt('New Tournament Name');
    if (name !== null) {
      dispatch(editTournamentName(id, name));
    }
  };

  const handleDeleteClick = () => {
    const confirm = window.confirm(
      'Do you really want to delete this tournament?'
    );
    if (confirm) {
      dispatch(deleteTournament(id));
    }
  };

  return (
    <StyledInfoCard>
      <H6>{name}</H6>
      <p>{organizer}</p>
      <p>{game}</p>
      <H6>{participants}</H6>
      <H6>{startDate}</H6>
      <div>
        <Button onClick={handleEditClick}>Edit</Button>
        <Button margin8 onClick={handleDeleteClick}>
          Delete
        </Button>
      </div>
    </StyledInfoCard>
  );
};

export default InfoCard;
