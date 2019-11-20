import { Searchbar } from 'react-native-paper';
import { View, Text, Picker, StyleSheet } from 'react-native'
import React, {Componet} from 'react'
import {Button, Loader} from '../components'

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { NavigationActions } from 'react-navigation'
import { searchUser } from '../redux/modules/user'
import { usersListSelector, usersloadingSelector } from '../redux/selectors'

import { clearItem } from '../redux/api/storage'
class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            type: ''
        }
    }
    updateSearch = search => {
        this.setState({ search });
    }
    searchContent = () => {
        const {search} = this.state
        const {searchUser} = this.props
        searchUser({
            body :{ role: 'provider'},
            success: () => alert("success")
        })
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
                            <Picker.Item key={1} label='视频' value='视频' />
                            <Picker.Item key={2} label='服务商' value='服务商' />
                            <Picker.Item key={3} label='资讯' value='资讯' />
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
    usersList: usersListSelector,
    loading: usersloadingSelector
});

const mapDispatchToProps = {
    searchUser
};
  
const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
export default compose(withConnect)(Search);
