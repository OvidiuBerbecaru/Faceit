import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import {
  getAllTournaments,
  createTournament,
  searchTournament
} from '../actions/tournaments';
import InfoCard from '../components/InfoCard';
import H6 from './Styles/H6';
import Button from './Styles/Button';
import Input from './Styles/Input';
import { useDebounce } from '../utils';
import { useDispatch, useSelector } from 'react-redux';

const Main = () => {
  const dispatch = useDispatch();
  const [searchedByName, setSearchedByName] = useState('');
  const debouncedSearchTerm = useDebounce(searchedByName, 500);
  const tournaments = useSelector(state => state.tournaments);

  useEffect(() => {
    dispatch(getAllTournaments());
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm !== '') {
      dispatch(searchTournament(debouncedSearchTerm));
    } else {
      dispatch(getAllTournaments());
    }
  }, [debouncedSearchTerm]);

  const handleCreateTournament = () => {
    const name = prompt('Tournament Name');
    if (name !== null) {
      dispatch(createTournament(name));
    }
  };

  return (
    <>
      <Container fluid>
        <Row justify="between">
          <Input
            placeholder="Search tournament ..."
            onChange={e => setSearchedByName(e.target.value)}
          />
          <Button onClick={handleCreateTournament}>CREATE TOURNAMENT</Button>
        </Row>
      </Container>
      {tournaments.error ? (
        <Col xs={12} align="center">
          <H6>Something went wrong.</H6>
          <Button onClick={() => dispatch(searchTournament(searchedByName))}>
            RETRY
          </Button>
        </Col>
      ) : (
        <Row gutterWidth={24}>
          {tournaments.isLoading ? (
            <Container>
              <Row xs={12} justify="center">
                <H6>Loading tournaments ...</H6>
              </Row>
            </Container>
          ) : (
            tournaments.data.map((tournament, index) => (
              <Col md={4} key={`${tournament.name}-${index}`}>
                <InfoCard
                  key={`${index}-${tournament.name}`}
                  name={tournament.name}
                  organizer={tournament.organizer}
                  game={tournament.game}
                  participants={`${tournament.participants.current} / ${tournament.participants.max}`}
                  startDate={tournament.startDate}
                  id={tournament.id}
                />
              </Col>
            ))
          )}
        </Row>
      )}
    </>
  );
};

export default Main;
