/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain, no-mixed-operators */

import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { User } from '../../Types/User';
import * as exportRequestsActions from '../../redux/features/requests/export/export';
import * as importRequestsActions from '../../redux/features/requests/import/import';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { LoaderBig } from '../../components/Loader/LoaderBig';
import { ProjectContainer } from '../../components/ProjectContainer/ProjectContainer';
import importIcon from '../../svg/import.png';
import exportIcon from '../../svg/export.png';
import { Icon } from '../../components/Icon/Icon';
import './RequestsPage.scss';
import { ProjectCardProps } from '../../Types/ProjectCardProps';
import { ImportRequest } from './Request/Request';
import { Empty } from '../../components/Empty/Empty';
import { Error } from '../../components/Error/Error';

type Props = {
  cardClick: (value: ProjectCardProps) => void,
};

export const RequestsPage: React.FC<Props> = ({ cardClick }) => {
  const dispatch = useAppDispatch();

  const {
    exportRequests,
    exportLoader,
    exportError,
  } = useAppSelector(state => state.exportRequests);
  const {
    importRequests,
    importLoader,
    importError,
  } = useAppSelector(state => state.importRequests);

  const [user] = useLocalStorage<User | null>('user', null);

  useEffect(() => {
    dispatch(exportRequestsActions.init(user?.id!));
    dispatch(importRequestsActions.init(user?.id!));

    return () => {
      dispatch(exportRequestsActions.clear());
      dispatch(importRequestsActions.clear());
    };
  }, []);

  /* eslint-disable-next-line */
  console.log(exportRequests, importRequests, importLoader);

  return (
    <section className="requests">
      <ProjectContainer>
        <h1 className="requests__title">Requests</h1>

        <div className="requests__container">
          <div className="requests__field">
            <div className="requests__type">
              <Icon icon={importIcon} />
              <h1 className="requests__type_title">Import</h1>
            </div>

            {importLoader ? (
              <div className="requests__loader">
                <LoaderBig />
              </div>
            ) : (
              <>
                {importError ? (
                  <div className="requests__error">
                    <Error message="" />
                  </div>
                ) : (
                  <>
                    {importRequests.length ? (
                      <ul className="requests__list">
                        {importRequests.map((request) => (
                          <ImportRequest
                            key={request.id}
                            request={request}
                            cardClick={cardClick}
                          />
                        ))}
                      </ul>
                    ) : (
                      <Empty />
                    )}
                  </>
                )}
              </>
            )}
          </div>

          <div className="requests__field">
            <div className="requests__type">
              <Icon icon={exportIcon} />
              <h1 className="requests__type_title">Export</h1>
            </div>

            {exportLoader ? (
              <div className="requests__loader">
                <LoaderBig />
              </div>
            ) : (
              <>
                {exportError ? (
                  <div className="requests__error">
                    <Error message="" />
                  </div>
                ) : (
                  <>
                    {exportRequests.length ? (
                      <ul className="requests__list">
                        {exportRequests.map((request) => (
                          <ImportRequest
                            key={request.id}
                            request={request}
                            cardClick={cardClick}
                            isExport={!!true}
                          />
                        ))}
                      </ul>
                    ) : (
                      <Empty />
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </ProjectContainer>
    </section>
  );
};
