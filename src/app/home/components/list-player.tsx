import { Avatar, Card, Checkbox, Input, List } from 'antd';
import { Player } from '../../../types';
import { LIST_PLAYER } from '../../../constants';
import { useState } from 'react';

type ListPlayerProps = {
  selected: Player[];
  onSelect: (v: Player) => void;
};

function toPlayerListScore(player: Player[]) {
  const tmpPlayer = player;
  player.forEach((item, index) => {
    const defaultScore = localStorage.getItem(`player-${item.id}`);
    tmpPlayer[index].score = Number(defaultScore) || 0;
  });

  return tmpPlayer;
}

function ListPlayer(props: ListPlayerProps) {
  const { selected, onSelect } = props;
  const [items, setItems] = useState<Player[]>(() =>
    toPlayerListScore(LIST_PLAYER),
  );

  function onChangeScore(score: string, id: number) {
    const tmpItems = items;
    for (const data of tmpItems) {
      if (data.id === id) {
        localStorage.setItem(`player-${id}`, score);
        data.score = Number(score);
        break;
      }
    }

    setItems([...tmpItems]);
  }
  return (
    <Card bordered={false} className='list-player'>
      <List
        itemLayout='horizontal'
        header={
          <div className='flex justify-between px-[16px] text-z-base'>
            <div className='font-bold'>Participants</div>
            <div>{selected.length} selected</div>
          </div>
        }
        dataSource={items}
        bordered={false}
        size='large'
        renderItem={item => (
          <List.Item
            extra={
              <Input
                min={0}
                type='number'
                value={item.score}
                onChange={e => onChangeScore(e.target.value, item.id)}
                className='w-[60px]'
              />
            }
          >
            <List.Item.Meta
              avatar={
                <div
                  className='flex items-center'
                  onClick={() => onSelect(item)}
                >
                  <Checkbox checked={selected.includes(item)} />
                  <Avatar src={item.avt} />
                </div>
              }
              title={
                <div className='cursor-pointer' onClick={() => onSelect(item)}>
                  {item.name}
                </div>
              }
              className='text-z-md font-medium'
            ></List.Item.Meta>
          </List.Item>
        )}
      />
    </Card>
  );
}

export default ListPlayer;
