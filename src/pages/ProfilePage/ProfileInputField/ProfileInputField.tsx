import './ProfileInputField.scss';

type Props = {
  value: string,
  setValue: (value: string) => void,
  name: string
};

export const ProfileInputField: React.FC<Props> = ({ value, setValue, name }) => {
  const MAX_DATA_LENGTH = 500;

  return (
    <label className="profileInputField">
      <textarea
        name={name}
        className="profileInputField__textArea"
        value={value || ''}
        onChange={(event) => setValue(event.target.value)}
        maxLength={MAX_DATA_LENGTH}
        placeholder={`Enter ${name} field`}
      />

      {value && (
        <span className="profileInputField__length">
          {`${value.length}/${MAX_DATA_LENGTH}`}
        </span>
      )}
    </label>
  );
};
