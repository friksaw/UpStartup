import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Group, Div, Button, Placeholder } from "@vkontakte/vkui";

import Icon56FireOutline from '@vkontakte/icons/dist/56/fire_outline';

import StartupForm from 'C:/Users/lestr/PycharmProjects/TestApp/src/panels/forms/StartupForm.js';


var isMyStartupExist = 0



const MyStartup = ({ id, go }) => (
	<Panel id={id}>
		<PanelHeader>UPSTARTUP</PanelHeader>



		  <Placeholder
            icon={<Icon56FireOutline width={65} height={65} />}
            header="Ваш стартап"
            action={<Button size="l"  onClick={go} data-to="StartupForm"> Начать </Button>}
          >
            Кажется, вы все еще скрывате свой проект. Расскажите о нем всем!
          </Placeholder>

	</Panel>
);


MyStartup.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired
};

export default MyStartup;