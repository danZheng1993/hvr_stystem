import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  Share,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../styles';
import constants from '../constants'
import { Text, toast} from '../components'
import { addToCollections, removeFromCollections, addToAttentions } from '../redux/modules/auth'
import { increaseVisits } from '../redux/modules/media'
import { profileSelector } from '../redux/selectors'
import NoData from './NoData';

import HeartO from '../../assets/images/heart-o.png';
import Heart from '../../assets/images/heart.png';
import PlayIcon from '../../assets/images/play.png';
import DefaultAvatar from '../../assets/images/default-avatar.png';
import FollowIcon from '../../assets/images/follow.png';

export default ({ medias }) => {
  const profile = useSelector(profileSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handlePlay = (media) => {
    dispatch(increaseVisits({ id: media._id }));
    navigation.navigate('Player', { url: media.path });
  };

  const handleAddToCollection = (id) => {
    dispatch(addToCollections({ body: { collection: id } }));
  };

  const handleRemoveFromCollection = (id) => {
    dispatch(removeFromCollections({ body: { collection: id } }));
  }

  const handleAttentions = (id) => {
    dispatch(addToAttentions({
      body: {attention: id},
      success: () => toast('成功!'),
      fail: ()=> toast('失败')
    }));
  }

  const handleShare = (media) => {
    Share.share({
      message: `请检查这部影片\n${constants.MEDIA_BASE_URL}/${media.path}`
    })
  }

  const collections = profile? profile.collections : []
  const attentions = profile? profile.attentions : []

  const renderItem = ({ item: media }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => handlePlay(media)}
          style={styles.touch}
        >
          <ImageBackground
            source={{ uri: constants.MEDIA_BASE_URL + media.snapshot }}
            style={styles.bg}
          >
            <LinearGradient colors={['#ffffff00','#989697ff',]} style={styles.gradient}>
              <Text white>{media.title}</Text>
              <Text white>观看: {media.visits}</Text>
            </LinearGradient>
            <View style={styles.playIconWrapper}>
              <Image
                source={PlayIcon}
                style={styles.playIcon}
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <View style={styles.actionBarWrapper} >
          <View style={styles.userInfoWrapper}>
            <Image
              source={media.creator ? {uri: constants.BASE_URL + media.creator.photo} : DefaultAvatar}
              style={styles.avatarImage}
            />
            <Text black>{media.creator.userName}</Text>
            {
              attentions.indexOf(media.creator._id) == -1 &&
              <Text
                onPress={() => handleAttentions(media.creator._id)}
                color={colors.primary}
              >
                +关注
              </Text>
            }
          </View>
          <View style={styles.actionButtonsWrapper}>
            <TouchableOpacity
              onPress={() => {
                collections.indexOf(media._id) == -1 ? handleAddToCollection(media._id) : handleRemoveFromCollection(media._id)
              }}
            >
              <Image
                source={collections.indexOf(media._id) == -1 ? HeartO : Heart}
                style={styles.heartIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.followIconWrapper} onPress={() => handleShare(media)}>
              <Image
                source={FollowIcon}
                style={styles.followIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  const keyExtractor = (item) => `media_${item._id}`;

  return (
    <FlatList
      data={medias}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={<NoData />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bluish,
    paddingHorizontal: 15,
    paddingTop: 20,
  },

  bg: {
    width: '100%',
    height: '100%',
    flexDirection: 'column-reverse'
  },

  gradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },

  playIconWrapper: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  playIcon: {
    width: 50,
    height: 50,
  },

  actionBarWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.white,
  },

  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarImage: {
    width: 20,
    height: 20,
    borderRadius: 10
  },

  followIcon: {
    width: 20,
    height: 20,
  },

  heartIcon: {
    width: 20,
    height: 20,
    tintColor: colors.gray,
  },

  followIconWrapper: { marginLeft: 10 },

  actionButtonsWrapper: { flexDirection: 'row' },

  touch: {
    alignSelf: "stretch",
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: 200
  },
});
