import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import '@vkontakte/vkui/dist/vkui.css';

//импорты для общего оформления юи типа заоловка и нижней полосочки
import {View, PanelHeader, Panel, Epic, Tabbar, ModalRoot, TabbarItem } from "@vkontakte/vkui";
import Icon28Users3Outline from '@vkontakte/icons/dist/28/users_3_outline';
import Icon28PlaceOutline from '@vkontakte/icons/dist/28/place_outline';
import Icon28UserOutline from '@vkontakte/icons/dist/28/user_outline';

//импорты для модальных окон
import { InfoRow, SimpleCell, Separator, Header, Div, Button, Placeholder, FormLayout, Group, ModalPage, ModalPageHeader, PanelHeaderButton, FormLayoutGroup, Checkbox, Input } from "@vkontakte/vkui";
import Icon56FireOutline from '@vkontakte/icons/dist/56/fire_outline';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24Back from '@vkontakte/icons/dist/24/back';

//импорты для панели стартаплист
import { Gallery, Search, CardGrid, Card, Cell, Avatar, Banner, Caption, List } from "@vkontakte/vkui";
import Icon16Chevron from '@vkontakte/icons/dist/16/chevron';
import Icon24Filter from '@vkontakte/icons/dist/24/filter';

//импорты для форм
import { Textarea, File } from "@vkontakte/vkui";
import Icon24Camera from '@vkontakte/icons/dist/24/camera';

//импорты для карт
import { HPlatform, HMap, HMapMarker, onTap } from "react-here-map";

const id_checker = null;
const checkModalpageStartupDataID = null;

const MODAL_PAGE_NEWSTARTUP = 'newstartup';
const MODAL_PAGE_STARTUPCARD = 'startupcard';



const startups = [
        {id: 1, img: "https://sun1-97.userapi.com/bW5TLfXmUMsKxelWo78cc7y7Pcj7exE9rUSIeA/77G3tgnyVlI.jpg",
                name: "GROVE STREET BEATS",
                description: "Мы пишем биты, тексты - все сами. Хотим продвигать искусство рэп-культуры в массы, выпускать как можно больше релизов и совершенствоваться, чтобы стать профессионалами. Следующая цель - студия. Присоединяйся!",
                ad: ["Хотим клип. Нужен оператор, по совместительству хороший монтажер.", null, null],
                button_href: "vk://m.vk.com/gs_beatsstore",
                team: "t"},
        {id: 2, img: "https://s15.stc.all.kpcdn.net/share/i/12/10617822/inx960x640.jpg",
                name: "GAMEMAKERS COMUNITY",
                description: "Занимаемся очень классной игрой с мистическим сюжетом и мрачной атмосферой. В команде есть 2 программиста, художник и саунддизайнер. Мы нереально сплоченная и дружная каманда, присоединяйся!",
                ad: ["Нужен актер озвучки для характерного отрицательного персонажа. Хрипотца приветствуется", null, null],
                button_href: "vk://m.vk.com/daniiyang_group",
                team: "t"},
        {id: 3, img: "https://tvkinoradio.ru/upload/images/Article/36/6d/e3/366de36ed28e0a40da946b34335328ba.jpg",
                name: "СНИМАЕМ КИНО",
                description: "Мы снимаем короткометражки по произведениям русской классической литературы. Только личное оборудование, играем и пишем сценарий все вместе, своими силами. Присоединяйся!",
                ad: ["Нужен Ленский - молодой человек 18-23 года с темными волнистыми волосами.", "Нужен композитор саунда на пиано.", "Нужен костюм Петра-1."],
                button_href: "vk://m.vk.com/daniiyang_group",
                team: "t"},
      ];




class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {

      search: '',

      activeStory: 'StartupListPanel',
      activePanel: 'StartupListPanel',
      activeModal: null,
      StartupList: ['GROVE STREET BEATS', 'GAMEMAKERS COMUNITY', 'СНИМАЕМ КИНО'],
      modalHistory: []
    };








    this.onStoryChange = this.onStoryChange.bind(this);

    this.modalBack = () => {
      this.setActiveModal(this.state.modalHistory[this.state.modalHistory.length - 2]);
    };

    this.onChange = this.onChange.bind(this);
    this.onNavClick = this.onNavClick.bind(this);


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
    this.setState({ search: e.target.value });
  }

  modalpageChanges(e) {
    checkModalpageStartupDataID = 1;
  }

  onNavClick(e) {
    const activePanel = e.currentTarget.dataset.to;
    this.setState({ activePanel });
    }



  get startup_search () {
      const search = this.state.search.toLowerCase();
      return startups.filter(({name}) => name.toLowerCase().indexOf(search) > -1);
    }



  render () {
    const { comunity, name, description, image, place, comand, extralinks } = this.state;

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
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <Avatar size={150} mode="image" style={{ marginTop: 20 }} src={image} />
              <File name="image" value={image} onChange={this.onChange} before={<Icon24Camera />} controlSize="l" style={{ marginTop: 20 }} >
                Фотография проекта
              </File>
            </div>
            <Input top="Название проекта"  name="name" value={name} onChange={this.onChange}/>
            <Textarea top="Краткое описание проекта" name="description" value={description} onChange={this.onChange}/>
            <FormLayoutGroup top="В каком районе вы работаете над проектом?" bottom="Адрес пишется в формате: город, улица.">
              <Input name="place" value={place} onChange={this.onChange} />
            </FormLayoutGroup>
            <Input top="Сообщество проекта"  name="comunity" value={comunity} onChange={this.onChange}/>
            <FormLayoutGroup top="Ссылки на участников проекта" bottom="Участники указываются в формате: ссылка - роль.">
              <Input name="comand" value={comand} onChange={this.onChange} />
            </FormLayoutGroup>
            <FormLayoutGroup top="Дополнительные cсылки" bottom="Ссылки указываются в формате: ссылка - имя (Пример: https://github.com/daniiyang - GitHub)">
              <Input name="extralinks" value={extralinks} onChange={this.onChange} />
            </FormLayoutGroup>
            <Checkbox>Согласен на публикацию указанной информации</Checkbox>
          </FormLayout>
        </ModalPage>

      </ModalRoot>
    );





    return (
      <Epic activeStory={this.state.activeStory} tabbar={
        <Tabbar>
          <TabbarItem
            onClick={this.onStoryChange}
            selected={this.state.activeStory === 'StartupListPanel'}
            data-story="StartupListPanel"
            text="Список стартапов"
          ><Icon28Users3Outline /></TabbarItem>
          <TabbarItem
            onClick={this.onStoryChange}
            selected={this.state.activeStory === 'UserStartup'}
            data-story="UserStartup"
            text="Мой стартап"
          ><Icon28UserOutline /></TabbarItem>
        </Tabbar>
      }>
        <View activePanel={this.state.activePanel} id='StartupListPanel' modal={modal}  >
            <Panel id='StartupListPanel' >
            <React.Fragment>
            <PanelHeader separator="hide" >UPSTARTUP</PanelHeader>
                <Gallery
                  slideWidth="100%"
                  style={{ height: 150 }}
                  bullets="dark">
                  <div style={{
                          backgroundImage: 'url(https://sun9-15.userapi.com/6m9K_Mly-yBYE9KOwgmLxzd5QjKECnXEmxNqUw/Xa4YCSCM5o8.jpg)',
                          backgroundPosition: 'center',
                          backgroundSize: '100%',
                          backgroundRepeat: 'no-repeat', }} />
                  <div style={{
                          backgroundImage: 'url(https://sun9-41.userapi.com/qxbRSsy0QIwTrBm57Uf3624HXGt52UEBavDcug/x70RGQcgGzY.jpg)',
                          backgroundPosition: 'center',
                          backgroundSize: '100%',
                          backgroundRepeat: 'no-repeat',
                        }} />
                  <div style={{
                          backgroundImage: 'url(https://sun1-84.userapi.com/klx3YBZwlRQwQoc9YmOpwfHPaRsbgsvS4VwS0Q/WQ-ymLMwj_w.jpg)',
                          backgroundPosition: 'center',
                          backgroundSize: '100%',
                          backgroundRepeat: 'no-repeat',
                        }} />
                </Gallery>
                <Group separator="hide" mode="secondary">
                  <Search value={this.state.search} onChange={this.onChange} icon={<Icon24Filter />} after={null}/>
                  <CardGrid>
                    {this.startup_search.length > 0 &&
                    <List> {this.startup_search.map(startups =>
                        <Card key={startups.id} size="l" >
                          <Cell multiline
                          onClick={this.onNavClick}
                          data-to="fullStartupPanel"
                          asideContent={<Icon16Chevron />}
                          before={<Avatar size={130} mode="image" src={startups.img} />}
                          >{<Caption level="1" weight="heavy" caps style={{ marginBottom: 16 }}>{startups.name}</Caption>}
                          {startups.description}</Cell>
                          {startups.ad[0] ?
                              <Banner key={startups.id}
                              subheader={startups.ad[0]}
                              actions={<Button href={startups.button_href}> Откликнуться </Button>}  /> : null }
                          {startups.ad[1] ?
                              <Banner key={startups.id}
                              subheader={startups.ad[1]}
                              actions={<Button href={startups.button_href}> Откликнуться </Button>}  /> : null }
                          {startups.ad[2] ?
                              <Banner key={startups.id}
                               subheader={startups.ad[2]}
                               actions={<Button href={startups.button_href}> Откликнуться </Button>}  /> : null }
                        </Card> )}
                    </List> }







                  </CardGrid>
                </Group>
            </React.Fragment>
            </Panel>



            <Panel id="fullStartupPanel">
            <PanelHeader
            left={<Icon24Back onClick={this.onNavClick} data-to="StartupListPanel" />}
            >{this.state.StartupList[0]}</PanelHeader>
                <Group
                  header={<Header mode="secondary">Описание</Header>}
                  separator="show" >
                  <Cell multiline>
                    Мы снимаем короткометражки по произведениям русской классической литературы. Только личное оборудование, играем и пишем сценарий все вместе, своими силами. Присоединяйся!          </Cell>
                  <Separator style={{ margin: '12px 0' }} />
                  {<Header mode="secondary">Команда</Header>}
                    <SimpleCell before={<Avatar size={48} src="https://sun9-2.userapi.com/c206816/v206816369/20ae2/VJ1i_sji5Y8.jpg" />} description="Сценарист">Саша Андреева</SimpleCell>
                    <SimpleCell before={<Avatar size={48} src="https://sun1-83.userapi.com/lZXlh-GfM3sjTZ897Pdm2IOAl6db2flAL4vvkw/-YfwHP474LU.jpg" />} description="Оператор">Анатолий Серов</SimpleCell>
                  <Separator style={{ margin: '12px 0' }} />
                  {<Header mode="secondary">Сообщество проекта</Header>}
                    <SimpleCell before={<Avatar size={48} src="https://sun9-4.userapi.com/c856124/v856124353/1154ae/OzKHsIFwM4k.jpg" />}>RR Cinema</SimpleCell>
                  <Separator style={{ margin: '12px 0' }} />
                  {<Header mode="secondary">Локация</Header>}
                  <Cell multiline asideContent={<Button before={<Icon24Place />} >Смотреть на карте</Button>}>
                    Новороссийск, улица Анапское шоссе
                  </Cell>
                  <Separator style={{ margin: '12px 0' }} />
                  {<Header mode="secondary">Дополнительные ссылки</Header>}
                    <SimpleCell multiline>
                      <InfoRow header="E-mail">
                        rrcinema.ruci@protonmail.com
                      </InfoRow>
                    </SimpleCell>
                    <SimpleCell>
                      <InfoRow header="Instagram">
                        @rrcinema.ruci
                      </InfoRow>
                    </SimpleCell>
                  <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Button size="xl" mode="secondary">
                      Связаться
                    </Button>
                  </div>
                </Group>
                <Separator wide />
            </Panel>
        </View>



        <View activePanel='UserStartup' id='UserStartup' modal={modal} >
            <Panel id='UserStartup'  >
            <PanelHeader>UPSTARTUP</PanelHeader>
                <Placeholder
                    icon={<Icon56FireOutline width={65} height={65} />}
                    header="Ваш стартап"
                    action={<Button size="l" onClick={() => this.setActiveModal(MODAL_PAGE_NEWSTARTUP)}>  Начать  </Button>}
                    >Кажется, вы все еще скрывате свой проект. Расскажите о нем всем!
                </Placeholder>
            </Panel>
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
