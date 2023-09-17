/* eslint-disable */

import { NavLink } from 'react-router-dom';
import { Icon } from '../../Icon/Icon';
import profile from '../../../svg/profile-black.png';
import './ProjectCardMemberItem.scss';
import { User } from '../../../Types/User';

type Props = {
  member: User,
};

export const ProjectCardMemberItem: React.FC<Props> = ({ member }) => {

  const idColorMap: any = {};

function generateColorForId(userId: string) {
  // Проверяем, существует ли уже цвет для данного ID
  if (idColorMap[userId]) {
    return idColorMap[userId];
  }

  // Если цвета нет, то генерируем новый цвет
  const color = generateLightColor();
  
  // Сохраняем цвет для данного ID
  idColorMap[userId] = color;
  
  return color;
}

function generateLightColor() {
  // Генерируем случайные значения для красной, зеленой и синей составляющих цвета
  const red = Math.floor(Math.random() * 128) + 128; // От 128 до 255
  const green = Math.floor(Math.random() * 128) + 128; // От 128 до 255
  const blue = Math.floor(Math.random() * 128) + 128; // От 128 до 255

  // Преобразуем значения в формат HEX
  const redHex = red.toString(16).padStart(2, '0');
  const greenHex = green.toString(16).padStart(2, '0');
  const blueHex = blue.toString(16).padStart(2, '0');

  // Собираем цвет в формате HEX
  const color = `#${redHex}${greenHex}${blueHex}`;

  return color;
}

  console.log(generateColorForId(String(member.id)));

  return (
    <NavLink
      to={`/profile/${member.id}`}
      className={`projectMember projectMember-${member.id}`}
      style={{backgroundColor: `${generateColorForId(String(member.id))}`}}
    >
      <Icon icon={profile} />

    </NavLink>
  );
};
