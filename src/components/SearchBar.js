import { SearchBar } from 'react-native-elements';
import { View, Picker, StyleSheet } from 'react-native'
import React, {Componet} from 'react'
import {Button, Loader, Text} from '../components'
import {colors} from '../styles'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { NavigationActions } from 'react-navigation'
import { searchUser } from '../redux/modules/user'
import { searchMedia } from '../redux/modules/media'
import { searchNews } from '../redux/modules/news'
import _ from 'lodash'
// import {  } from '../redux/modules/news'
import { usersloadingSelector, mediasloadingSelector, newssloadingSelector, settingsListSelector } from '../redux/selectors'

import { clearItem } from '../redux/api/storage'
class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            label: '视频',
            type: 'media',
            typeList: [{label:'视频',value:'media'}, {label:'服务商',value:'user'}, {label:'资讯',value:'news'}]
        }
    }
    updateSearch = search => {
        this.setState({ search });
    }
    searchContent = (content) => {
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
    updateType= () => {
        const {typeList, type} = this.state
        let index = (_.findIndex(typeList, {value : type}) + 1) % typeList.length
        this.setState({type: typeList[index].value, label: typeList[index].label})
    }
    render() {
        const {search} = this.state
        const {loading} = this.props
        const {settings} = this.props 
        const popularSearch = settings.popularSearch.split(',')
        return (
            <View style={styles.container}>
                <Loader loading={loading} />
                <View style={{flexDirection:'row'}}>
                    {/* <View style={{flex: 2}}>
                        <Picker
                        selectedValue={this.state.type}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({type: itemValue})
                        }>
                            <Picker.Item key={1} label='视频' value='media' />
                            <Picker.Item key={2} label='服务商' value='user' />
                            <Picker.Item key={3} label='资讯' value='news' />
                        </Picker>
                    </View> */}
                    <View style={{flex: 4}}>
                        <SearchBar
                            containerStyle={{height: 30, padding: 0, backgroundColor: colors.bluish, borderColor: colors.bluish,  borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
                            inputContainerStyle={{height: 30, backgroundColor: colors.white, borderWidth: 0, borderRadius: 15, padding: 5}}
                            inputStyle={{padding: 5}}
                            placeholder="请输入关键字"
                            onChangeText={this.updateSearch}
                            value={search}
                        />
                    </View>
                    <View style={{flex: 1, justifyContent:"center", alignItems:"center"}}>
                        <Text color={colors.secondary} onPress = {() => this.updateType()}>{this.state.label}</Text>
                    </View>
                    <View style={{flex: 1, justifyContent:"center", alignItems:"center"}}>
                        <Text color={colors.secondary} onPress = {() => this.searchContent()}>搜索</Text>
                    </View>
                </View>
                <View style={{padding: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text black>历史记录</Text>
                        <Text>清除</Text>
                    </View>
                </View>
                <View style={{padding: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text black>热门搜索</Text>
                        <Text>清除</Text>
                    </View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        {!!popularSearch.length && popularSearch.map((item, index) => (
                            <Text key={index} style={styles.spin} onPress={() => {this.updateSearch(item)}}>
                                {item}
                            </Text>
                        ))}
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
        backgroundColor: colors.bluish
    },
    spin: {
        backgroundColor: colors.white,
        padding: 5,
        margin: 5,
        borderRadius: 10
    }
})
const mapStateToProps = createStructuredSelector({
    loading: usersloadingSelector || mediasloadingSelector || newssloadingSelector,
    settings: settingsListSelector
});

const mapDispatchToProps = {
    searchUser,
    searchMedia,
    searchNews
};
  
const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
export default compose(withConnect)(Search);
