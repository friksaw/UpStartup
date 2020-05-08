import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader } from "@vkontakte/vkui";

import HPlatform, { HMap, HMapMarker } from "react-here-map";


const app_id = 'UdRH6PlISTlADYsW6mzl';
const api_key = '8pnCIzadhLos0MYDbSdpmtf5NpzQqUC';
const api_code = 'lfrrTheP9nBedeJyy1NtIA';

const coords1 = { lat: 44.6832104, lng: 37.7794034 };
const coords2 = { lat: 44.7306551, lng: 37.7425826 };
const coords3 = { lat: 44.734003, lng: 37.7443383 };

const icon1 =
  '<svg width="70" height="70" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
  'height="22" /><text x="12" y="18" font-size="12pt" ' +
  'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
  'fill="white"></text></svg>';

const icon2 =
  '<svg width="70" height="70" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
  'height="22" /><text x="12" y="18" font-size="12pt" ' +
  'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
  'fill="white"></text></svg>';

const icon3 =
  '<svg width="70" height="70" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
  'height="22" /><text x="12" y="18" font-size="12pt" ' +
  'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
  'fill="white"></text></svg>';



const StartupMap = ({ id, go }) => (
	<Panel id={id}>
	    <PanelHeader>UPSTARTUP</PanelHeader>
            <HPlatform
              app_id={app_id}
              app_code={api_code}
              apikey={api_key}
              useCIT
              useHTTPS
              includeUI
              includePlaces
              interactive
            >
              <HMap
                style={{
                  height: "511px",
                  width: "100%",
                }}
                mapOptions={{ center: { lat: 44.723566, lng: 37.768678 }, zoom: 14 }}
              >
                <HMapMarker coords={coords1} icon={icon1} />
                <HMapMarker coords={coords2} icon={icon2} />
                <HMapMarker coords={coords3} icon={icon3} />
              </HMap>
            </HPlatform>
    </Panel>
);

StartupMap.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired
};

export default StartupMap;