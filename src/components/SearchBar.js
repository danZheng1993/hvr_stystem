import { Searchbar } from 'react-native-paper';
import { View, Text, Picker, StyleSheet } from 'react-native'
import React, {Componet} from 'react'
import {Button, Loader} from '../components'

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { NavigationActions } from 'react-navigation'
import { searchUser } from '../redux/modules/user'
import { searchMedia } from '../redux/modules/media'
import { searchNews } from '../redux/modules/news'
// import {  } from '../redux/modules/news'
import { usersloadingSelector, mediasloadingSelector, newssloadingSelector } from '../redux/selectors'

import { clearItem } from '../redux/api/storage'
class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            type: 'media'
        }
    }
    updateSearch = search => {
        this.setState({ search });
    }
    searchContent = () => {
        const {search, type} = this.state
        const {searchUser, searchMedia, searchNews} = this.props
        switch(type) {
            case 'media':
                searchMedia({
                    body: {title: search},
                    success: () => this.props.navigation.navigate('SearchResult', {type})
                })
                break;
            case 'user':
                searchUser({
                    body :{ userName: search},
                    success: () => this.props.navigation.navigate('SearchResult', {type})
                })
            case 'news':
                searchNews({
                    body: {title: search},
                    success: () => this.props.navigation.navigate('SearchResult', {type})
                })
                break;
            default:
                break;
        }


    }
    render() {
        const {search} = this.state
        const {loading} = this.props
        return (
            <View style={styles.container}>
                <Loader loading={loading} />
                <View style={{flexDirection:'row'}}>
                    <View style={{flex: 2}}>
                        <Picker
                        selectedValue={this.state.type}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({type: itemValue})
                        }>
                            <Picker.Item key={1} label='视频' value='media' />
                            <Picker.Item key={2} label='服务商' value='user' />
                            <Picker.Item key={3} label='资讯' value='news' />
                        </Picker>
                    </View>
                    <View style={{flex: 4}}>
                        <Searchbar
                            placeholder="请输入关键字"
                            onChangeText={this.updateSearch}
                            value={search}
                        />
                    </View>
                    <View style={{flex: 1, justifyContent:"center", alignItems:"center"}}>
                        <Text
                            size={24} onPress = {() => this.searchContent()}>搜索</Text>
                    </View>
                </View>
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>历史记录</Text>
                        <Text>清除</Text>
                    </View>
                    <View>
                        <Text>热门搜索</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 15,
      paddingTop: 20,
    },
})
const mapStateToProps = createStructuredSelector({
    loading: usersloadingSelector || mediasloadingSelector || newssloadingSelector
});

const mapDispatchToProps = {
    searchUser,
    searchMedia,
    searchNews
};
  
const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
export default compose(withConnect)(Search);
