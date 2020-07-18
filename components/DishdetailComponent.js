import React, { Component } from 'react';
import { Text, View, FlatList, ScrollView, Modal, Button } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import Moment from 'moment';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})


class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 3,
            author: null,
            comment: null,
            showModal: false
        }
    }

    resetForm() {
        this.setState({
            rating: 3,
            author: null,
            comment: null,
            showModal: false
        });
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    handleComment(dishId) {
        if (this.state.rating && this.state.author && this.state.comment) {
            this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment)
            this.resetForm();
        }
        console.log(this.state);
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    render() {
        const dishId = this.props.route.params.dishId;
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    toggleModal={() => this.toggleModal()}
                />
                <RenderComments comments={this.props.comments.comments.filter(comment => comment.dishId === dishId)} />
                <View style={{ marginBottom: 20 }}></View>
                <CommentForm
                    showModal={this.state.showModal} toggleModal={() => this.toggleModal()}
                    rating={this.state.rating} author={this.state.author} comment={this.state.comment}
                    setRating={(r) => this.setState({ rating: r })}
                    setAuthor={(a) => this.setState({ author: a })}
                    setComment={(c) => this.setState({ comment: c })}
                    handleComment={() => this.handleComment(dishId)}
                />
            </ScrollView>
        );
    }
}

function RenderDish(props) {

    const dish = props.dish;

    if (dish != null) {
        return (
            <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
                <Text style={{ margin: 10 }}>{dish.description}</Text>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <Icon raised reverse
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                    <Icon raised reverse
                        name='pencil'
                        type='font-awesome'
                        color='#512DA8'
                        onPress={() => props.toggleModal()}
                    />
                </View>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

function RenderComments(props) {

    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {

        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Rating style={{ alignSelf: 'flex-start', margin: 4 }}
                    readonly imageSize={14} startingValue={item.rating} />
                <Text style={{ fontSize: 12 }}>
                    {'-- ' + item.author + ', ' + Moment(item.date).format('DD-MMM-YYYY HH:mm')}
                </Text>
            </View>
        );
    };

    return (
        <Card title='Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

function CommentForm(props) {
    return (
        <Modal animationType="slide" transparent={false}
            visible={props.showModal}
            onDismiss={() => props.toggleModal()}
            onRequestClose={() => props.toggleModal()}>
            <View style={{ justifyContent: 'center', margin: 20 }}>
                <Rating style={{ marginBottom: 30 }}
                    minValue={1} startingValue={3} showRating
                    onFinishRating={(r) => props.setRating(r)}
                />
                <Input
                    leftIcon={<Icon type='font-awesome' name='user-o' size={24} color='#512DA8' />}
                    placeholder='Author' value={props.author}
                    onChangeText={t => props.setAuthor(t)}
                />
                <Input
                    leftIcon={<Icon type='font-awesome' name='comment-o' size={24} color='#512DA8' />}
                    placeholder='Comment' value={props.comment}
                    onChangeText={t => props.setComment(t)}
                />
                <View style={{ marginTop: 20 }} >
                    <Button title="Submit" color="#512DA8" onPress={() => props.handleComment()}/>
                </View>
                <View style={{ marginTop: 30 }} >
                    <Button title="Cancel" color="#808080" onPress={() => props.toggleModal()}/>
                </View>
            </View>
        </Modal>
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
