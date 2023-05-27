import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebook,
  faLine
} from '@fortawesome/free-brands-svg-icons';

const Contact = ({ contact, onIconClick }) => {
  const contactsMethods = [
    {
      name: 'instagram',
      data: contact.instagram?.length > 0 ? contact.instagram : null
    },
    { name: 'line', data: contact.line?.length > 0 ? contact.line : null },
    {
      name: 'facebook',
      data: contact.facebook?.length > 0 ? contact.facebook : null
    }
  ];
  return (
    <div className="w-full py-4">
      <p className="text-xs font-bold text-brown-default font-kanit">
        ช่องทางติดต่อ
      </p>
      <div className="flex justify-between mt-2 ">
        {contactsMethods.map((contactMethod, index) => {
          if (!contactMethod.data) return null;
          const icon =
            contactMethod.name === 'instagram'
              ? faInstagram
              : contactMethod.name === 'line'
              ? faLine
              : faFacebook;

          const style =
            contactMethod.name === 'instagram'
              ? { color: '#E4405F' }
              : contactMethod.name === 'line'
              ? { color: '#00B900' }
              : { color: '#1877F2' };

          const linkToContact =
            contactMethod.name === 'line'
              ? `https://line.me/R/ti/p/${contactMethod.data[0]}`
              : contactMethod.data[0];

          if (contactMethod.data.length > 1) {
            return (
              <FontAwesomeIcon
                key={`contact-icon-${index}`}
                className="cursor-pointer "
                icon={icon}
                size="xl"
                inverse
                style={style}
                onClick={() => onIconClick(contactMethod.name)}
              />
            );
          } else {
            return (
              <a
                key={`contact-icon-${index}`}
                href={linkToContact}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={icon} size="xl" inverse style={style} />
              </a>
            );
          }
        })}
        {/* {emails ? (
          <a href={`mailto:${emails[0]}`}>
            <FontAwesomeIcon icon={faEnvelope} size="xl" />
          </a>
        ) : null}
        {webpages ? (
          <a href={webpages[0]} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGlobe} size="xl" />
          </a>
        ) : null} */}
      </div>
    </div>
  );
};

export default Contact;
