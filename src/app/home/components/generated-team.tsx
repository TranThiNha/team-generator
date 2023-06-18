import { Team } from '../../../types';
import { Avatar, Card } from 'antd';
import clsx from 'clsx';

function GeneratedTeam(props: { items: Team[] }) {
  const { items } = props;
  return (
    <div className='mb-[32px] flex w-full gap-[16px]'>
      {items.map((item, index) => {
        const sumScore = item.players.reduce((accumulator, object) => {
          return accumulator + (object.score || 0);
        }, 0);

        const cls = clsx(
          'list-player mb-[16px] flex w-full gap-[8px] bg-gradient-to-r',
          {
            'from-[#00C6FF] to-[#0072FF]': index === 0,
            'from-[#fe8c00] to-[#f83600]': index === 1,
            'from-[#56ab2f] to-[#a8e063]': index === 2,
          },
        );
        return (
          <div key={`team-${index}`} className='w-full'>
            <Card bordered={false} className={cls}>
              <div className='px-[16px] py-[12px] text-z-base font-bold '>
                {item.name} ({sumScore})
              </div>
            </Card>
            {item.players.map(player => (
              <Card
                bordered={false}
                className='list-player mb-[16px] flex w-full'
              >
                <div className='flex items-center px-[16px] py-[12px]'>
                  <Avatar size='large' src={player.avt} />
                  <div className='ml-[12px] text-z-base font-medium'>
                    {player.name} ({player.score || 0})
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );
      })}
    </div>
  );
}
export default GeneratedTeam;
