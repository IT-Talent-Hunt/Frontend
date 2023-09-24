import { getContactLink } from '../../helpers/helpers';
import './ContactLink.scss';

type Props = {
  url: string,
  platform: string,
  placeholder?: string,
};

export const ContactLink: React.FC<Props> = ({ url, platform, placeholder }) => {
  const urlContact: string = getContactLink(platform, url);

  return (
    <>
      {url ? (
        <a
          href={urlContact}
          target="_blank"
          rel="noreferrer"
          className="contactLink"
        >
          <span>
            {platform === 'Telegram' ? `@${url}` : url}
          </span>
        </a>
      ) : (
        <>
          {placeholder && (
            <span className="contactItem_link">
              {placeholder}
            </span>
          )}
        </>
      )}
    </>
  );
};
