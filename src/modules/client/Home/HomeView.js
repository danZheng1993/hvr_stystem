import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { colors, fonts } from '../../../styles';
import Icon from 'react-native-vector-icons/Entypo';
import { SliderBox } from 'react-native-image-slider-box';
import constants from '../../../constants'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { bannersListSelector, newssListSelector} from '../../../redux/selectors'
import { RadioGroup, GridRow, Button } from '../../../components';
import { ListItem } from 'react-native-elements'

 class HomeView extends React.Component {
  _getRenderItemFunction = () =>
    [this.renderRowOne, this.renderRowTwo, this.renderRowThree][
      this.props.tabIndex
    ];

  _openArticle = article => {
    this.props.navigation.navigate({
      routeName: 'Article',
      params: { ...article },
    });
  };

  renderRowThree = rowData => {
    const cellViews = rowData.item.map(item => (
      <TouchableOpacity key={item.id} onPress={() => this._openArticle(item)}>
        <View style={styles.itemOneContainer}>
          <View style={styles.itemOneImageContainer}>
            <Image style={styles.itemOneImage} source={{ uri: item.image }} />
          </View>
          <View style={styles.itemOneContent}>
            <Text style={styles.itemOneTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text
              style={styles.itemOneSubTitle}
              styleName="collapsible"
              numberOfLines={3}
            >
              {item.subtitle}
            </Text>
            <Text style={styles.itemOnePrice} numberOfLines={1}>
              {item.price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ));
    return (
      <View key={rowData.item[0].id} style={styles.itemOneRow}>
        {cellViews}
      </View>
    );
  };

  renderRowTwo = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.itemTwoContainer}
      onPress={() => this._openArticle(item)}
    >
      <View style={styles.itemTwoContent}>
        <Image style={styles.itemTwoImage} source={{ uri: item.image }} />
        <View style={styles.itemTwoOverlay} />
        <Text style={styles.itemTwoTitle}>{item.title}</Text>
        <Text style={styles.itemTwoSubTitle}>{item.subtitle}</Text>
        <Text style={styles.itemTwoPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  renderRowOne = ({ item }) => (

    <TouchableOpacity
      key={item.id}
      style={styles.itemThreeContainer}
      onPress={() => this._openArticle(item)}
    >
      <View style={styles.itemThreeSubContainer}>
        <Image source={{ uri: item.image }} style={styles.itemThreeImage} />
        <View style={styles.itemThreeContent}>
          <Text style={styles.itemThreeBrand}>{item.brand}</Text>
          <View>
            <Text style={styles.itemThreeTitle}>{item.title}</Text>
            <Text style={styles.itemThreeSubtitle} numberOfLines={1}>
              {item.subtitle}
            </Text>
          </View>
          <View style={styles.itemThreeMetaContainer}>
            {item.badge && (
              <View
                style={[
                  styles.badge,
                  item.badge === 'NEW' && { backgroundColor: colors.green },
                ]}
              >
                <Text
                  style={{ fontSize: 10, color: colors.white }}
                  styleName="bright"
                >
                  {item.badge}
                </Text>
              </View>
            )}
            <Text style={styles.itemThreePrice}>{item.price}</Text>
          </View>
        </View>
      </View>
      <View style={styles.itemThreeHr} />
    </TouchableOpacity>
  );

  render() {
    const groupedData =
      this.props.tabIndex === 2
        ? GridRow.groupByRows(this.props.data, 2)
        : this.props.data;
    const {tabIndex, banners, news} = this.props
    let bannerImages = []
    banners && banners.map((banner, index) => {
      typeof(banner) == 'object' && bannerImages.push(constants.BANNER_BASE_URL + banner.image)
    })
    return (
      <View style={styles.container}>
        <View style={{ height: 50, flexDirection: "row" }}>
          <TouchableOpacity 
            style={{ justifyContent:"center", alignItems:"center", marginHorizontal: 10}}
            onPress={() => this.props.navigation.navigate('SearchBar')}
            >
            <Icon name="magnifying-glass" size={30} color="black" />
          </TouchableOpacity>
          <RadioGroup
            selectedIndex={this.props.tabIndex}
            items={this.props.tabs}
            onChange={this.props.setTabIndex}
            underline
          />
        </View>
        {tabIndex == 0 &&
          <>
            <SliderBox
              images={bannerImages}
              onCurrentImagePressed={index =>
                  console.warn(`image ${index} pressed`)
              }
            />
            {news && news.map((l, i) => (
              typeof(l) == "object" &&
            <ListItem
              key={i}
              rightAvatar={{ source: { uri: constants.NEWS_BASE_URL + l.image } }}
              avatarStyle={{ width: 100, height: 100, backgroundColor: 'white'}}
              title={l.title}
              subtitle={l.content}
              bottomDivider
            />
          ))}
          </>
        }
        {/* // <FlatList
        //   keyExtractor={item =>
        //     item.id
        //       ? `${this.props.tabIndex}-${item.id}`
        //       : `${item[0] && item[0].id}`
        //   }
        //   style={{ backgroundColor: colors.white, paddingHorizontal: 15 }}
        //   data={groupedData}
        //   renderItem={this._getRenderItemFunction()}
        // /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tabsContainer: {
    alignSelf: 'stretch',
    marginTop: 30,
  },
  itemOneContainer: {
    flex: 1,
    width: Dimensions.get('window').width / 2 - 40,
  },
  itemOneImageContainer: {
    borderRadius: 3,
    overflow: 'hidden',
  },
  itemOneImage: {
    height: 200,
    width: Dimensions.get('window').width / 2 - 40,
  },
  itemOneTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneSubTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 13,
    color: '#B2B2B2',
    marginVertical: 3,
  },
  itemOnePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  itemOneContent: {
    marginTop: 5,
    marginBottom: 10,
  },
  itemTwoContainer: {
    paddingBottom: 10,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  itemTwoContent: {
    padding: 20,
    position: 'relative',
    marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
    height: 150,
  },
  itemTwoTitle: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoSubTitle: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
  },
  itemTwoPrice: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  itemTwoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#6271da',
    opacity: 0.5,
  },
  itemThreeContainer: {
    backgroundColor: 'white',
  },
  itemThreeSubContainer: {
    flexDirection: 'row-reverse',

    paddingVertical: 10,
  },
  itemThreeImage: {
    height: 100,
    width: 100,
  },
  itemThreeContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  itemThreeBrand: {
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
    color: '#617ae1',
  },
  itemThreeTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: 16,
    color: '#5F5F5F',
  },
  itemThreeSubtitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 12,
    color: '#a4a4a4',
  },
  itemThreeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemThreePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    color: '#5f5f5f',
    textAlign: 'right',
  },
  itemThreeHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginRight: -15,
  },
  badge: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

const mapStateToProps = createStructuredSelector({
  news: newssListSelector,
  banners : bannersListSelector,
});

const mapDispatchToProps = {
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HomeView);
