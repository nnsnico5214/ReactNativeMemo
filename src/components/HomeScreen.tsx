import * as React from 'react';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import ListScreen from './ListScreen';
import AddListScreen from './AddListScreen';
import { addMemo } from '../actions/index';

const Tab = TabNavigator({
  List: {
    screen: ListScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }: any) => (<Entypo name="list" size={24} color={tintColor} />),
    },
  },
  AddToList: {
    screen: AddListScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }: any) => (<Entypo name="add-to-list" size={24} color={tintColor} />),
    },
  },
}, {
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    style: {
      backgroundColor: '#ffffff',
    },
    indicatorStyle: {
      backgroundColor: '#1fff1f',
    },
    activeTintColor: '#037aff',
    inactiveTintColor: '#737373',
    showLabel: true,
    showIcon: true,
  },
});

class HomeScreen extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.addNewMemoItem = this.addNewMemoItem.bind(this);
  }

  addNewMemoItem(title: string, detail: string) {
    this.props.screenProps.dispatch(addMemo(title, detail));
  }

  render() {
    const { navigation, memo } = this.props;
    return (
      <Tab
        screenProps={{
          navigation,
          memo,
          addNewMemoItem: this.addNewMemoItem,
        }}
      />
    );
  }
}

function mapStateToProps(state: any) {
  return ({
    memo: state.memo,
  });
}

export default connect(mapStateToProps)(HomeScreen);