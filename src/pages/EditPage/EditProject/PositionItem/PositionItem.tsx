import { EditReverseButton } from '../EditReverseButton/EditReverseButton';
import './PositionItem.scss';

type Props = {
  position: string,
  onRemove: (value: string) => void,
};

export const PositionItem: React.FC<Props> = ({ position, onRemove }) => {
  return (
    <div className="positionItem">
      <span className="positionItem__position">
        {position}
      </span>

      <span className="positionItem__state">
        Recruitment
      </span>

      <EditReverseButton
        title="Delete"
        onClick={() => onRemove(position)}
      />
    </div>
  );
};
