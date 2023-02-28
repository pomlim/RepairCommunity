import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebook,
  faLine
} from '@fortawesome/free-brands-svg-icons';
import {
  faPhoneAlt,
  faEnvelope,
  faGlobe,
  faAngleDown,
  faAngleUp
} from '@fortawesome/free-solid-svg-icons';

const Contact = ({ contact }) => {
  const [open, setOpen] = useState(false);

  const phones = contact.phone?.length > 0 ? contact.phone : null;
  const lines = contact.line?.length > 0 ? contact.line : null;
  const facebooks = contact.facebook?.length > 0 ? contact.facebook : null;
  const emails = contact.email?.length > 0 ? contact.email : null;
  const instagrams = contact.instagram?.length > 0 ? contact.instagram : null;
  const webpages = contact.webpage?.length > 0 ? contact.webpage : null;

  return (
    <div>
      <p className="font-bold text-primary-content">
        ช่องทางติดต่อ
        {open ? (
          <FontAwesomeIcon icon={faAngleDown} onClick={() => setOpen(!open)} />
        ) : (
          <FontAwesomeIcon icon={faAngleUp} onClick={() => setOpen(!open)} />
        )}
      </p>

      {open ? (
        <div class="flex flex-col">
          {phones ? (
            <div class="flex flex-row space-x-4 mt-2">
              <FontAwesomeIcon icon={faPhoneAlt} />
              {phones.map((phone, index) => (
                <p key={index}>{phone}</p>
              ))}
            </div>
          ) : null}
          {lines ? (
            <div class="flex flex-row space-x-4 mt-2">
              <FontAwesomeIcon icon={faLine} />
              {lines.map((line, index) => (
                <a key={index} href={`https://line.me/R/ti/p/${lines}`}>
                  <p>{line}</p>
                </a>
              ))}
            </div>
          ) : null}
          {facebooks ? (
            <div class="flex flex-row space-x-4 mt-2">
              <FontAwesomeIcon icon={faFacebook} />
              {facebooks.map((facebook, index) => (
                <a key={index} href={facebook} target="_blank" rel="noreferrer">
                  <p>{facebook}</p>
                </a>
              ))}
            </div>
          ) : null}
          {emails ? (
            <div class="flex flex-row space-x-4 mt-2">
              <FontAwesomeIcon icon={faEnvelope} />
              {emails.map((email, index) => (
                <p key={index}>{email}</p>
              ))}
            </div>
          ) : null}
          {instagrams ? (
            <div class="flex flex-row space-x-4 mt-2">
              <FontAwesomeIcon icon={faInstagram} />
              {instagrams.map((instagram, index) => (
                <a
                  key={index}
                  href={instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <p>{instagram}</p>
                </a>
              ))}
            </div>
          ) : null}
          {webpages ? (
            <div class="flex flex-row space-x-4 mt-2">
              <FontAwesomeIcon icon={faGlobe} />
              {webpages.map((webpage, index) => (
                <a key={index} href={webpage} target="_blank" rel="noreferrer">
                  <p>{webpage}</p>
                </a>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div class="flex flex-row space-x-4">
          {facebooks ? (
            <div class="flex flex-row space-x-4 mt-2">
              <a href={facebooks[0]} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </div>
          ) : null}
          {instagrams ? (
            <div class="flex flex-row space-x-4 mt-2">
              <a href={instagrams[0]} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          ) : null}
          {lines ? (
            <div class="flex flex-row space-x-4 mt-2">
              <a href={`https://line.me/R/ti/p/${lines[0]}`}>
                <FontAwesomeIcon icon={faLine} />
              </a>
            </div>
          ) : null}
          {webpages ? (
            <div class="flex flex-row space-x-4 mt-2">
              <a href={webpages[0]} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGlobe} />
              </a>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Contact;
