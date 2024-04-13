import { Avatar, Button, Card, Checkbox, Input, List, Flex } from 'antd';
import { Player } from '../../../types';
import { LIST_PLAYER } from '../../../constants';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import personIcon from '../../../assets/person.png';
import Exporter from './exporter';

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

function getListAdding() {
  const keysStorage = Object.keys(localStorage);
  const listPlayerAdd: Player[] = [];
  for (const key of keysStorage) {
    if (key.includes('player-add-')) {
      const name = localStorage.getItem(key);
      if (name) {
        const id = Number(key.replace('player-add-', ''));
        const score = localStorage.getItem(`player-${id}`);
        listPlayerAdd.push({
          id,
          name,
          avt: '',
          score: Number(score) || 0,
          isAdding: true,
        });
      } else {
        localStorage.removeItem(key);
      }
    }
  }
  return listPlayerAdd;
}

function ListPlayer(props: ListPlayerProps) {
  const { selected, onSelect } = props;
  const [items, setItems] = useState<Player[]>(() =>
    toPlayerListScore(LIST_PLAYER).concat(getListAdding()),
  );

  console.log('loc', Object.keys(localStorage));

  function addPeople() {
    const newPeople: Player = {
      id: Date.now(),
      isAdding: true,
      avt: '',
      name: '',
      score: 0,
    };
    setItems([...items, newPeople]);
  }
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

  function onChangeNameAdding(name: string, id: number) {
    const tmpItems = items;
    for (const data of tmpItems) {
      if (data.id === id) {
        localStorage.setItem(`player-add-${id}`, name);
        data.name = name;
        break;
      }
    }
    setItems([...tmpItems]);
  }
  return (
    <div>
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
                    <Avatar src={item.avt ? item.avt : personIcon} />
                  </div>
                }
                title={
                  <div
                    className='cursor-pointer'
                    onClick={() => !item.isAdding && onSelect(item)}
                  >
                    {item.isAdding ? (
                      <Input
                        className='w-[250px]'
                        value={item.name}
                        onChange={e =>
                          onChangeNameAdding(e.target.value, item.id)
                        }
                      />
                    ) : (
                      item.name
                    )}
                  </div>
                }
                className='text-z-md font-medium'
              ></List.Item.Meta>
            </List.Item>
          )}
        />
      </Card>

      <Flex gap="small" wrap="wrap">
        <Button
          className='mt-[16px]'
          type='primary'
          icon={<PlusOutlined />}
          onClick={addPeople}
        >
          Add participant
        </Button>
        <Exporter players={items} />
      </Flex>
    </div>
  );
}

export default ListPlayer;
