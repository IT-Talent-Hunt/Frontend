import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompleteButton } from '../Buttons/CompleteButton/CompleteButton';
import { Container } from '../Container/Container';
import './CreateComplete.scss';

type Props = {
  projectName: string,
};

export const CreateComplete: React.FC<Props> = ({ projectName }) => {
  const navigation = useNavigate();

  const onSubmit = useCallback(() => {
    navigation('/signIn');
  }, []);

  return (
    <section className="createComplete">
      <Container>
        <h1 className="createComplete__title">
          Congratulations!
        </h1>

        <p className="createComplete__title-sub">
          {`You successfully create the project "${projectName}"`}
        </p>

        <div className="createComplete__button">
          <CompleteButton title="Go back" onClick={onSubmit} />
        </div>
      </Container>
    </section>
  );
};
