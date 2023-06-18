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
      let smallestTeams: Team[] = [];
      let smallestScore = teams.sort((a, b) => a.totalScore - b.totalScore)[0]
        .totalScore;

      for (let j = 0; j < teams.length; j++) {
        const currentTeam = teams[j];
        if (currentTeam.totalScore < smallestScore) {
          smallestScore = currentTeam.totalScore;
          smallestTeams = [currentTeam];
        } else if (currentTeam.totalScore === smallestScore) {
          smallestTeams.push(currentTeam);
        }
      }
      if (smallestTeams.length === 0) {
        smallestTeams = teams;
      }
      let randomIndex = Math.floor(Math.random() * (smallestTeams.length - 1));
      const smallestPlayer = smallestTeams.sort(
        (a, b) => a.players.length - b.players.length,
      );
      if (
        smallestPlayer.length > 1 &&
        smallestPlayer[0].players.length < smallestPlayer[1].players.length
      ) {
        randomIndex = 0;
      }
      const randomTeam = smallestTeams[randomIndex];
      if (randomTeam) {
        randomTeam.players.push(currentPlayer);
        randomTeam.totalScore += currentPlayer.score || 0;
      }
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
      <div className='m-auto mb-[90px] w-[70vw]'>
        <GeneratedTeam items={teams} />
      </div>

      <Row gutter={16}>
        <Col span={12}>
          <ListPlayer selected={selectedPlayer} onSelect={onSelectPlayer} />
        </Col>
        <Col span={12}>
          <TeamSetting onSubmit={onSubmit} />
        </Col>
      </Row>
    </div>
  );
}

export default Home;
