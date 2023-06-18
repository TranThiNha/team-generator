import { useState } from 'react';
import ListPlayer from './components/list-player.tsx';
import { Col, Row } from 'antd';
import TeamSetting from './components/team-setting.tsx';
import { Player, Team, TeamName } from '../../types';
import GeneratedTeam from './components/generated-team.tsx';

function Home() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  function onSubmit(teamName: TeamName[]) {
    const generatedTeams = generateTeams(selectedPlayer, teamName);
    setTeams(generatedTeams);
  }

  function generateTeams(players: Player[], teamNames: TeamName[]) {
    players.sort((a, b) => (b.score || 0) - (a.score || 0)); // Sort players by score in descending order

    const teams: Team[] = teamNames.map(item => ({
      name: item.name,
      players: [],
      totalScore: 0,
    }));

    for (let i = 0; i < players.length; i++) {
      const currentPlayer: Player = players[i];
      const smallestTeam = teams.reduce((prev, current) =>
        current.totalScore < prev.totalScore ? current : prev,
      );

      smallestTeam.players.push(currentPlayer);
      smallestTeam.totalScore += currentPlayer.score || 0;
    }
    return teams;
  }

  function onSelectPlayer(obj: Player) {
    if (selectedPlayer.includes(obj)) {
      const tmpPlayer = selectedPlayer.filter(o => o.id !== obj.id);
      setSelectedPlayer(tmpPlayer);
    } else {
      setSelectedPlayer([...selectedPlayer, obj]);
    }
  }

  return (
    <div className='m-auto w-[80vw] p-[16px]'>
      <Row gutter={16}>
        <Col span={12}>
          <ListPlayer selected={selectedPlayer} onSelect={onSelectPlayer} />
        </Col>
        <Col span={12}>
          <TeamSetting onSubmit={onSubmit} />
          <GeneratedTeam items={teams} />
        </Col>
      </Row>
    </div>
  );
}

export default Home;
