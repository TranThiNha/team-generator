import { useEffect, useState } from 'react';
import { Button, Card, Input } from 'antd';
import useArrays from '../../../hooks/useArray.ts';
import { TeamName } from '../../../types';

type ListTeamNameProps = {
  count: number;
  onSubmit: (v: TeamName[]) => void;
};
function ListTeamName(props: ListTeamNameProps) {
  const { count, onSubmit } = props;
  const items = useArrays(count);
  const [listNames, setListName] = useState<TeamName[]>([]);

  useEffect(() => {
    if (count > 0) {
      setListName(items);
    }
  }, [count]);

  function onChangeName(value: string, obj: TeamName) {
    const tmpList = listNames;
    for (const item of tmpList) {
      if (item.key === obj.key) {
        item.name = value;
        break;
      }
    }
    setListName([...tmpList]);
  }
  return (
    <div className='mt-[24px] flex flex-col gap-[16px]'>
      {listNames.map(item => (
        <div className='flex items-center'>
          <span className='mr-[8px] text-z-base'>{item.key}.</span>
          <Input
            key={item.key}
            placeholder={`Team's name`}
            size='large'
            value={item.name}
            onChange={e => onChangeName(e.target.value, item)}
          />
        </div>
      ))}

      <Button
        type='primary'
        rootClassName='w-fit font-bold m-auto'
        size='large'
        disabled={!count}
        onClick={() => onSubmit(listNames)}
      >
        Generate Team
      </Button>
    </div>
  );
}
function TeamSetting(props: { onSubmit: (v: TeamName[]) => void }) {
  const [count, setCount] = useState<string>('');
  return (
    <Card bordered={false}>
      <div className='flex items-center gap-[12px]'>
        <span className='text-z-base font-bold'>Số đội:</span>
        <Input
          min={0}
          value={count}
          onChange={e => setCount(e.target.value)}
          className='mt-[12px] w-[80px]'
          type='number'
          size='large'
        />
      </div>

      <ListTeamName count={Number(count)} onSubmit={props.onSubmit} />
    </Card>
  );
}
export default TeamSetting;
