import './Error.scss';

type Props = {
  message: string,
};

export const Error: React.FC<Props> = ({ message }) => {
  return (
    <div className="error">
      <p className="error-img" />

      <span className="error__message">
        {message}
      </span>
    </div>
  );
};
