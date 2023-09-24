import classNames from 'classnames';
import './ProfileTextField.scss';

type Props = {
  text: string,
  name: string,
};

export const ProfileTextField: React.FC<Props> = ({ text, name }) => {
  const placeholder = `The ${name} field is empty.`;

  return (
    <div
      className={classNames(
        'profielTextField',
        { 'profielTextField--isEmpty': !text },
      )}
    >
      {text ? (
        <p className="profielTextField__text">{text}</p>
      ) : (
        <p className="profielTextField__placeholder">{placeholder}</p>
      )}
    </div>
  );
};
