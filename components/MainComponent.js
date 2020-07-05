import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Platform, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';

import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent'

const HeaderOptions = {
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        color: "#fff",
        textAlign: "center"
    }
};


const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen() {
    return (
        <HomeNavigator.Navigator screenOptions={HeaderOptions}>
            <HomeNavigator.Screen name="Home" component={Home}
                options={({ navigation, route }) => ({
                    headerLeft: () => <Icon name="menu" size={26} color='white'
                        onPress={() => navigation.toggleDrawer()} />
                })}
            />
        </HomeNavigator.Navigator>
    );
}


const AboutNavigator = createStackNavigator();

function AboutNavigatorScreen() {
    return (
        <AboutNavigator.Navigator screenOptions={HeaderOptions}>
            <AboutNavigator.Screen name="About Us" component={About}
                options={({ navigation }) => ({
                    headerLeft: () => <Icon name="menu" size={26} color='white'
                        onPress={() => navigation.toggleDrawer()} />
                })}
            />
        </AboutNavigator.Navigator>
    );
}


const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen() {
    return (
        <MenuNavigator.Navigator initialRouteName='Menu' screenOptions={HeaderOptions}>
            <MenuNavigator.Screen name="Menu" component={Menu}
                options={({ navigation }) => ({
                    headerLeft: () => <Icon name="menu" size={26} color='white'
                        onPress={() => navigation.toggleDrawer()} />
                })}
            />
            <MenuNavigator.Screen name="Dishdetail" component={Dishdetail}
                options={{ headerTitle: "Dish Detail" }} />
        </MenuNavigator.Navigator>
    );
}


const ContactNavigator = createStackNavigator();

function ContactNavigatorScreen() {
    return (
        <ContactNavigator.Navigator screenOptions={HeaderOptions}>
            <ContactNavigator.Screen name="Contact Us" component={Contact}
                options={({ navigation }) => ({
                    headerLeft: () => <Icon name="menu" size={26} color='white'
                        onPress={() => navigation.toggleDrawer()} />
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
            <MainNavigator.Screen name="Home" component={HomeNavigatorScreen}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Icon name='home' type='font-awesome' size={24} color={color} />
                    )
                }}
            />
            <MainNavigator.Screen name="About Us" component={AboutNavigatorScreen}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Icon name='info-circle' type='font-awesome' size={24} color={color} />
                    )
                }}
            />
            <MainNavigator.Screen name="Menu" component={MenuNavigatorScreen}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Icon name='list' type='font-awesome' size={24} color={color} />
                    )
                }}
            />
            <MainNavigator.Screen name="Contact Us" component={ContactNavigatorScreen}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Icon name='address-card' type='font-awesome' size={24} color={color} />
                    )
                }}
            />
        </MainNavigator.Navigator>
    );
}

const CustomDrawerContentComponent = (props) => (
    <DrawerContentScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
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

    render() {
        return (
            <NavigationContainer>
                <View style={{ paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                </View>
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
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});


export default Main;