import { SearchBar } from 'react-native-elements';
import { View, Picker, StyleSheet } from 'react-native'
import React, {Componet} from 'react'
import {Button, Loader, Text, GoBack} from '../components'
import {colors} from '../styles'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { NavigationActions } from 'react-navigation'
import { searchUser } from '../redux/modules/user'
import { searchMedia } from '../redux/modules/media'
import { searchNews } from '../redux/modules/news'
import { addToSearch, clearSearch } from '../redux/modules/auth'
import _ from 'lodash'
import { usersloadingSelector, mediasloadingSelector, newssloadingSelector, settingsListSelector, recentSearchSelector } from '../redux/selectors'

import { clearItem } from '../redux/api/storage'
class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            label: '服务商',
            type: 'user',
            typeList: [{label:'视频',value:'media'}, {label:'服务商',value:'user'}, {label:'资讯',value:'news'}]
        }
    }
    updateSearch = search => {
        this.setState({ search });
    }
    redirect = (type,search) => {
        const {addToSearch} = this.props
        this.props.navigation.navigate('SearchResult', {type})
        addToSearch(search)
    }
    searchContent = (content= '') => {
        const {type} = this.state
        const {searchUser, searchMedia, searchNews} = this.props
        const search = content || this.state.search
        switch(type) {
            case 'media':
                searchMedia({
                    body: {title: search},
                    success: () => this.redirect(type, search)
                })
                break;
            case 'user':
                searchUser({
                    body :{ userName: search},
                    success: () => this.redirect(type, search)
                })
            case 'news':
                searchNews({
                    body: {title: search},
                    success: () => this.redirect(type, search)
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
        const {loading, settings, clearSearch, recentSearch} = this.props
        const popularSearch = settings.popularSearch.split(',')
        return (
            <View style={styles.container}>
                <Loader loading={loading} />
                <View style={{flexDirection:'row'}}>
                    <GoBack navigation={this.props.navigation} />
                    <View style={{flex: 3}}>
                        <SearchBar
                            containerStyle={{height: 30, padding: 0, backgroundColor: '#f0eff5', borderColor: '#f0eff5',  borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
                            inputContainerStyle={{height: 30, backgroundColor: colors.white, borderWidth: 0, borderTopLeftRadius: 15, padding: 5}}
                            inputStyle={{padding: 5, fontSize: 12}}
                            placeholder="请输入关键字"
                            onChangeText={this.updateSearch}
                            value={search}
                        />
                    </View>
                    <View style={{flex: 1, marginTop: 1, flexDirection: 'row', justifyContent:"flex-end", alignItems:"center", backgroundColor: colors.white,  borderTopRightRadius: 15, borderBottomRightRadius: 15}}>
                        <Text color={colors.secondary} onPress = {() => this.updateType()}>{this.state.label}</Text>
                        <Text color={colors.secondary} style={{borderLeftColor: colors.gray, borderLeftWidth: 1, paddingHorizontal: 10}} onPress = {() => this.searchContent()}>搜索</Text>
                    </View>
                </View>
                <View style={{padding: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text black>历史记录</Text>
                        <Text onPress={() => clearSearch()}>清除</Text>
                    </View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        {!!recentSearch.length && recentSearch.map((item, index) => (
                            <Text key={index} style={styles.spin} onPress={() => {this.searchContent(item)}}>
                                {item}
                            </Text>
                        ))}
                    </View>
                </View>
                <View style={{padding: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text black>热门搜索</Text>
                        {/* <Text>清除</Text> */}
                    </View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        {!!popularSearch.length && popularSearch.map((item, index) => (
                            <Text key={index} style={styles.spin} onPress={() => {this.searchContent(item)}}>
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
        backgroundColor: '#f0eff5'
    },
    spin: {
        backgroundColor: colors.white,
        paddingVertical: 5,
        paddingHorizontal: 20,
        margin: 5,
        borderRadius: 5
    }
})
const mapStateToProps = createStructuredSelector({
    loading: usersloadingSelector || mediasloadingSelector || newssloadingSelector,
    settings: settingsListSelector,
    recentSearch: recentSearchSelector
});

const mapDispatchToProps = {
    searchUser,
    searchMedia,
    searchNews,
    addToSearch,
    clearSearch
};
  
const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
export default compose(withConnect)(Search);
