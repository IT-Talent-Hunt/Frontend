import './Icon.scss';

type Props = {
  icon: string,
};

export const Icon: React.FC<Props> = ({ icon }) => {
  return (
    <div
      className="icon"
      style={{ backgroundImage: `url('${icon}')` }}
    />
  );
};
