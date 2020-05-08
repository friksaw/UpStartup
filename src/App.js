import React from 'react';
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

//импорты для панели стартаплист
import { Gallery, Search, CardGrid, Card, Cell, Avatar, Banner, Caption } from "@vkontakte/vkui";
import Icon16Chevron from '@vkontakte/icons/dist/16/chevron';

//импорты для форм
import { Textarea, File } from "@vkontakte/vkui";
import Icon24Camera from '@vkontakte/icons/dist/24/camera';

import HPlatform, { HMap, HMapMarker, onTap } from "react-here-map";




const MODAL_PAGE_NEWSTARTUP = 'newstartup';
const MODAL_PAGE_STARTUPCARD1 = 'startupcard1';
const MODAL_PAGE_STARTUPCARD2 = 'startupcard2';
const MODAL_PAGE_STARTUPCARD3 = 'startupcard3';


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


class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      comunity: '',
      image: '',
      place: '',
      comand: '',
      extralinks: '',
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
                Загрузите фотографию проекта
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




        <ModalPage dynamicContentHeight separator="show"
        id={MODAL_PAGE_STARTUPCARD1}
        onClose={this.modalBack}
        header={
        <ModalPageHeader
        left={<PanelHeaderButton onClick={this.modalBack}><Icon24Cancel /></PanelHeaderButton>}
        >GAMEMAKERS COMUNITY</ModalPageHeader>}>{

        <Group
          header={<Header mode="secondary">Описание</Header>}
          separator="show" >
          <Cell multiline>
            Занимаемся очень классной игрой с мистическим сюжетом и мрачной атмосферой. В команде есть 2 программиста, дизайнер и аналитик. Мы нереально сплоченная и дружная каманда, присоединяйся!
          </Cell>
          <Separator style={{ margin: '12px 0' }} />
          {<Header mode="secondary">Команда</Header>}
            <SimpleCell before={<Avatar size={48} src="https://sun1-19.userapi.com/9wTdHgHyF9QIJnKMhCBYHLXnfyNu63tgkegP7g/3lInrnOdS04.jpg" />} description="Программист">Игорь Фёдоров</SimpleCell>
            <SimpleCell before={<Avatar size={48} src="https://sun1-89.userapi.com/PLCnmMkC-ack6EIDsd9-IGWmWsTLUwcrR_haqQ/ibyxvMwUDKg.jpg" />} description="Аналитик">Artur Stambultsian</SimpleCell>
            <SimpleCell before={<Avatar size={48} src="https://sun9-51.userapi.com/c852320/v852320714/1d580c/oZUzTvtYr10.jpg" />} description="Программист">Тома Носова</SimpleCell>
            <SimpleCell before={<Avatar size={48} src="https://sun9-67.userapi.com/c850732/v850732154/15b2d4/IcJh9dRQKbk.jpg" />} description="Дизайнер">Саша Невзоров</SimpleCell>
          <Separator style={{ margin: '12px 0' }} />
          {<Header mode="secondary">Сообщество проекта</Header>}
            <SimpleCell before={<Avatar size={48} src="https://s15.stc.all.kpcdn.net/share/i/12/10617822/inx960x640.jpg" />}>GAMEMAKERS COMUNITY</SimpleCell>
          <Separator style={{ margin: '12px 0' }} />
          {<Header mode="secondary">Локация</Header>}
          <Cell multiline asideContent={<Button before={<Icon24Place />} >Смотреть на карте</Button>}>
            Новороссийск, пр-кт Дзержинского
          </Cell>
          <Separator style={{ margin: '12px 0' }} />
          {<Header mode="secondary">Дополнительные ссылки</Header>}
            <SimpleCell multiline>
              <InfoRow header="E-mail">
                lestreng.begi@gmail.com
              </InfoRow>
            </SimpleCell>
            <SimpleCell>
              <InfoRow header="GitHub">
                @daniiyang
              </InfoRow>
            </SimpleCell>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Button size="xl" mode="secondary">
              Связаться
            </Button>
          </div>
        </Group>
        }</ModalPage>

                <ModalPage dynamicContentHeight separator="show"
        id={MODAL_PAGE_STARTUPCARD1}
        onClose={this.modalBack}
        header={
        <ModalPageHeader
        left={<PanelHeaderButton onClick={this.modalBack}><Icon24Cancel /></PanelHeaderButton>}
        >GAMEMAKERS COMUNITY</ModalPageHeader>}>{

        <Group
          header={<Header mode="secondary">Описание</Header>}
          separator="show" >
          <Cell multiline>
            Занимаемся очень классной игрой с мистическим сюжетом и мрачной атмосферой. В команде есть 2 программиста, дизайнер и аналитик. Мы нереально сплоченная и дружная каманда, присоединяйся!
          </Cell>
          <Separator style={{ margin: '12px 0' }} />
          {<Header mode="secondary">Команда</Header>}
            <SimpleCell before={<Avatar size={48} src="https://sun1-19.userapi.com/9wTdHgHyF9QIJnKMhCBYHLXnfyNu63tgkegP7g/3lInrnOdS04.jpg" />} description="Программист">Игорь Фёдоров</SimpleCell>
            <SimpleCell before={<Avatar size={48} src="https://sun1-89.userapi.com/PLCnmMkC-ack6EIDsd9-IGWmWsTLUwcrR_haqQ/ibyxvMwUDKg.jpg" />} description="Аналитик">Artur Stambultsian</SimpleCell>
            <SimpleCell before={<Avatar size={48} src="https://sun9-51.userapi.com/c852320/v852320714/1d580c/oZUzTvtYr10.jpg" />} description="Программист">Тома Носова</SimpleCell>
            <SimpleCell before={<Avatar size={48} src="https://sun9-67.userapi.com/c850732/v850732154/15b2d4/IcJh9dRQKbk.jpg" />} description="Дизайнер">Саша Невзоров</SimpleCell>
          <Separator style={{ margin: '12px 0' }} />
          {<Header mode="secondary">Сообщество проекта</Header>}
            <SimpleCell before={<Avatar size={48} src="https://s15.stc.all.kpcdn.net/share/i/12/10617822/inx960x640.jpg" />}>GAMEMAKERS COMUNITY</SimpleCell>
          <Separator style={{ margin: '12px 0' }} />
          {<Header mode="secondary">Локация</Header>}
          <Cell multiline asideContent={<Button before={<Icon24Place />} >Смотреть на карте</Button>}>
            Новороссийск, пр-кт Дзержинского
          </Cell>
          <Separator style={{ margin: '12px 0' }} />
          {<Header mode="secondary">Дополнительные ссылки</Header>}
            <SimpleCell multiline>
              <InfoRow header="E-mail">
                lestreng.begi@gmail.com
              </InfoRow>
            </SimpleCell>
            <SimpleCell>
              <InfoRow header="GitHub">
                @daniiyang
              </InfoRow>
            </SimpleCell>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Button size="xl" mode="secondary">
              Связаться
            </Button>
          </div>
        </Group>
        }</ModalPage>

        <ModalPage dynamicContentHeight
        id={MODAL_PAGE_STARTUPCARD2}
        onClose={this.modalBack}
        header={
        <ModalPageHeader
        left={<PanelHeaderButton onClick={this.modalBack}><Icon24Cancel /></PanelHeaderButton>}
        >GROVE STREET BEATS</ModalPageHeader>}>
        <Group
          header={<Header mode="secondary">Описание</Header>}
          separator="show" >
          <Cell multiline>
            Мы пишем биты, тексты - все сами. Хотим продвигать искусство рэп-культуры в массы, выпускать как можно больше релизов и совершенствоваться, чтобы стать профессионалами. Следующая цель - студия. Присоединяйся!          </Cell>
          <Separator style={{ margin: '12px 0' }} />
          {<Header mode="secondary">Команда</Header>}
            <SimpleCell before={<Avatar size={48} src="https://sun9-33.userapi.com/c851136/v851136828/1697df/VpSS_Z-LTLs.jpg" />} description="Биг Босс">Андрей Ленский</SimpleCell>
            <SimpleCell before={<Avatar size={48} src="https://sun9-5.userapi.com/c206724/v206724265/10e710/n6MwqeiqjBQ.jpg" />} description="Битмейкер">Александр Колесов</SimpleCell>
          <Separator style={{ margin: '12px 0' }} />
          {<Header mode="secondary">Сообщество проекта</Header>}
            <SimpleCell before={<Avatar size={48} src="https://sun1-97.userapi.com/bW5TLfXmUMsKxelWo78cc7y7Pcj7exE9rUSIeA/77G3tgnyVlI.jpg" />}>Grove Street Beats Store [GSB]</SimpleCell>
          <Separator style={{ margin: '12px 0' }} />
          {<Header mode="secondary">Локация</Header>}
          <Cell multiline asideContent={<Button before={<Icon24Place />} >Смотреть на карте</Button>}>
            Новороссийск, улица Видова
          </Cell>
          <Separator style={{ margin: '12px 0' }} />
          {<Header mode="secondary">Дополнительные ссылки</Header>}
            <SimpleCell multiline>
              <InfoRow header="Telegram">
                @Shreker666
              </InfoRow>
            </SimpleCell>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Button size="xl" mode="secondary">
              Связаться
            </Button>
          </div>
        </Group>
        </ModalPage>

        <ModalPage dynamicContentHeight
        id={MODAL_PAGE_STARTUPCARD3}
        onClose={this.modalBack}
        header={
        <ModalPageHeader
        left={<PanelHeaderButton onClick={this.modalBack}><Icon24Cancel /></PanelHeaderButton>}
        >СНИМАЕМ КИНО</ModalPageHeader>}>
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
                  slideWidth="100%"
                  style={{ height: 150 }}
                  bullets="dark">
                  <div style={{
                          backgroundImage: 'url(https://sun9-68.userapi.com/EDVTQTSZEiWskeIPsyz02YME3-FXUkgvopzW8A/NX_-ruBBsAw.jpg)',
                          backgroundPosition: 'center',
                          backgroundSize: 600,
                          backgroundRepeat: 'no-repeat', }} />
                  <div style={{
                          backgroundImage: 'url(https://sun9-51.userapi.com/HA70tcCC6Jp2CcQe9OpjxZllSdNmW3o0uqJYKQ/5j8h9pHTv2E.jpg)',
                          backgroundPosition: 'center',
                          backgroundSize: 600,
                          backgroundRepeat: 'no-repeat',
                        }} />
                  <div style={{
                          backgroundImage: 'url(https://sun2-3.userapi.com/IFTAOgocmJB4DsCudLMZY7YCuM7G2GVIblKFMA/rfMYZlREoUc.jpg)',
                          backgroundPosition: 'center',
                          backgroundSize: 600,
                          backgroundRepeat: 'no-repeat',
                        }} />
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
                      actions={<Button href="vk://m.vk.com/gs_beatsstore"> Откликнуться </Button>}  />
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












        <View activePanel='StartupMap' id='StartupMap' modal={modal} >
            <Panel id='StartupMap' >
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
                mapOptions={{ center: { lat: 44.723566, lng: 37.768678 }, zoom: 14 }} >
                <HMapMarker onTap={() => {this.setActiveModal(MODAL_PAGE_STARTUPCARD1)}} coords={coords1} icon={icon1} />
                <HMapMarker coords={coords2} icon={icon2} />
                <HMapMarker coords={coords3} icon={icon3} />
              </HMap>
            </HPlatform>
    </Panel>
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
