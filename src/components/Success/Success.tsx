import './Success.scss';

type Props = {
  message: string,
};

export const Success: React.FC<Props> = ({ message }) => {
  return (
    <div className="success">
      <p className="success-img" />

      <p className="success__message">{message}</p>
    </div>
  );
};
