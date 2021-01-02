import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes
  };
};

class Menu extends Component {
  render() {
    const { navigate } = this.props.navigation;

    const renderMenuItem = ({ item, index }) => {
      return (
        <Animatable.View animation="pulse" duration={2000}>
          <Tile
            key={index}
            title={item.name}
            caption={item.description}
            featured
            imageSrc={{ uri: baseUrl + item.image }}
            onPress={() => navigate('Dishdetail', { dishId: item.id })}
          />
        </Animatable.View>
      );
    };

    if (this.props.dishes.isLoading) {
      return <Loading />;
    } else if (this.props.dishes.errMess) {
      return (
        <View>
          <Text>{this.props.dishes.errMess}</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={this.props.dishes.dishes}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id.toString()}
        />
      );
    }
  }
}

export default connect(mapStateToProps)(Menu);
