import './ShineMessage.scss';

type Props = {
  children: React.ReactNode,
};

export const ShineMessage: React.FC<Props> = ({ children }) => {
  return (
    <div className="shineMessage">
      <div className="shineMessage__wrapper">
        { children }
      </div>
    </div>
  );
};
