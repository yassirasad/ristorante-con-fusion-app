import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { connect } from 'react-redux';

import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Favorites from './FavoriteComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Login from './LoginComponent';
import {
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
} from '../redux/ActionCreators';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});

const HeaderOptions = {
  headerStyle: {
    backgroundColor: '#512DA8',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    color: '#fff',
    textAlign: 'center',
  },
};

const MenuIcon = ({ navigation }) => (
  <Icon
    iconStyle={{ marginLeft: 10 }}
    name="menu"
    size={26}
    color="white"
    onPress={() => navigation.toggleDrawer()}
  />
);

const LoginNavigator = createStackNavigator();

function LoginNavigatorScreen() {
  return (
    <LoginNavigator.Navigator screenOptions={HeaderOptions}>
      <LoginNavigator.Screen
        name="Login"
        component={Login}
        options={({ navigation, route }) => ({
          headerLeft: () => <MenuIcon navigation={navigation} />,
        })}
      />
    </LoginNavigator.Navigator>
  );
}

const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen() {
  return (
    <HomeNavigator.Navigator screenOptions={HeaderOptions}>
      <HomeNavigator.Screen
        name="Home"
        component={Home}
        options={({ navigation, route }) => ({
          headerLeft: () => <MenuIcon navigation={navigation} />,
        })}
      />
    </HomeNavigator.Navigator>
  );
}

const AboutNavigator = createStackNavigator();

function AboutNavigatorScreen() {
  return (
    <AboutNavigator.Navigator screenOptions={HeaderOptions}>
      <AboutNavigator.Screen
        name="About Us"
        component={About}
        options={({ navigation }) => ({
          headerLeft: () => <MenuIcon navigation={navigation} />,
        })}
      />
    </AboutNavigator.Navigator>
  );
}

const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen() {
  return (
    <MenuNavigator.Navigator
      initialRouteName="Menu"
      screenOptions={HeaderOptions}
    >
      <MenuNavigator.Screen
        name="Menu"
        component={Menu}
        options={({ navigation }) => ({
          headerLeft: () => <MenuIcon navigation={navigation} />,
        })}
      />
      <MenuNavigator.Screen
        name="Dishdetail"
        component={Dishdetail}
        options={{ headerTitle: 'Dish Detail' }}
      />
    </MenuNavigator.Navigator>
  );
}

const FavoritesNavigator = createStackNavigator();

function FavoritesNavigatorScreen() {
  return (
    <FavoritesNavigator.Navigator screenOptions={HeaderOptions}>
      <FavoritesNavigator.Screen
        name="Favorites"
        component={Favorites}
        options={({ navigation }) => ({
          headerLeft: () => <MenuIcon navigation={navigation} />,
        })}
      />
    </FavoritesNavigator.Navigator>
  );
}

const ReservationNavigator = createStackNavigator();

function ReservationNavigatorScreen() {
  return (
    <ReservationNavigator.Navigator screenOptions={HeaderOptions}>
      <ReservationNavigator.Screen
        name="Reservation"
        component={Reservation}
        options={({ navigation }) => ({
          headerLeft: () => <MenuIcon navigation={navigation} />,
        })}
      />
    </ReservationNavigator.Navigator>
  );
}

const ContactNavigator = createStackNavigator();

function ContactNavigatorScreen() {
  return (
    <ContactNavigator.Navigator screenOptions={HeaderOptions}>
      <ContactNavigator.Screen
        name="Contact Us"
        component={Contact}
        options={({ navigation }) => ({
          headerLeft: () => <MenuIcon navigation={navigation} />,
        })}
      />
    </ContactNavigator.Navigator>
  );
}

const MainNavigator = createDrawerNavigator();

function MainNavigatorDrawer() {
  return (
    <MainNavigator.Navigator
      initialRouteName="Home"
      drawerStyle={{
        backgroundColor: '#D1C4E9',
      }}
      drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
    >
      <MainNavigator.Screen
        name="Login"
        component={LoginNavigatorScreen}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="sign-in" type="font-awesome" size={24} color={color} />
          ),
        }}
      />
      <MainNavigator.Screen
        name="Home"
        component={HomeNavigatorScreen}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="home" type="font-awesome" size={24} color={color} />
          ),
        }}
      />
      <MainNavigator.Screen
        name="About Us"
        component={AboutNavigatorScreen}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Icon
              name="info-circle"
              type="font-awesome"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <MainNavigator.Screen
        name="Menu"
        component={MenuNavigatorScreen}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="list" type="font-awesome" size={24} color={color} />
          ),
        }}
      />
      <MainNavigator.Screen
        name="Favorites"
        component={FavoritesNavigatorScreen}
        options={{
          drawerLabel: 'My Favorites',
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="heart" type="font-awesome" size={24} color={color} />
          ),
        }}
      />
      <MainNavigator.Screen
        name="Reservation"
        component={ReservationNavigatorScreen}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="cutlery" type="font-awesome" size={24} color={color} />
          ),
          title: 'Reserve Table',
        }}
      />
      <MainNavigator.Screen
        name="Contact Us"
        component={ContactNavigatorScreen}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Icon
              name="address-card"
              type="font-awesome"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </MainNavigator.Navigator>
  );
}

const CustomDrawerContentComponent = (props) => (
  <DrawerContentScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={require('./images/logo.png')}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </SafeAreaView>
  </DrawerContentScrollView>
);

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    return (
      <NavigationContainer>
        <View
          style={{
            paddingTop:
              Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
          }}
        ></View>
        <MainNavigatorDrawer />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
