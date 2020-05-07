import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

import { Panel, PanelHeader } from "@vkontakte/vkui";

import HPlatform, { HMap, Marker } from "react-here-map";

import Icon28NewsfeedOutline from '@vkontakte/icons/dist/28/newsfeed_outline';
import Icon28SearchOutline from '@vkontakte/icons/dist/28/search_outline';




const StartupMap = ({ id, go }) => (
	<Panel id={id}>
	    <PanelHeader>UPSTARTUP</PanelHeader>
	      <HPlatform
    app_id="YOUR_APP_ID"
    app_code="YOUR_APP_CODE"
    useCIT
    useHTTPS
    includeUI
    includePlaces
  >
    <HMap
      style={{
        height: "510px",
        width: "100%"
      }}
      mapOptions={{ center: { lat: 44.723566, lng: 37.768678 }, zoom: 20 }}
    >

    </HMap>
  </HPlatform>
    </Panel>
);

StartupMap.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired
};

export default StartupMap;