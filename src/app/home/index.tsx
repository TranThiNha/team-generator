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

  function splitArrayByConsecutiveValues(arr: Player[]): Player[][] {
    const result: Player[][] = [];
    let currentSubarray: Player[] = [];

    for (let i = 0; i < arr.length; i++) {
      const currentValue = arr[i].score;
      const previousValue = arr[i - 1]?.score || 0;

      if (i === 0 || currentValue !== previousValue) {
        // Start a new subarray if it's the first element or the value is different
        currentSubarray = [arr[i]];
        result.push(currentSubarray);
      } else {
        // Add the value to the current subarray if it's the same as the previous value
        currentSubarray.push(arr[i]);
      }
    }
    return result;
  }

  function generateTeams(players: Player[], teamNames: TeamName[]) {
    let shuffledPlayer: Player[] = [];
    const segmentScores = splitArrayByConsecutiveValues(players);
    for (const segment of segmentScores) {
      if (segment.length > 1) {
        const shuffledPeople = segment.sort(() => Math.random() - 0.5);
        shuffledPlayer = shuffledPlayer.concat(shuffledPeople);
        console.log('shuffledPeople', shuffledPeople);
      } else {
        shuffledPlayer = shuffledPlayer.concat(segment);
      }
    }

    // Initialize groups
    const groups: Team[] = [];
    for (let i = 0; i < teamNames.length; i++) {
      groups.push({
        name: `Group ${i + 1}`,
        players: [],
        totalScore: 0,
      });
    }

    const randomIndex = Math.floor(Math.random() * groups.length);
    let index = 0;
    for (const person of shuffledPlayer) {
      let minScoreGroup = groups[0];
      for (const group of groups) {
        if (index === 0) {
          minScoreGroup = groups[randomIndex];
        } else {
          if (
            group.totalScore < minScoreGroup.totalScore ||
            group.players.length < minScoreGroup.players.length
          ) {
            minScoreGroup = group;
          }
        }
        index++;
      }
      minScoreGroup.players.push(person);
      minScoreGroup.totalScore += person.score || 0;
    }

    return groups;
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
