import React from 'react';
import PropTypes from 'prop-types';

import Icon24DismissDark from '@vkontakte/icons/dist/24/dismiss_dark'
import Icon28UserOutline from '@vkontakte/icons/dist/28/user_outline';
import Icon16Chevron from '@vkontakte/icons/dist/16/chevron';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Card, CardScroll, CardGrid, Search, Gallery, Avatar, Banner, Caption } from '@vkontakte/vkui';

import bridge from '@vkontakte/vk-bridge';





const StartupList = ({ id, go }) => (
	<Panel id={id} >
        <PanelHeader separator="hide" >UPSTARTUP</PanelHeader>

        <Gallery
          slideWidth="90%"
          style={{ height: 150 }}
          bullets="dark">
          <div style={{
                  backgroundColor: '#000',
                  backgroundImage: 'url(https://sun9-53.userapi.com/m-ygfKiLKLkEMAQVTToO2l9LyC6GgqWoGXpw8A/-zm6_XLECTU.jpg)',
                  backgroundPosition: 'right bottom',
                  backgroundSize: 340,
                  backgroundRepeat: 'no-repeat',
                    }} />

          <div style={{ background: 'linear-gradient(135deg, #ff716c, #ff6e72, #fa6883, #f16594, #e465a3)' }} />
          <div style={{ background: 'linear-gradient(135deg, #f16594, #e465a3, #c06bb9, #9172c5, #5b77c4)' }} />
        </Gallery>

        <Group separator="hide" mode="secondary">

          <Search/>

          <CardGrid>
            <Card size="l" >
              <Cell multiline
              asideContent={<Icon16Chevron />}
              before={<Avatar size={130} mode="image" src="https://s15.stc.all.kpcdn.net/share/i/12/10617822/inx960x640.jpg" />}
              >{<Caption level="1" weight="heavy" caps style={{ marginBottom: 16 }}> GameMakers comunity </Caption>}
              Занимаемся очень классной игрой с мистическим сюжетом и мрачной атмосферой. В команде есть 2 программиста, художник и саунддизайнер. Мы нереально сплоченная и дружная каманда, присоединяйся!</Cell>

              <Banner
              subheader="Нужно несколько спрайтов персонажей - не справляемся"
              actions={<Button> Откликнуться </Button>}
              />
              <Banner
              subheader="Нужен актер озвучки для характерного отрицательного персонажа. Хрипотца приветствуется"
              actions={<Button> Откликнуться </Button>}
              />
            </Card>

            <Card size="l" >
              <Cell multiline
              asideContent={<Icon16Chevron />}
              before={<Avatar size={130} mode="image" src="https://sun1-97.userapi.com/bW5TLfXmUMsKxelWo78cc7y7Pcj7exE9rUSIeA/77G3tgnyVlI.jpg" />}
              >{<Caption level="1" weight="heavy" caps style={{ marginBottom: 16 }}>Grove Street Beats</Caption>}
              Мы пишем биты, тексты - все сами. Хотим продвигать искусство рэп-культуры в массы, выпускать как можно больше релизов и совершенствоваться, чтобы стать профессионалами. Следующая цель - студия. Присоединяйся!</Cell>

              <Banner
              subheader="Хотим клип. Нужен оператор и по совместительству хороший монтажер."
              actions={<Button> Откликнуться </Button>}
              />
            </Card>

            <Card size="l" >
              <Cell multiline
              asideContent={<Icon16Chevron />}
              before={<Avatar size={130} mode="image" src="https://tvkinoradio.ru/upload/images/Article/36/6d/e3/366de36ed28e0a40da946b34335328ba.jpg" />}
              >{<Caption level="1" weight="heavy" caps style={{ marginBottom: 16 }}>Снимаем кино</Caption>}
              Мы снимаем короткометражки по произведениям русской классической литературы. Только личное оборудование, играем и пишем сценарий все вместе, своими силами. Присоединяйся!</Cell>

              <Banner
              subheader="Нужен Ленский - молодой человек от 15 до 23 лет с темными волнистыми волосами."
              actions={<Button> Откликнуться </Button>}
              />
              <Banner
              subheader="Нужен музыкант для написания саундтреков. Обязательно умение работать в прогах."
              actions={<Button> Откликнуться </Button>}
              />
            </Card>
          </CardGrid>
        </Group>
    </Panel>
);


StartupList.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired
};


export default StartupList;
