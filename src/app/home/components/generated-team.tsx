import { Team } from '../../../types';
import { Avatar, Card, List } from 'antd';

function GeneratedTeam(props: { items: Team[] }) {
  const { items } = props;
  return (
    <Card bordered={false} className='list-player mt-[24px] bg-[#DDF0FD]'>
      {items.map((item, index) => {
        const sumScore = item.players.reduce((accumulator, object) => {
          return accumulator + (object.score || 0);
        }, 0);
        return (
          <div key={`team-${index}`} className='mb-[16px]'>
            <List
              itemLayout='horizontal'
              header={
                <div className='px-[16px] text-z-base font-bold'>
                  {item.name} ({sumScore})
                </div>
              }
              dataSource={item.players}
              bordered={false}
              size='large'
              renderItem={player => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <div className='flex items-center'>
                        <Avatar src={player.avt} />
                      </div>
                    }
                    title={
                      <div>
                        {player.name} ({player.score || 0})
                      </div>
                    }
                    className='text-z-md font-medium'
                  ></List.Item.Meta>
                </List.Item>
              )}
            />
          </div>
        );
      })}
    </Card>
  );
}
export default GeneratedTeam;
