import React from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";

import { useSelector } from "react-redux";

import { selectLeagueById } from "../features/leagues/leaguesSlice";
import TeamDetail from "../features/teams/TeamDetail";

const propTypes = { leagueId: PropTypes.number.isRequired };

const style = {
  root: { maxHeight: "300px", overflowY: "auto" },
  tableHeaderCell: { position: "sticky", top: "0" },
};

const config = {
  placeholderLines: 15,
  tableHeader: [
    "#",
    "Team",
    "Points",
    "Played",
    "W",
    "D",
    "L",
    "GS",
    "GA",
    "GD",
  ],
};

function Standings({ leagueId }) {
  const league = useSelector((state) => selectLeagueById(state, +leagueId));

  const renderedHeader = config.tableHeader.map((text, i) => (
    <Table.HeaderCell key={i} style={style.tableHeaderCell}>
      {text}
    </Table.HeaderCell>
  ));

  const renderedBody = league.standings.map((team) => (
    <Table.Row key={team.team_id}>
      <Table.Cell>{team.position}</Table.Cell>
      <Table.Cell width={4} children={<TeamDetail teamId={team.team_id} />} />
      <Table.Cell>{team.points}</Table.Cell>
      <Table.Cell>{team.overall.games_played}</Table.Cell>
      <Table.Cell>{team.overall.won}</Table.Cell>
      <Table.Cell>{team.overall.draw}</Table.Cell>
      <Table.Cell>{team.overall.lost}</Table.Cell>
      <Table.Cell>{team.overall.goals_scored}</Table.Cell>
      <Table.Cell>{team.overall.goals_against}</Table.Cell>
      <Table.Cell>{team.overall.goals_diff}</Table.Cell>
    </Table.Row>
  ));

  return (
    <div style={style.root}>
      <Table celled={true} size="small">
        <Table.Header>
          <Table.Row>{renderedHeader}</Table.Row>
        </Table.Header>
        <Table.Body>{renderedBody}</Table.Body>
      </Table>
    </div>
  );
}

Standings.propTypes = propTypes;

export default Standings;
