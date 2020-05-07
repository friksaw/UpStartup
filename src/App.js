import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';

//импорты для общего оформления юи типа заоловка и нижней полосочки
import {View, PanelHeader, Panel, Epic, Root, Tabbar, ModalRoot, TabbarItem, ConfigProvider} from "@vkontakte/vkui";
import Icon28Users3Outline from '@vkontakte/icons/dist/28/users_3_outline';
import Icon28FavoriteOutline from '@vkontakte/icons/dist/28/favorite_outline';
import Icon28PlaceOutline from '@vkontakte/icons/dist/28/place_outline';
import Icon28UserOutline from '@vkontakte/icons/dist/28/user_outline';

import StartupMap from './panels/epics/StartupMap';

//импорты для модальных окон
import { Button, Placeholder, FormLayout, Group, ModalPage, ModalPageHeader, PanelHeaderButton, SelectMimicry, FormLayoutGroup, Checkbox, Input } from "@vkontakte/vkui";
import Icon56FireOutline from '@vkontakte/icons/dist/56/fire_outline';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Done from '@vkontakte/icons/dist/24/done';

//импорты для панели стартаплист
import { Gallery, Search, CardGrid, Card, Cell, Avatar, Banner, Caption } from "@vkontakte/vkui";
import Icon24DismissDark from '@vkontakte/icons/dist/24/dismiss_dark';
import Icon16Chevron from '@vkontakte/icons/dist/16/chevron';

//импорты для форм
import { Textarea, File } from "@vkontakte/vkui";
import Icon24Camera from '@vkontakte/icons/dist/24/camera';


const MODAL_PAGE_NEWSTARTUP = 'newstartup';
const MODAL_PAGE_STARTUPCARD1 = 'startupcard1';
const MODAL_PAGE_STARTUPCARD2 = 'startupcard2';
const MODAL_PAGE_STARTUPCARD3 = 'startupcard3';


class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      email: '',
      activeStory: 'StartupList',
      activePanel: 'StartupList',
      activeModal: null,
      modalHistory: []
    };



    this.onStoryChange = this.onStoryChange.bind(this);

    this.modalBack = () => {
      this.setActiveModal(this.state.modalHistory[this.state.modalHistory.length - 2]);
    };
this.onChange = this.onChange.bind(this);

  }


  onStoryChange (e) {
    this.setState({ activeStory: e.currentTarget.dataset.story })
  }


  go = e => {
	this.setState({ activePanel: e.currentTarget.dataset.to })
  };


  setActiveModal(activeModal) {
    activeModal = activeModal || null;
    let modalHistory = this.state.modalHistory ? [...this.state.modalHistory] : [];

    if (activeModal === null) {
      modalHistory = [];
    } else if (modalHistory.indexOf(activeModal) !== -1) {
      modalHistory = modalHistory.splice(0, modalHistory.indexOf(activeModal) + 1);
    } else {
      modalHistory.push(activeModal);
    }

    this.setState({
      activeModal,
      modalHistory
    });

 };
  onChange(e) {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  }

  render () {
    const { email, name, description } = this.state;

    const modal = (
      <ModalRoot
        activeModal={this.state.activeModal}
        onClose={this.modalBack}
        activeModal={this.state.activeModal}>


        <ModalPage dynamicContentHeight
        id={MODAL_PAGE_NEWSTARTUP}
        onClose={this.modalBack}
        header={
        <ModalPageHeader
        left={<PanelHeaderButton onClick={this.modalBack}><Icon24Cancel /></PanelHeaderButton>}
        right={<PanelHeaderButton onClick={this.modalBack}>Готово<Icon24Done /></PanelHeaderButton>}
        >Ваш стартап</ModalPageHeader>}>
        <FormLayout>
            <Input top="Название проекта"  name="name" value={name} onChange={this.onChange}/>
            <Textarea top="Краткое описание проекта" name="description" value={description} onChange={this.onChange}/>
            <Avatar size={150} />
            <File before={<Icon24Camera />} controlSize="l">
                Загрузите фотографию проекта
            </File>
            <Input
              type="email"
              top="E-mail"
              name="email"
              value={email}
              onChange={this.onChange} />
              {console.log(this.state.myProjectName)}
            <Checkbox>Согласен на публикацию указанной информации</Checkbox>
          </FormLayout>
        </ModalPage>

        <ModalPage dynamicContentHeight
        id={MODAL_PAGE_STARTUPCARD1}
        onClose={this.modalBack}
        header={
        <ModalPageHeader
        left={<PanelHeaderButton onClick={this.modalBack}><Icon24Cancel /></PanelHeaderButton>}
        >GAMEMAKERS COMUNITY</ModalPageHeader>}>

        </ModalPage>

        <ModalPage dynamicContentHeight
        id={MODAL_PAGE_STARTUPCARD2}
        onClose={this.modalBack}
        header={
        <ModalPageHeader
        left={<PanelHeaderButton onClick={this.modalBack}><Icon24Cancel /></PanelHeaderButton>}
        >GROVE STREET BEATS</ModalPageHeader>}>

        </ModalPage>

        <ModalPage dynamicContentHeight
        id={MODAL_PAGE_STARTUPCARD3}
        onClose={this.modalBack}
        header={
        <ModalPageHeader
        left={<PanelHeaderButton onClick={this.modalBack}><Icon24Cancel /></PanelHeaderButton>}
        >СНИМАЕМ КИНО</ModalPageHeader>}>

        </ModalPage>


      </ModalRoot>
    );

    return (
      <Epic activeStory={this.state.activeStory} tabbar={
        <Tabbar>
          <TabbarItem
            onClick={this.onStoryChange}
            selected={this.state.activeStory === 'StartupList'}
            data-story="StartupList"
            text="Список стартапов"
          ><Icon28Users3Outline /></TabbarItem>
          <TabbarItem
            onClick={this.onStoryChange}
            selected={this.state.activeStory === 'StartupMap'}
            data-story="StartupMap"
            text="Карта стартапов"
          ><Icon28PlaceOutline /></TabbarItem>
          <TabbarItem
            onClick={this.onStoryChange}
            selected={this.state.activeStory === 'MyStartup'}
            data-story="MyStartup"
            text="Мой стартап"
          ><Icon28UserOutline /></TabbarItem>
        </Tabbar>
      }>

        <View activePanel={this.state.activePanel} id='StartupList' modal={modal}  >
            <Panel id='StartupList' >
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
                          backgroundRepeat: 'no-repeat', }} />
                  <div style={{ background: 'linear-gradient(135deg, #ff716c, #ff6e72, #fa6883, #f16594, #e465a3)' }} />
                  <div style={{ background: 'linear-gradient(135deg, #f16594, #e465a3, #c06bb9, #9172c5, #5b77c4)' }} />
                </Gallery>
                <Group separator="hide" mode="secondary">
                  <Search/>
                  <CardGrid>
                    <Card size="l" >
                      <Cell multiline
                      onClick={() => this.setActiveModal(MODAL_PAGE_STARTUPCARD1)}
                      asideContent={<Icon16Chevron />}
                      before={<Avatar size={130} mode="image" src="https://s15.stc.all.kpcdn.net/share/i/12/10617822/inx960x640.jpg" />}
                      >{<Caption level="1" weight="heavy" caps style={{ marginBottom: 16 }}> GameMakers comunity </Caption>}
                      Занимаемся очень классной игрой с мистическим сюжетом и мрачной атмосферой. В команде есть 2 программиста, художник и саунддизайнер. Мы нереально сплоченная и дружная каманда, присоединяйся!</Cell>
                      <Banner
                      subheader="Нужно несколько спрайтов персонажей - не справляемся"
                      actions={<Button> Откликнуться </Button>}  />
                      <Banner
                      subheader="Нужен актер озвучки для характерного отрицательного персонажа. Хрипотца приветствуется"
                      actions={<Button> Откликнуться </Button>}   />
                    </Card>
                    <Card size="l" >
                      <Cell multiline
                      onClick={() => this.setActiveModal(MODAL_PAGE_STARTUPCARD2)}
                      asideContent={<Icon16Chevron />}
                      before={<Avatar size={130} mode="image" src="https://sun1-97.userapi.com/bW5TLfXmUMsKxelWo78cc7y7Pcj7exE9rUSIeA/77G3tgnyVlI.jpg" />}
                      >{<Caption level="1" weight="heavy" caps style={{ marginBottom: 16 }}>Grove Street Beats</Caption>}
                      Мы пишем биты, тексты - все сами. Хотим продвигать искусство рэп-культуры в массы, выпускать как можно больше релизов и совершенствоваться, чтобы стать профессионалами. Следующая цель - студия. Присоединяйся!</Cell>
                      <Banner
                      subheader="Хотим клип. Нужен оператор и по совместительству хороший монтажер."
                      actions={<Button href="https://m.vk.com/gs_beatsstore"> Откликнуться </Button>}  />
                    </Card>
                    <Card size="l" >
                      <Cell multiline
                      onClick={() => this.setActiveModal(MODAL_PAGE_STARTUPCARD3)}
                      asideContent={<Icon16Chevron />}
                      before={<Avatar size={130} mode="image" src="https://tvkinoradio.ru/upload/images/Article/36/6d/e3/366de36ed28e0a40da946b34335328ba.jpg" />}
                      >{<Caption level="1" weight="heavy" caps style={{ marginBottom: 16 }}>Снимаем кино</Caption>}
                      Мы снимаем короткометражки по произведениям русской классической литературы. Только личное оборудование, играем и пишем сценарий все вместе, своими силами. Присоединяйся!</Cell>
                      <Banner
                      subheader="Нужен Ленский - молодой человек от 15 до 23 лет с темными волнистыми волосами."
                      actions={<Button> Откликнуться </Button>}  />
                      <Banner
                      subheader="Нужен музыкант для написания саундтреков. Обязательно умение работать в прогах."
                      actions={<Button> Откликнуться </Button>}  />
                    </Card>
                  </CardGrid>
                </Group>
            </Panel>
        </View>
        <View activePanel='StartupMap' id='StartupMap'  >
            <StartupMap id='StartupMap' go={this.go} />
        </View>




        <View activePanel='MyStartup' id='MyStartup' modal={modal} >
            <Panel id='MyStartup'  >
              <PanelHeader>UPSTARTUP</PanelHeader>
              <Placeholder
                icon={<Icon56FireOutline width={65} height={65} />}
                header="Ваш стартап"
                action={<Button size="l" onClick={() => this.setActiveModal(MODAL_PAGE_NEWSTARTUP)}>  Начать  </Button>}
                >Кажется, вы все еще скрывате свой проект. Расскажите о нем всем!
              </Placeholder>
            </Panel>
        </View>
      </Epic>
    )
  }
}


export default App;
